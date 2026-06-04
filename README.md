# 🚨 GoldenHourID
### *Because seconds matter.*

> A QR-based emergency medical information system that gives doctors instant access to critical patient data — no app, no login, just a scan.

![Demo Badge](https://img.shields.io/badge/Status-Live%20Demo-red) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen) ![Deployed](https://img.shields.io/badge/Deployed-Render-blue)

---

## 🏥 The Problem

In a highway accident, an unconscious patient is rushed to the ER. The doctor is flying blind:
- What is the patient's blood type?
- Are they allergic to penicillin?
- Do they have an underlying condition like diabetes or epilepsy?

The family is hours away. The phone is locked. Every second counts.

**GoldenHourID fills this gap.**

---

## ⚡ How It Works

```
[ QR Code on Helmet / Wallet / Phone Wallpaper ]
                    ↓
         [ Doctor Scans with Phone Camera ]
                    ↓
     [ Instant Emergency Info Page Loads ]
      Blood Group · Allergies · Conditions
           Emergency Contacts · Age
```

No usernames. No passwords. No hospital logins. Just the raw, vital facts needed to keep someone alive.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Encryption | AES-256 (Node.js crypto module) |
| QR Generation | `qrcode` npm package |
| Frontend | Vanilla HTML + CSS |
| Deployment | Render (Free Tier) |

---

## 🔐 Security & Privacy

- All medical data encrypted with **AES-256** before storage
- QR code contains only a **lookup ID** — no raw data exposed
- Built with awareness of **India's DPDP Act 2023** (Digital Personal Data Protection)
- **Demo mode only** — no real user data collected

---

## 🎯 Features

- ✅ QR code generation for each patient profile
- ✅ Downloadable QR codes (print on helmet, wallet card, phone wallpaper)
- ✅ Mobile-optimized emergency view page — loads instantly on poor networks
- ✅ AES-256 encryption at rest
- ✅ Zero-friction design — works with any smartphone camera

---

## ⚠️ Disclaimer

> **Educational Prototype** — This project is a proof-of-concept demonstrating QR-based emergency medical information access. It uses sample data only and is not intended for real medical use.

---

## 🚀 Live Demo

🔗 **[goldenhour-id.onrender.com](https://goldenhour-id.onrender.com)**

> Note: Hosted on Render free tier — may take 30–60 seconds to wake up on first visit.

---

## 👩‍💻 Author

**Kavya Sree Kalla**
Bachelor of Technology — Seshadri Rao Gudlavalleru Engineering College
[GitHub](https://github.com/kavyasreekalla) · [LinkedIn](https://linkedin.com/in/kavyasreekalla)
