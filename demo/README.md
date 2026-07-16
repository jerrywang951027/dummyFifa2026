# UAT Chat Widget — End-to-End Demo Recording

Automated walkthrough of the **Iris (UAT / `agentuat`)** embedded-messaging chat on
`https://jerrywang951027.github.io/dummyFifa2026`, captured with Playwright.

## Files
| File | Format | Notes |
|------|--------|-------|
| `fifa26-uat-chat-demo.gif`  | Animated GIF | ~57s, inline-viewable in GitHub |
| `fifa26-uat-chat-demo.mp4`  | H.264 MP4    | Smallest, best for playback |
| `fifa26-uat-chat-demo.webm` | VP8 WebM     | Original Playwright capture |

![UAT chat demo](fifa26-uat-chat-demo.gif)

## Flow captured
1. Open the home page and pass the client-side auth gate (`sfdc` / `admin123`).
2. Dismiss the country modal (USA).
3. Click the **UAT** chat launcher (green, bottom-left → `chat-fullscreen.html?org=agentuat`).
4. Prechat form → enter email `eternalwangjs@gmail.com` (name fields are required by the
   deployment, so they are filled too) → **Start Conversation**.
5. Wait for Iris's welcome message.
6. Type **"schedule for today"** in the bottom edit box → wait for the agent's reply
   (returns the July 15, 2026 match schedule).
7. Type **"thanks"** → wait for the **Quick Feedback** survey form to appear.
8. Click **Quit** to end the session and return to the home page.

## Reproduce
The recording script lives in `/tmp/pw-demo/record.js` (Playwright 1.61.1). Chromium is
launched with Private-Network-Access / CORS relaxed so the cross-origin
`bootstrap.min.js` from the sandbox site loads in automation.
