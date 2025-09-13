# Roadmap: Smart Queue System (MERN)

## Phase 1 — Student backend
- Express API: signup/login (OTP), token create/cancel/status
- MongoDB collections: users, tokens, vendors, logs

## Phase 2 — OTP via Outlook & realtime
- NodeMailer + Outlook SMTP for OTP
- Socket.IO for live queue updates (vendor-based rooms)

## Phase 3 — Student frontend
- React app with OTP login, token booking, live queue view
- Deploy to Vercel/Netlify

## Phase 4 — Vendor backend
- Vendor auth & APIs for queue management
- Emit realtime updates to student clients

## Phase 5 — Vendor frontend
- Vendor dashboard: serve next, cancel, daily counts

## Phase 6 — Admin backend
- CRUD for vendors, audit logs, daily reports

## Phase 7 — Admin frontend
- Admin portal: manage users/vendors, view logs

## Phase 8 — Hardening (small production)
- Cloudflare for CDN/protection
- Mongo indexes + rate limiting
- Logging (winston), Sentry free

## Phase 9 — Load testing & optimization
- k6/Locust load tests
- Add caching & background jobs

## Phase 10 — Production scale plan (100k+ users)
- Migrate DB to larger cluster / self-hosted Mongo
- Redis for pub/sub scaling (Socket.IO adapter)
- Replace Outlook free SMTP with university SMTP or paid transactional provider
- Observability (Prometheus/Grafana)
