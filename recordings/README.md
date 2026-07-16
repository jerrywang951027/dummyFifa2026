# FIFA 2026 UAT Chat — Narrated Demo Recording

An MP4 screen recording of the live UAT Iris chat flow **with synced injected audio narration**.

## What the demo shows
Running on a **third-party custom website that simulates the FIFA 2026 site** (an external site to the Salesforce org), it demonstrates how to **add a custom Quit button that ends the Iris agent chat without changing the out-of-the-box MIAW component**. The `Quit` button is a host-page control (`#amaQuit`) that calls `embeddedservice_bootstrap.userVerificationAPI.clearSession()` + `utilAPI.removeAllComponents()` and then navigates back to the home page.

## Deliverables (two voice variants, local `say`)
- **`fifa26-uat-chat-narrated.mp4`** — ~6.0 MB, ~108s — voice **Samantha** (female, US) @ 175 wpm
- **`fifa26-uat-chat-narrated-evan.mp4`** — ~5.4 MB, ~110s — voice **Evan (Enhanced)** (male, US) @ 175 wpm

Both H.264 video + AAC. Timelines: `timeline.json` (Samantha), `timeline-evan.json` (Evan). Regenerate either with `VOICE="Evan (Enhanced)" bash build_audio.sh` (after `node record_narrated.js` with the same VOICE) + `mux.py`.

> Siri voices can't be used here — Apple restricts them to first-party features; `say` and third-party TTS cannot access them. "Enhanced"/"Premium" downloadable voices (like Evan) *do* work with `say`.

## Pacing & cursor
- **Login is passed in ~2s** — the sign-in gate is filled instantly and submitted; the video does not linger there.
- The **general-idea intro** (`home` / `purpose` / `overview`) is narrated **on the home page**, after region selection.
- A **visible fake cursor** (Playwright's real cursor isn't recorded) hovers over the Iris (UAT) widget alongside the "Chat with Iris (UAT)" callout + pulse, and stays for the full `open-chat` line (>= 2s) before the click. The same cursor appears for the Quit click and the second widget click.

## Sync model (audio-led)
Narration clips are **pre-generated to measure their duration**, and the recorder **holds each screen for the full line before advancing**. This guarantees the *"we click the widget to chat with Iris in UAT"* line finishes **on the home page**, before the click navigates into full-page mode (the "full-page mode" line is narrated afterward, as the full page appears). The later steps have natural waits (agent replies), so audio and video stay aligned end-to-end with no freeze-padding.

## Flow recorded
1. Home page → pass client-side auth gate (`sfdc` / `admin123`) → select USA region (paced so each screen is visible)
2. **Stop on the home page**, then hover + click the **Iris (UAT)** chat widget to start the chat — this opens Iris in **full-page mode** (→ `chat-fullscreen.html?org=agentuat`) before the pre-chat form loads
2b. A **2s pause** on the home page with an injected **“Chat with Iris (UAT)”** callout + pulse indicates the target, before the click
3. Full-page mode loads → populate the pre-chat form → name (`Jin`/`Wang`, required by sandbox) + email `eternalwangjs@gmail.com` → Start Conversation
4. Wait for Iris welcome message
5. Ask **"schedule for today"** → agent's match-schedule reply
6. Say **"thanks"** → agent sends a short feedback survey (scrolled into view, shown in-recording)
7. **Click the custom `Quit` button** with an on-screen **ripple + pulse special effect** → capture the UI switching back to the home page
8. **Click the Iris (UAT) bubble again** → a brand-new conversation starts (fresh, empty pre-chat form)
9. Closing statement: *"that concludes our quick demo on how to support an easy exit from the conversation."*

The `prechat` line is narrated **during** the full-page load, so there's no silent gap when the chat window appears.

## How the injected audio is synced
Video-led strategy with anti-overlap anchoring:
1. `record_narrated.js` runs the Playwright flow, records video, and logs a **timestamp per narration beat** → `timeline.json`.
2. `build_audio.sh` generates one TTS clip per beat with macOS **`say`** (**Samantha** — female US voice — @ 175 wpm, local, no API key). Override with `VOICE="Ava (Premium)" bash build_audio.sh`.
3. `mux.py` anchors each clip at `max(event_time, previous_clip_end)` (so clips never overlap), `adelay`s each onto the timeline, `amix`es them, and muxes onto the video via ffmpeg.

The narration text is in **`narration-script.md`**.

## Reproduce
```bash
cd /tmp/pw-demo                 # needs playwright + chromium installed here
node record_narrated.js         # -> timeline.json + video-narrated/*.webm
bash build_audio.sh             # -> clips/*.wav
python3 mux.py "<repo>/recordings/fifa26-uat-chat-narrated.mp4"
```

## Swap the voice / TTS
- Different local voice: `VOICE="Alex" RATE=180 bash build_audio.sh`
- ElevenLabs (installed skill `elevenlabs`): generate clips per beat, drop them in `clips/`, re-run `mux.py`.

## Notes
- Narration for the fast opening steps (site intro + purpose, ~0–15s) spills past the early clicks by design — the wait before Iris's welcome (~21s) lets it catch up, keeping later beats on-time.
- The survey renders below the visible chat area in MIAW, so the recorder scrolls the chat down (mouse-wheel + in-frame `scrollIntoView` on **Submit Feedback**) to reveal the whole form.
- The video's last frame is freeze-padded (~4.5s) so the closing narration finishes on the home page.
- Waits were tightened (agent reply starts ~7–9s): total runtime dropped from ~99s to ~62s.

## Captioned variants (burned-in "live" captions)
Each MP4 has a `-cc` version with synced on-screen captions:
- `fifa26-uat-chat-narrated-cc.mp4` (Samantha) · `fifa26-uat-chat-narrated-evan-cc.mp4` (Evan)

Captions are generated from the narration timeline (`add_captions.py`): each line is split into
short chunks distributed across its audio window, rendered as transparent PNGs with **Pillow**, and
overlaid with ffmpeg's `overlay` filter (this ffmpeg build lacks libass, so no `subtitles`/`ass`
filter — the PNG-overlay path needs neither). Regenerate:
```bash
/tmp/pw-demo/capenv/bin/python add_captions.py <timeline.json> <in.mp4> <out-cc.mp4>
```
