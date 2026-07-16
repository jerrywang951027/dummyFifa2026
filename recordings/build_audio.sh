#!/bin/bash
set -e
cd /tmp/pw-demo
VOICE="${VOICE:-Samantha}"
RATE="${RATE:-175}"
TL=timeline.json
VID=$(python3 -c "import json;print(json.load(open('$TL'))['video'])")
CLIPDIR=/tmp/pw-demo/clips
rm -rf "$CLIPDIR"; mkdir -p "$CLIPDIR"

N=$(python3 -c "import json;print(len(json.load(open('$TL'))['marks']))")
echo "Generating $N narration clips (voice=$VOICE rate=$RATE)..."

# Generate each clip: say -> aiff -> wav(48k stereo). Capture start time + duration.
python3 - "$TL" > /tmp/pw-demo/marks.tsv <<'PY'
import json,sys
d=json.load(open(sys.argv[1]))
for i,m in enumerate(d['marks']):
    print(f"{i}\t{m['t']}\t{m['text']}")
PY

FILTER=""
INPUTS=""
IDX=0
DELAYS=()
while IFS=$'\t' read -r i t text; do
  aiff="$CLIPDIR/clip_$i.aiff"
  wav="$CLIPDIR/clip_$i.wav"
  say -v "$VOICE" -r "$RATE" -o "$aiff" "$text"
  ffmpeg -y -loglevel error -i "$aiff" -ar 48000 -ac 2 "$wav"
  dur=$(ffprobe -v error -show_entries format=duration -of default=nk=1:nw=1 "$wav")
  printf "  clip %2s  @%6.2fs  (%.2fs)  %s\n" "$i" "$t" "$dur" "$(echo "$text" | cut -c1-50)"
  DELAYS+=("$i:$t")
done < /tmp/pw-demo/marks.tsv

echo "$VID" > /tmp/pw-demo/vidpath.txt
echo "Clips ready in $CLIPDIR"
