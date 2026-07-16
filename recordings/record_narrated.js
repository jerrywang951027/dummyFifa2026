const { chromium } = require('playwright');
const fs = require('fs');
const { execSync } = require('child_process');

const ARGS = ['--disable-web-security','--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,IsolateOrigins,site-per-process'];
const OUT = '/tmp/pw-demo/video-narrated';
const TIMELINE = '/tmp/pw-demo/timeline.json';
const CLIPDIR = '/tmp/pw-demo/preclips';
const HOME = 'https://jerrywang951027.github.io/dummyFifa2026/';
const EMAIL = 'eternalwangjs@gmail.com';
const VOICE = process.env.VOICE || 'Samantha';
const RATE = process.env.RATE || '175';
const VW = 1360, VH = 860;
const log = (...a) => console.log('•', ...a);
const sleep = (p, ms) => p.waitForTimeout(ms);
const msgFrame = (page) => page.frames().find(f => /site\.com/.test(f.url()));

// ---- narration lines (single source of truth; build_audio.sh reads the same text from timeline.json) ----
const NARR = {
  home:            "This demo runs on a third-party custom site that simulates the FIFA 2026 website, an external site to the Salesforce org.",
  purpose:         "It shows how to add a custom Quit button that lets a user cleanly end the Iris agent chat, without changing the out-of-the-box M-I-A-W component.",
  overview:        "Everything runs here on the external page. We'll open the agent in full-page mode, start a conversation, ask for today's schedule, and then quit back to this home page.",
  'open-chat':     "So, on the home page, we click the chat widget to start a chat with the Iris agent in the U-A-T environment.",
  prechat:         "Iris opens in full-page mode, and the pre-chat form loads. We fill in our details and start the conversation.",
  welcome:         "Iris greets us with a personalized welcome.",
  'ask-schedule':  "We ask Iris for today's match schedule.",
  'schedule-reply':"Iris replies with the full match schedule for today.",
  thanks:          "We thank the assistant.",
  survey:          "Iris responds with a short feedback survey.",
  quit:            "Now the key step: we click the custom Quit button in the bottom bar.",
  'home-return':   "The session ends and the UI switches back to the home page, with no change to the M-I-A-W component.",
  'new-convo':     "Clicking the Iris U-A-T widget again immediately starts a brand-new conversation. The pre-chat form reappears.",
  closing:         "And that concludes our quick demo on how to support an easy exit from the conversation.",
};

// pre-generate each clip once to learn its DURATION so the video can hold in-sync
const DUR = {};
function pregenerate() {
  fs.rmSync(CLIPDIR, { recursive: true, force: true }); fs.mkdirSync(CLIPDIR, { recursive: true });
  for (const [id, text] of Object.entries(NARR)) {
    const aiff = `${CLIPDIR}/${id}.aiff`, wav = `${CLIPDIR}/${id}.wav`;
    execSync(`say -v ${JSON.stringify(VOICE)} -r ${RATE} -o ${JSON.stringify(aiff)} ${JSON.stringify(text)}`);
    execSync(`ffmpeg -y -loglevel error -i ${JSON.stringify(aiff)} -ar 48000 -ac 2 ${JSON.stringify(wav)}`);
    DUR[id] = parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of default=nk=1:nw=1 ${JSON.stringify(wav)}`).toString().trim());
  }
  log('clip durations (s):', Object.entries(DUR).map(([k, v]) => `${k}=${v.toFixed(1)}`).join(' '));
}

let START = 0, lastMarkAt = 0, lastMarkId = null;
const marks = [];
const mark = (id) => {
  const t = (Date.now() - START) / 1000;
  marks.push({ id, t: Math.round(t * 100) / 100, text: NARR[id] });
  lastMarkAt = Date.now(); lastMarkId = id;
  log(`  ⏱  [${t.toFixed(1)}s] (${id}) ${NARR[id]}`);
};
async function holdForNarration(page, extraMs = 350) {
  const id = lastMarkId; if (!id || !DUR[id]) return;
  const remain = DUR[id] * 1000 + extraMs - (Date.now() - lastMarkAt);
  if (remain > 0) await sleep(page, Math.round(remain));
}

// inject a visible fake cursor (arrow) at a page-viewport point (Playwright's real cursor isn't recorded)
async function showCursor(page, x, y) {
  await page.evaluate(({ x, y }) => {
    let c = document.getElementById('__fakecursor');
    if (!c) { c = document.createElement('div'); c.id = '__fakecursor'; document.body.appendChild(c); }
    c.style.cssText = `position:fixed;left:${x - 3}px;top:${y - 2}px;width:28px;height:28px;z-index:2147483647;pointer-events:none;filter:drop-shadow(0 1px 3px rgba(0,0,0,.45));transition:left .25s ease,top .25s ease`;
    c.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='28' viewBox='0 0 24 24'><path d='M4 2 L4 20 L9 15 L12.5 22.5 L15.5 21.2 L12 13.8 L19 13.8 Z' fill='white' stroke='black' stroke-width='1.4' stroke-linejoin='round'/></svg>`;
  }, { x, y });
}
async function hideCursor(page) { await page.evaluate(() => { const c = document.getElementById('__fakecursor'); if (c) c.remove(); }); }

