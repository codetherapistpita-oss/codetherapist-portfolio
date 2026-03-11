# 🚀 Deploy This Site — Get a Live Link

Two options. Pick the fastest one for you.

---

## Option 1: Live Link in ~30 Seconds (No GitHub)

**Netlify Drop** — no install, no terminal:

1. Go to **[app.netlify.com/drop](https://app.netlify.com/drop)**
2. Drag this entire folder onto the page
3. Netlify uploads and gives you a live link (e.g. `random-name-123.netlify.app`)
4. Optional: sign up to customize the URL

---

## Option 2: One Command (Surge — Requires Node.js)

If you have [Node.js](https://nodejs.org) installed, run this in PowerShell from this folder:

```powershell
cd "D:\CODE THERAPIST EMPIRE\PRESENTABLE PROJECTS\just testing html css and js"
npx surge . --domain codetherapist.surge.sh
```

- First run: you’ll be asked to create a free Surge account (email + password)
- After that, you get a live link (e.g. `codetherapist.surge.sh`)

---

## Option 3: GitHub + GitHub Pages (Free Hosting)

1. Create a new repo on GitHub named `codetherapist-portfolio` (or any name)
2. Run the `deploy-to-github.ps1` script in this folder (see below)
3. On GitHub: **Settings → Pages →** set source to `main` branch
4. Your site will be at: `https://codetherapistpita-oss.github.io/codetherapist-portfolio/`

---

## Run the Deploy Script

The `deploy-to-github.ps1` script will:
- Initialize git (if needed)
- Add and commit all files
- Create the repo on GitHub (via `gh` CLI) and push
- Print your GitHub repo URL

**Requirements:** [GitHub CLI](https://cli.github.com/) installed and logged in (`gh auth login`).

**Run it:**
```powershell
cd "D:\CODE THERAPIST EMPIRE\PRESENTABLE PROJECTS\just testing html css and js"
.\deploy-to-github.ps1
```
