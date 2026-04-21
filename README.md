# 🚀 Deployment Guide — 8 Landing Page Sites

This repo contains 8 production-ready static websites.  
Each site has its own `index.html`, `css/style.css`, and `js/main.js`.

---

## 📁 Project Structure

```
/
├── .gitignore
├── README.md
│
├── real-estate/          ← Aurum Estates
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
│
├── shortlet/             ← StayNest
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
│
├── construction/         ← IronBuild
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
│
├── hvac/                 ← ArcticAir
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
│
├── plumber/              ← FlowMaster
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
│
├── roofing/              ← Stonewall Roofing
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
│
├── food/                 ← Roots & Flame
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
│
└── ecommerce/            ← VELA Fashion
    ├── index.html
    ├── css/style.css
    └── js/main.js
```

---

## 🛠 Option A — Deploy Each Site Separately (Recommended)

Each site gets its **own Vercel project** with its own URL (e.g. `aurum-estates.vercel.app`).

### Steps

1. **Push the whole repo to GitHub** (or just the one site's folder)

2. **Go to** [vercel.com/new](https://vercel.com/new)

3. **Import your GitHub repo**

4. In the Vercel settings:
   - **Root Directory** → set to the site folder (e.g. `real-estate`)
   - **Framework Preset** → `Other`
   - **Build Command** → *(leave blank)*
   - **Output Directory** → `.` (a single dot)

5. Copy `vercel.json` into that site's folder (already included)

6. Click **Deploy** ✅

Repeat for each of the 8 sites — each becomes its own Vercel project.

---

## 🛠 Option B — Deploy All Sites from One Repo (Monorepo)

All 8 sites live under one Vercel project at paths like `/real-estate`, `/food`, etc.

### Steps

1. **Rename** `vercel-monorepo.json` → `vercel.json` and place it at the **root** of the repo

2. Push to GitHub

3. On Vercel:
   - **Root Directory** → `.` (root)
   - **Framework Preset** → `Other`
   - **Build Command** → *(leave blank)*
   - **Output Directory** → `.`

4. Deploy ✅

Your sites will be live at:
- `your-project.vercel.app/real-estate`
- `your-project.vercel.app/food`
- `your-project.vercel.app/ecommerce`
- etc.

---

## 🌐 Custom Domains

After deploying on Vercel:

1. Go to your project → **Settings → Domains**
2. Add your custom domain (e.g. `aurumestates.com`)
3. Update your domain's DNS:
   - Add a `CNAME` record pointing to `cname.vercel-dns.com`
   - Or use Vercel's nameservers for full control
4. Vercel auto-provisions free SSL ✅

---

## ⚡ Quick Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy a single site
cd real-estate
vercel --prod

# Or link and deploy from root (monorepo)
vercel --prod
```

---

## 📋 Environment Variables

These are static sites — no environment variables needed.  
If you add a contact form backend later, add variables in:  
**Vercel Dashboard → Project → Settings → Environment Variables**

---

## ✅ Pre-Deploy Checklist

- [ ] All `index.html` files present in each site folder
- [ ] `css/style.css` and `js/main.js` in each folder
- [ ] `vercel.json` copied into each site folder (Option A) or root (Option B)
- [ ] `.gitignore` at repo root
- [ ] No `.env` files committed
- [ ] Test locally by opening `index.html` in browser

---

## 🐛 Common Issues

| Problem | Fix |
|---------|-----|
| CSS/JS not loading after deploy | Check file paths are relative (`css/style.css` not `/css/style.css`) |
| 404 on page load | Make sure Root Directory is set correctly in Vercel |
| Fonts not loading | They're loaded from Google CDN — should work automatically |
| Images not loading | Using Unsplash CDN URLs — check internet connection |