function transcript(frame) {
  return frame.evaluate(() => {
    let o = '';
    const wk = r => r.querySelectorAll('*').forEach(e => {
      const c = e.getAttribute && e.getAttribute('class') || '';
      if (/slds-chat-list|chat-history/.test(c)) { if ((e.innerText || '').length > o.length) o = e.innerText || ''; }
      if (e.shadowRoot) wk(e.shadowRoot);
    });
    wk(document); return o;
  });
}
const irisCount = t => (t.match(/Iris\s*[·•]/g) || []).length;
const hasSurvey = t => /quick feedback|submit feedback|how satisfied|share your feedback|rate/i.test(t);
async function read(page) { const f = msgFrame(page); return f ? transcript(f).catch(() => '') : ''; }

async function waitReply(page, targetIris, timeout, label) {
  const t0 = Date.now(); let started = false;
  while (Date.now() - t0 < timeout) {
    await sleep(page, 900);
    if (irisCount(await read(page)) >= targetIris) { started = true; log(`  ${label}: reply started (${((Date.now()-t0)/1000|0)}s)`); break; }
  }
  if (!started) { log(`  ${label}: reply not detected (continuing)`); return; }
  let last = -1;
  for (let i = 0; i < 8; i++) { await sleep(page, 900); const l = (await read(page)).length; if (l === last) break; last = l; }
}

