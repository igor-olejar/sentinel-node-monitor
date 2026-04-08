# 🛡️ Sentinel | Node.js Web Monitor

A lightweight uptime monitoring service that tracks website health and sends automated HTML email digests.

## Features
- **Real-time Monitoring:** Tracks status codes and latency using `axios`.
- **Scheduled Reports:** Daily email digests sent via `Nodemailer` & `node-cron`.
- **Clean Architecture:** Uses `Handlebars` for separated HTML email templates.
- **Fail-Safe:** Immediate email alerts if a critical service goes down.

## Tech Stack
- **Runtime:** Node.js
- **Scheduling:** node-cron
- **Templates:** Handlebars
- **Communication:** SMTP / Nodemailer

## ⚙️ Setup
1. Clone the repo: `git clone ...`
2. Run `npm install`
3. Create a `.env` file with your `EMAIL_USER` and `EMAIL_PASS`.
4. Run `node main.js`