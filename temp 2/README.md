# University Canteen Smart Queue (Prototype)

This is the prototype implementation of the **University Canteen Smart Queue & Token Management System** using the **MERN stack**.  
It is designed to handle ~100 concurrent users on free-tier services and can be scaled to production-ready architecture for 100k+ users.

## Tech Stack
- **Backend:** Node.js + Express + MongoDB Atlas (Free tier)
- **Frontend:** React (Vite or CRA), hosted on Vercel/Netlify
- **Realtime:** Socket.IO (rooms per vendor), Redis adapter (for scaling)
- **Auth/OTP:** OTP via Outlook SMTP (NodeMailer)
- **Queueing & Jobs:** BullMQ (Redis-based job queue, optional in prototype)
- **CI/CD:** GitHub Actions (free)
- **Monitoring:** Basic logging (winston), Sentry (free tier)

## Quick Start
1. Clone repo & install dependencies
2. Configure environment variables (`.env`):
   - `MONGO_URI` (MongoDB Atlas free cluster)
   - `OUTLOOK_USER` + `OUTLOOK_PASS` (Outlook SMTP credentials)
   - `JWT_SECRET` (for token signing)
3. Run backend: `npm run server`
4. Run frontend: `npm run client`

## Features (Prototype)
- Student: Signup/login with OTP, book/cancel tokens, realtime queue updates
- Vendor: Serve next, cancel tokens, see live queue
- Admin: Add vendors, view audit logs (basic prototype)

---
