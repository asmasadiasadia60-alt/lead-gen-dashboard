# LeadGen Dashboard 🚀

Ek modern aur clean **Dark-Themed Lead Generation Dashboard** jo lead data ko table format mein show karta hai, live search aur status filtering ke saath.

---

## ✨ Features

- 🌓 **Modern Dark Theme:** Sleek slate/zinc color palette with high-contrast text and glowing accents.
- 📋 **Leads Data Table:** 
  - Lead Name (with initials avatar)
  - Email Address (clickable `mailto:`)
  - Status Badge with color coding (`New`, `Contacted`, `Qualified`, `Proposal`, `Lost`)
  - Action buttons (Delete lead)
- 🔍 **Live Search:** Name ya Email type karte hi real-time instant search.
- 🏷️ **Status Filter:** Dropdown ya summary cards par click karke specific status filter karein (`All`, `New`, `Contacted`, `Qualified`, `Proposal`, `Lost`).
- 📊 **Quick Metrics Bar:** Total leads aur status-wise lead count ka live overview.
- ➕ **Add New Lead Modal:** Form ke zariye naya lead add karne ki suvidha.
- 💾 **Local Storage Persistence:** Aapka data browser mein safe rehta hai (with "Reset Samples" button).
- 📱 **Fully Responsive:** Mobile, tablet, aur desktop screen par perfectly adapt hota hai.

---

## 5 Sample Leads Included

| # | Name | Email | Status |
|---|------|-------|--------|
| 1 | Sarah Jenkins | `sarah.jenkins@acmecorp.com` | **Qualified** |
| 2 | Alex Rivera | `alex.rivera@techflow.io` | **Contacted** |
| 3 | Priya Sharma | `priya.sharma@innovate.co` | **New** |
| 4 | Michael Chen | `m.chen@nexusmedia.com` | **Proposal** |
| 5 | Fatima Zahra | `fatima.z@cloudscale.net` | **Lost** |

---

## 🚀 Setup & Run Steps (Chalaane ka Tareeqa)

Aap is app ko **2 aasan tareeqon** se chala sakte hain:

### Option 1: Direct Browser Open (Zero Install - Sabse Asan)
1. Is folder (`lead-gen-dashboard`) mein jaayein.
2. `index.html` file par double-click karein.
3. App aapke default web browser (Chrome, Edge, Firefox) mein direct chal jaegi!

---

### Option 2: Local Node.js Server se Chalaana
Agar aap local development server run karna chahte hain:

1. Terminal / Command Prompt open karein aur is folder mein jaayein:
   ```bash
   cd "c:\Users\Mufti Saood\Documents\lead-gen-dashboard"
   ```

2. Server start karein:
   ```bash
   npm start
   ```
   *(ya direct `node server.js` run karein)*

3. Browser mein open karein:
   ```
   http://localhost:3000
   ```

---

## 📂 Project Structure

```text
lead-gen-dashboard/
├── index.html        # Main dashboard UI structure
├── style.css         # Dark theme styles & responsive design
├── app.js            # Leads logic, live search, status filter, local storage
├── server.js         # Lightweight zero-dependency Node HTTP server
├── package.json      # NPM script configuration (npm start)
└── README.md         # Documentation & setup guide
```
