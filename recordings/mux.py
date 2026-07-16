#!/usr/bin/env python3
import json, subprocess, os, sys

TL = "/tmp/pw-demo/timeline.json"
CLIPDIR = "/tmp/pw-demo/clips"
d = json.load(open(TL))
vid = d["video"]
marks = d["marks"]

def dur(p):
    return float(subprocess.check_output(
        ["ffprobe","-v","error","-show_entries","format=duration","-of","default=nk=1:nw=1",p]).strip())

vdur = dur(vid)

# Anchor each clip at max(event_time, prev_end) -> no overlap, still event-synced
sched = []
prev_end = 0.0
for i, m in enumerate(marks):
    wav = f"{CLIPDIR}/clip_{i}.wav"
    cd = dur(wav)
    start = max(m["t"], prev_end)
    # keep last clip inside the video
    if start + cd > vdur - 0.2:
        start = max(0.0, vdur - 0.2 - cd)
        start = max(start, prev_end)
    sched.append((i, wav, start, cd))
    prev_end = start + cd

audio_end = max(s + c for _, _, s, c in sched)
target = max(vdur, audio_end + 0.6)   # pad video (freeze last frame) so closing line finishes
pad = round(max(0.0, target - vdur), 2)
print(f"video={vdur:.2f}s  audio_end={audio_end:.2f}s  pad={pad:.2f}s  clips={len(sched)}")
for i, wav, start, cd in sched:
    print(f"  clip {i:2d}  start {start:6.2f}s  end {start+cd:6.2f}s")

# Build ffmpeg: video input + each clip input, adelay each, amix
inputs = ["-i", vid]
for _, wav, _, _ in sched:
    inputs += ["-i", wav]

fc = []
# video: optionally freeze-extend the last frame
if pad > 0:
    fc.append(f"[0:v]tpad=stop_mode=clone:stop_duration={pad}[vout]")
    vmap = "[vout]"
else:
    vmap = "0:v"
mix_labels = []
for n, (i, wav, start, cd) in enumerate(sched):
    delay_ms = int(round(start * 1000))
    lbl = f"a{n}"
    fc.append(f"[{n+1}:a]adelay={delay_ms}|{delay_ms}[{lbl}]")
    mix_labels.append(f"[{lbl}]")
# mix all narration clips; normalize=0 keeps volume (no auto-attenuation)
fc.append(f"{''.join(mix_labels)}amix=inputs={len(sched)}:normalize=0:dropout_transition=0[aout]")
filter_complex = ";".join(fc)

out = sys.argv[1] if len(sys.argv) > 1 else "/tmp/pw-demo/out.mp4"
cmd = ["ffmpeg","-y","-loglevel","error", *inputs,
       "-filter_complex", filter_complex,
       "-map", vmap, "-map","[aout]",
       "-c:v","libx264","-pix_fmt","yuv420p","-crf","23","-preset","medium",
       "-c:a","aac","-b:a","160k","-t", f"{target:.2f}", out]
print("Running ffmpeg mux ->", out)
subprocess.check_call(cmd)
print("OK:", out, f"{os.path.getsize(out)/1e6:.2f} MB")
