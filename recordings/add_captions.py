#!/usr/bin/env python3
"""Burn synced 'live' captions into a narrated demo MP4.
Usage: python3 add_captions.py <timeline.json> <input.mp4> <output.mp4>

Two rendering paths, auto-selected:
  * libass path (preferred): if the chosen ffmpeg has the `subtitles` filter, burn a styled ASS
    file (crisp, native). No Python image libs needed.
  * Pillow fallback: if ffmpeg lacks libass, render caption PNGs with Pillow and overlay them.

Env:
  FFMPEG / FFPROBE   binaries to use. Default: ~/bin/ffmpeg-full / ~/bin/ffprobe-full if present
                     (a sidecar static build with libass), else `ffmpeg` / `ffprobe` on PATH.
"""
import json, sys, subprocess, os, textwrap, tempfile, shutil

def _pick(envvar, sidecar, fallback):
    v = os.environ.get(envvar)
    if v: return v
    sc = os.path.expanduser(sidecar)
    return sc if os.path.exists(sc) else fallback

FFMPEG  = _pick("FFMPEG",  "~/bin/ffmpeg-full",  "ffmpeg")
FFPROBE = _pick("FFPROBE", "~/bin/ffprobe-full", "ffprobe")

tl, vin, vout = sys.argv[1], sys.argv[2], sys.argv[3]
d = json.load(open(tl)); marks = d["marks"]
vw, vh = d.get("viewport", {}).get("w", 1360), d.get("viewport", {}).get("h", 860)

def dur(p):
    return float(subprocess.check_output(
        [FFPROBE,"-v","error","-show_entries","format=duration","-of","default=nk=1:nw=1", p]).strip())
vdur = dur(vin)

def has_libass():
    try:
        return b"subtitles" in subprocess.check_output([FFMPEG,"-hide_banner","-filters"], stderr=subprocess.DEVNULL)
    except Exception:
        return False

def chunks(text, max_words=8, max_chars=52):
    words, out, cur = text.split(), [], []
    for w in words:
        cur.append(w)
        if len(cur) >= max_words or len(" ".join(cur)) >= max_chars:
            out.append(" ".join(cur)); cur = []
    if cur: out.append(" ".join(cur))
    return out

# progressive cues synced to each beat's window
cues = []
for i, m in enumerate(marks):
    start = m["t"]; end = min(marks[i+1]["t"] if i+1 < len(marks) else vdur, vdur)
    if end - start < 0.3: end = min(start + 0.8, vdur)
    parts = chunks(m["text"]); total = sum(len(p) for p in parts) or 1; span = end - start
    t = start
    for j, p in enumerate(parts):
        c_end = end if j == len(parts)-1 else t + span*(len(p)/total)
        cues.append((t, c_end, p)); t = c_end

def ass_ts(t):
    if t < 0: t = 0
    h=int(t//3600); mnt=int((t%3600)//60); s=int(t%60); cs=int(round((t-int(t))*100))
    if cs==100: s+=1; cs=0
    return f"{h:d}:{mnt:02d}:{s:02d}.{cs:02d}"

if has_libass():
    header = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {vw}
PlayResY: {vh}
WrapStyle: 2
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Helvetica,30,&H00FFFFFF,&H000000FF,&H00202020,&HA0101010,1,0,0,0,100,100,0,0,3,6,0,2,60,60,46,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
    lines = []
    for a,b,txt in cues:
        wrapped = "\\N".join(textwrap.wrap(txt, width=44)) or txt
        lines.append(f"Dialogue: 0,{ass_ts(a)},{ass_ts(b)},Cap,,0,0,0,,{wrapped}")
    ass_path = tempfile.mktemp(suffix=".ass")
    open(ass_path,"w").write(header + "\n".join(lines) + "\n")
    print(f"[libass] {len(cues)} cues over {vdur:.1f}s using {FFMPEG} -> {vout}")
    subprocess.check_call([FFMPEG,"-y","-loglevel","error","-i",vin,
        "-vf", f"subtitles={ass_path}", "-c:v","libx264","-pix_fmt","yuv420p","-crf","23","-preset","medium",
        "-c:a","copy", vout])
    os.remove(ass_path)
else:
    # Pillow overlay fallback (no libass in this ffmpeg)
    from PIL import Image, ImageDraw, ImageFont
    FONTS = ["/System/Library/Fonts/Supplemental/Arial Bold.ttf","/System/Library/Fonts/HelveticaNeue.ttc","/System/Library/Fonts/Helvetica.ttc"]
    font = None
    for fp in FONTS:
        if os.path.exists(fp):
            try: font = ImageFont.truetype(fp, 34); break
            except Exception: pass
    if font is None: font = ImageFont.load_default()
    capdir = tempfile.mkdtemp(prefix="caps_")
    def render(text, path):
        lines = textwrap.wrap(text, width=42) or [text]
        dd = ImageDraw.Draw(Image.new("RGBA",(10,10)))
        lh = (font.getbbox("Ay")[3]-font.getbbox("Ay")[1]) + 12
        widths=[dd.textlength(ln,font=font) for ln in lines]; padx,pady=26,16
        boxw=int(max(widths)+padx*2); boxh=int(lh*len(lines)+pady*2)
        img=Image.new("RGBA",(vw,vh),(0,0,0,0)); dr=ImageDraw.Draw(img)
        bx=(vw-boxw)//2; by=vh-boxh-48
        dr.rounded_rectangle([bx,by,bx+boxw,by+boxh],radius=14,fill=(15,17,25,205))
        y=by+pady
        for ln,w in zip(lines,widths):
            x=(vw-w)//2; dr.text((x+2,y+2),ln,font=font,fill=(0,0,0,180)); dr.text((x,y),ln,font=font,fill=(255,255,255,255)); y+=lh
        img.save(path)
    pngs=[]
    for n,(a,b,txt) in enumerate(cues):
        p=os.path.join(capdir,f"c{n:03d}.png"); render(txt,p); pngs.append(p)
    inputs=["-i",vin]
    for p in pngs: inputs+=["-i",p]
    fc=[]; prev="[0:v]"
    for i,(a,b,_) in enumerate(cues):
        lbl=f"[v{i}]"; fc.append(f"{prev}[{i+1}:v]overlay=0:0:enable='between(t,{a:.2f},{b:.2f})'{lbl}"); prev=lbl
    print(f"[pillow] {len(cues)} cues over {vdur:.1f}s using {FFMPEG} -> {vout}")
    subprocess.check_call([FFMPEG,"-y","-loglevel","error",*inputs,"-filter_complex",";".join(fc),
        "-map",prev,"-map","0:a","-c:v","libx264","-pix_fmt","yuv420p","-crf","23","-preset","medium",
        "-c:a","copy","-t",f"{vdur:.2f}", vout])
    shutil.rmtree(capdir, ignore_errors=True)

print("OK:", vout, f"{os.path.getsize(vout)/1e6:.2f} MB")
