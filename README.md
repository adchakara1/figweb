# English Language Assessment Portal
### Comprehension, Vocabulary & Summary Practice — Auto-graded with Teacher Sync

---

## Files in this folder

| File | Purpose |
|------|---------|
| `index.html` | The entire app — all 7 passages, grading engine, sync, PWA |
| `manifest.json` | Makes the app installable on phones and desktops |
| `sw.js` | Service worker — enables full offline use after first visit |
| `netlify.toml` | Netlify deployment config (headers, cache rules) |
| `vercel.json` | Vercel deployment config |
| `README.md` | This file |

---

## Option A — Deploy to Netlify (recommended, free)

1. Go to **https://app.netlify.com** → Log in with Google or GitHub
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag the entire folder (all files above) into the upload area
4. Netlify gives you a URL like `https://your-name.netlify.app` — share this with students
5. **Custom domain** (optional): Site settings → Domain management → Add custom domain

**Auto-deploy from GitHub** (better for updates):
1. Push all files to a GitHub repository
2. Netlify → "Add new site" → "Import from Git" → connect your repo
3. Every `git push` auto-redeploys

---

## Option B — Deploy to Vercel (free)

1. Install Vercel CLI: `npm i -g vercel`
2. In this folder, run: `vercel`
3. Follow the prompts — your app is live in ~30 seconds
4. Or use the Vercel dashboard: **https://vercel.com** → New Project → upload folder

---

## Option C — GitHub Pages (free, no CLI needed)

1. Create a new GitHub repository (public)
2. Upload all files to the repository
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your app is live at `https://yourusername.github.io/repo-name`

---

## After deploying — connect Google Sheets

1. Open `index.html` and find:
   ```javascript
   const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID_HERE/exec';
   ```
2. Replace with your Apps Script URL (see `Code.gs` setup guide)
3. Re-upload/re-push the updated `index.html`

---

## Student installation (PWA)

Once the app is hosted, students can install it like a native app:

**Android (Chrome):**
- Open the URL → tap the "Install ELA Portal" banner at the bottom → Install

**iPhone/iPad (Safari):**
- Open the URL → tap Share → "Add to Home Screen"

**Desktop (Chrome/Edge):**
- Open the URL → click the install icon (⊕) in the address bar

After installing, the app works **fully offline** — students can complete exercises without internet. Scores sync automatically when they reconnect.

---

## 7 Comprehension passages included

| # | Title | Marks | Type |
|---|-------|-------|------|
| 1 | Chinese Money-Lender | 25 | Short comprehension + vocab |
| 2 | Miles and the Old Man | 25 | Short comprehension + vocab |
| 3 | The Fountain Pen | 21 | Short comprehension + vocab |
| 4 | An Otter in the Air | 25 | Short comprehension + vocab |
| 5 | Corbett and the Beast of Kanda | 50 | Long comp + summary grid + language structures |
| 6 | Treasure Hunt and the Cyclone | 25 | Short comprehension + vocab + summary grid |
| 7 | Joseph and the Pirate King | 50 | Long comprehension + vocab + summary grid |

---

## Updating the app

- Add new passages: edit the `passages` array in `index.html`
- Update the GAS URL: change `GAS_WEB_APP_URL` near the top of the `<script>` block
- Re-deploy: drag the updated folder to Netlify, or `git push` if connected to GitHub