(async () => {
  log('pre-generating narration clips to measure durations...');
  pregenerate();

  fs.rmSync(OUT, { recursive: true, force: true });
  const browser = await chromium.launch({ headless: true, args: ARGS });
  const ctx = await browser.newContext({
    viewport: { width: VW, height: VH }, ignoreHTTPSErrors: true,
    recordVideo: { dir: OUT, size: { width: VW, height: VH } },
  });
  const page = await ctx.newPage();
  START = Date.now();

  // 1) FAST entry — narration starts now (general idea), but we blow through login in <=2s
  mark('home');
  await page.goto(HOME, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(page, 900);
  // 1a) Auth gate — sign in FAST (instant fill, no per-char delay)
  if (await page.locator('#authForm').isVisible().catch(() => false)) {
    await page.locator('#authUser').fill('sfdc');
    await page.locator('#authPass').fill('admin123');
    await sleep(page, 450);
    await page.locator('#authForm button').first().click();
    await sleep(page, 900);
  }
  // 1b) Country modal — quick select
  if (await page.locator('#countryModal:not([hidden])').isVisible().catch(() => false)) {
    await page.locator('.country-tile[data-country="usa"]').click();
    await sleep(page, 900);
  }
  await sleep(page, 400); // now settled on the HOME page

  // ---- spend the general-idea intro ON THE HOME PAGE ----
  await holdForNarration(page);           // finish 'home' line on the home page
  mark('purpose');  await holdForNarration(page);
  mark('overview'); await holdForNarration(page);

  // 2) Open UAT chat widget — VISIBLE cursor hovers the widget, narrate fully, then click
  const uat = page.locator('a[title="Chat with Iris (UAT)"]');
  await uat.waitFor({ state: 'visible', timeout: 15000 });
  const ub = await uat.boundingBox().catch(() => null);
  const ucx = ub ? ub.x + ub.width / 2 : VW / 2, ucy = ub ? ub.y + ub.height / 2 : VH - 60;
  if (ub) await page.mouse.move(ucx, ucy, { steps: 25 });
  mark('open-chat');
  // visible fake cursor + "Chat with Iris (UAT)" callout + pulse on the bubble
  await showCursor(page, ucx, ucy);
  await page.evaluate((sel) => {
    const el = document.querySelector(sel); if (!el) return;
    const r = el.getBoundingClientRect();
    const tip = document.createElement('div');
    tip.id = '__iris_uat_tip'; tip.textContent = 'Chat with Iris (UAT)';
    const left = Math.min(r.right + 16, window.innerWidth - 220);
    tip.style.cssText = `position:fixed;left:${left}px;top:${r.top - 6}px;transform:translateY(-100%);background:#1b1b2f;color:#fff;font:600 15px/1.2 -apple-system,Segoe UI,sans-serif;padding:10px 14px;border-radius:10px;box-shadow:0 8px 26px rgba(0,0,0,.35);z-index:2147483647;white-space:nowrap;pointer-events:none`;
    document.body.appendChild(tip);
    const style = document.createElement('style');
    style.textContent = `@keyframes irisPulse{0%{box-shadow:0 0 0 0 rgba(46,204,113,.75)}70%{box-shadow:0 0 0 22px rgba(46,204,113,0)}100%{box-shadow:0 0 0 0 rgba(46,204,113,0)}}`;
    document.head.appendChild(style);
    el.style.borderRadius = '50%'; el.style.animation = 'irisPulse 1100ms ease-out 5';
  }, 'a[title="Chat with Iris (UAT)"]');
  await holdForNarration(page, 500);            // cursor+tooltip stay for the whole line (>=2s); finish BEFORE navigating
  await page.evaluate(() => { const t = document.getElementById('__iris_uat_tip'); if (t) t.remove(); });
  await hideCursor(page);
  await sleep(page, 300);
  await uat.click();                            // now enter full-page mode

  // 3) Prechat — narrate DURING the full-page load so there's no silent gap, then fill
  mark('prechat');
  await page.waitForSelector('#embeddedMessagingFrame', { timeout: 45000 });
  await sleep(page, 5000);
  let frame = msgFrame(page);
  await frame.locator('input[name="_email"]').waitFor({ timeout: 30000 });
  await frame.locator('input[name="_firstName"]').fill('Jin');
  await frame.locator('input[name="_lastName"]').fill('Wang');
  const email = frame.locator('input[name="_email"]');
  await email.click(); await email.pressSequentially(EMAIL, { delay: 40 });
  await holdForNarration(page);
  await frame.getByRole('button', { name: /Start Conversation/i }).click();
  await page.waitForSelector('.ama-bottom:not(.ama-hidden)', { timeout: 40000 }).catch(() => log('   (bottom bar wait fell through)'));

  // 4) Welcome
  { const t0 = Date.now(); while (Date.now() - t0 < 30000) { if (irisCount(await read(page)) >= 1) break; await sleep(page, 900); } }
  mark('welcome'); await holdForNarration(page);

  // 5) Ask: schedule for today
  mark('ask-schedule');
  const input = page.locator('#amaInput');
  await input.click(); await input.pressSequentially('schedule for today', { delay: 55 });
  await holdForNarration(page);
  await sleep(page, 300); await page.locator('#amaSend').click();
  await waitReply(page, 2, 60000, 'schedule');
  mark('schedule-reply'); await holdForNarration(page); await sleep(page, 1500);

  // 6) Thanks -> agent sends feedback survey
  mark('thanks');
  await input.click(); await input.pressSequentially('thanks', { delay: 65 });
  await holdForNarration(page);
  await sleep(page, 300); await page.locator('#amaSend').click();

  { const t0 = Date.now(); let ok = false; while (Date.now() - t0 < 45000) { await sleep(page, 1200); if (hasSurvey(await read(page))) { ok = true; break; } } log('   survey ' + (ok ? 'detected' : 'not detected')); }
  { const t0 = Date.now(); while (Date.now() - t0 < 15000) { if (/submit feedback/i.test(await read(page))) break; await sleep(page, 800); } }
  await sleep(page, 1500);

  // 6b) Show the survey (scroll into view)
  mark('survey');
  { const box = await page.locator('#embeddedMessagingFrame').boundingBox().catch(() => null);
    if (box) { await page.mouse.move(box.x + box.width / 2, box.y + box.height * 0.5); for (let i = 0; i < 16; i++) { await page.mouse.wheel(0, 60); await sleep(page, 120); } }
    const f = msgFrame(page);
    const scrollToSubmit = f.evaluate(async () => {
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      let n = 0, submit = null, scroller = null;
      const wk = r => { for (const e of r.querySelectorAll('*')) { if (++n > 15000) return;
        if (!submit && /submit feedback/i.test(e.textContent || '') && e.childElementCount <= 3) submit = e;
        if (!scroller) { try { const st = getComputedStyle(e); if (/auto|scroll/.test(st.overflowY) && e.scrollHeight - e.clientHeight > 40) scroller = e; } catch (_) {} }
        if (e.shadowRoot) wk(e.shadowRoot);
      } };
      wk(document);
      if (submit && submit.scrollIntoView) submit.scrollIntoView({ block: 'center' });
      else if (scroller) { const from = scroller.scrollTop, to = scroller.scrollHeight; for (let i = 1; i <= 20; i++) { scroller.scrollTop = from + (to - from) * (i / 20); await sleep(60); } }
      return submit ? 'submit-centered' : (scroller ? 'scrolled-bottom' : 'no-target');
    }).catch(e => 'err ' + e.message);
    log('   ' + await Promise.race([scrollToSubmit, new Promise(r => setTimeout(() => r('scroll-timeout'), 6000))]));
  }
  await holdForNarration(page); await sleep(page, 2500);

  // 7) Click the custom Quit button WITH a special click effect (visible cursor + ripple)
  mark('quit');
  const quit = page.locator('#amaQuit');
  await quit.scrollIntoViewIfNeeded().catch(() => {});
  const qb = await quit.boundingBox().catch(() => null);
  if (qb) { await page.mouse.move(qb.x + qb.width / 2, qb.y + qb.height / 2, { steps: 20 }); await showCursor(page, qb.x + qb.width / 2, qb.y + qb.height / 2); await sleep(page, 600); }
  await page.evaluate(() => {
    const el = document.getElementById('amaQuit'); if (!el) return;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes amaRipple{0%{transform:translate(-50%,-50%) scale(0.25);opacity:.9}100%{transform:translate(-50%,-50%) scale(18);opacity:0}}
      @keyframes amaPulse{0%{box-shadow:0 0 0 0 rgba(217,42,36,.85)}70%{box-shadow:0 0 0 22px rgba(217,42,36,0)}100%{box-shadow:0 0 0 0 rgba(217,42,36,0)}}
      #amaQuit.ama-fx{animation:amaPulse 800ms ease-out 3;transform:scale(1.1);transition:transform .18s}`;
    document.head.appendChild(style);
    el.classList.add('ama-fx');
    const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const ring = () => { const d = document.createElement('div');
      d.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:26px;height:26px;border-radius:50%;background:rgba(217,42,36,.5);pointer-events:none;z-index:2147483647;animation:amaRipple 950ms ease-out forwards`;
      document.body.appendChild(d); setTimeout(() => d.remove(), 1000); };
    ring(); setTimeout(ring, 280); setTimeout(ring, 560);
  });
  await sleep(page, 1500);
  await quit.click({ timeout: 12000 }).catch(async () => { log('   (forcing quit click)'); await quit.click({ force: true }).catch(() => {}); });
  await page.waitForURL('**/index.html', { timeout: 15000 }).catch(() => log('   (home url wait fell through)'));
  await sleep(page, 800);
  mark('home-return'); await holdForNarration(page); await sleep(page, 800);

  // 8) Click the UAT widget again -> a brand-new conversation (visible cursor hover)
  mark('new-convo');
  const uat2 = page.locator('a[title="Chat with Iris (UAT)"]');
  await uat2.waitFor({ state: 'visible', timeout: 15000 }).catch(() => log('   (UAT launcher not found)'));
  const ub2 = await uat2.boundingBox().catch(() => null);
  if (ub2) { const x = ub2.x + ub2.width / 2, y = ub2.y + ub2.height / 2; await page.mouse.move(x, y, { steps: 20 }); await showCursor(page, x, y); await sleep(page, 2000); await hideCursor(page); }
  await uat2.click().catch(() => {});
  await page.waitForSelector('#embeddedMessagingFrame', { timeout: 45000 }).catch(() => {});
  { const t0 = Date.now(); while (Date.now() - t0 < 20000) { const f = msgFrame(page); if (f && await f.locator('input[name="_email"]').isVisible().catch(() => false)) break; await sleep(page, 800); } }
  await holdForNarration(page); await sleep(page, 1000);

  // 9) Closing statement
  mark('closing'); await holdForNarration(page); await sleep(page, 800);

  const total = (Date.now() - START) / 1000;
  const video = page.video();
  await ctx.close();
  await browser.close();
  const vpath = await video.path().catch(() => null);
  fs.writeFileSync(TIMELINE, JSON.stringify({ video: vpath, total, viewport: { w: VW, h: VH }, voice: VOICE, rate: RATE, marks }, null, 2));
  log('DONE. video:', vpath);
  log('timeline:', TIMELINE, '(' + marks.length + ' marks, total ' + total.toFixed(1) + 's)');
})();
