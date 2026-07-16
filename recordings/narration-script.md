# Narration script (injected audio)

Voice: macOS `say` — **Samantha** (female, US) @ 175 wpm.

**Audio-led pacing.** Login is passed in ~2s; the general-idea intro plays on the home page. The `prechat` line is narrated *during* the full-page load (no silent gap). A visible cursor + "Chat with Iris (UAT)" callout hovers the widget before the click. Ends with a closing statement.

| # | Event time | Step | Narration |
|---|---|---|---|
| 0 | 0.0s | `home` | This demo runs on a third-party custom site that simulates the FIFA 2026 website, an external site to the Salesforce org. |
| 1 | 8.3s | `purpose` | It shows how to add a custom Quit button that lets a user cleanly end the Iris agent chat, without changing the out-of-the-box M-I-A-W component. |
| 2 | 16.9s | `overview` | Everything runs here on the external page. We'll open the agent in full-page mode, start a conversation, ask for today's schedule, and then quit back to this home page. |
| 3 | 27.3s | `open-chat` | So, on the home page, we click the chat widget to start a chat with the Iris agent in the U-A-T environment. |
| 4 | 34.6s | `prechat` | Iris opens in full-page mode, and the pre-chat form loads. We fill in our details and start the conversation. |
| 5 | 49.3s | `welcome` | Iris greets us with a personalized welcome. |
| 6 | 52.0s | `ask-schedule` | We ask Iris for today's match schedule. |
| 7 | 64.9s | `schedule-reply` | Iris replies with the full match schedule for today. |
| 8 | 69.6s | `thanks` | We thank the assistant. |
| 9 | 79.0s | `survey` | Iris responds with a short feedback survey. |
| 10 | 84.2s | `quit` | Now the key step: we click the custom Quit button in the bottom bar. |
| 11 | 87.9s | `home-return` | The session ends and the UI switches back to the home page, with no change to the M-I-A-W component. |
| 12 | 94.8s | `new-convo` | Clicking the Iris U-A-T widget again immediately starts a brand-new conversation. The pre-chat form reappears. |
| 13 | 102.7s | `closing` | And that concludes our quick demo on how to support an easy exit from the conversation. |
