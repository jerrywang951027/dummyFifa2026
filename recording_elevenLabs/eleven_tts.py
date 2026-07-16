#!/usr/bin/env python3
"""Generate one narration clip via the ElevenLabs REST API -> 48k stereo WAV.
Usage: python3 eleven_tts.py "text to speak" /path/out.wav
Env:   ELEVENLABS_API_KEY (required)
       ELEVEN_VOICE_ID   (default Rachel = 21m00Tcm4TlvDq8ikWAM, clear female)
       ELEVEN_MODEL      (default eleven_multilingual_v2)
"""
import os, sys, subprocess, requests

KEY = os.environ.get("ELEVENLABS_API_KEY")
if not KEY:
    sys.exit("ELEVENLABS_API_KEY not set")
VOICE = os.environ.get("ELEVEN_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")   # Rachel (clear female)
MODEL = os.environ.get("ELEVEN_MODEL", "eleven_multilingual_v2")

text = sys.argv[1]
out_wav = sys.argv[2]
out_mp3 = out_wav.rsplit(".", 1)[0] + ".mp3"

resp = requests.post(
    f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}",
    headers={"xi-api-key": KEY, "Content-Type": "application/json", "Accept": "audio/mpeg"},
    json={
        "text": text,
        "model_id": MODEL,
        "voice_settings": {"stability": 0.8, "similarity_boost": 0.9, "style": 0.1, "use_speaker_boost": True},
    },
    timeout=90,
)
if resp.status_code != 200:
    sys.exit(f"ElevenLabs API {resp.status_code}: {resp.text[:300]}")
with open(out_mp3, "wb") as f:
    f.write(resp.content)
subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", out_mp3, "-ar", "48000", "-ac", "2", out_wav], check=True)
print(out_wav)
