# Narration script (injected audio — ElevenLabs)

Voice: **ElevenLabs** — *Sarah* (`EXAVITQu4vr4xnSDxMaL`, clear female), model `eleven_multilingual_v2`.

**Audio-led pacing.** Clips are pre-generated via the ElevenLabs API to measure duration; the recorder holds each screen for the line before advancing. Login passed in ~2s; general-idea intro on the home page; `prechat` narrated during the full-page load; visible cursor + "Chat with Iris (UAT)" callout before the click; ends with a closing statement.

| # | Event time | Step | Narration |
|---|---|---|---|
| 0 | 0.0s | `home` | This demo runs on a third-party custom site that simulates the FIFA 2026 website, an external site to the Salesforce org. |
| 1 | 8.5s | `purpose` | It shows how to add a custom Quit button that lets a user cleanly end the Iris agent chat, without changing the out-of-the-box M-I-A-W component. |
| 2 | 18.7s | `overview` | Everything runs here on the external page. We'll open the agent in full-page mode, start a conversation, ask for today's schedule, and then quit back to this home page. |
| 3 | 29.6s | `open-chat` | So, on the home page, we click the chat widget to start a chat with the Iris agent in the U-A-T environment. |
| 4 | 36.8s | `prechat` | Iris opens in full-page mode, and the pre-chat form loads. We fill in our details and start the conversation. |
| 5 | 51.9s | `welcome` | Iris greets us with a personalized welcome. |
| 6 | 54.8s | `ask-schedule` | We ask Iris for today's match schedule. |
| 7 | 68.7s | `schedule-reply` | Iris replies with the full match schedule for today. |
| 8 | 73.6s | `thanks` | We thank the assistant. |
| 9 | 83.1s | `survey` | Iris responds with a short feedback survey. |
| 10 | 88.7s | `quit` | Now the key step: we click the custom Quit button in the bottom bar. |
| 11 | 92.5s | `home-return` | The session ends and the UI switches back to the home page, with no change to the M-I-A-W component. |
| 12 | 100.4s | `new-convo` | Clicking the Iris U-A-T widget again immediately starts a brand-new conversation. The pre-chat form reappears. |
| 13 | 108.7s | `closing` | And that concludes our quick demo on how to support an easy exit from the conversation. |
