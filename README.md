# Drishti Baadhit Karimik Sangh — Website + Documents Portal

Public website for DBKS Rajasthan, with a Google-login Documents Portal (admin upload / member view).

## Local development

1. Use a PostgreSQL database and set `DATABASE_URL` in `.env` (see `.env.example`).
2. Copy `.env.example` → `.env` and fill Google OAuth + `ADMIN_EMAILS` + `AUTH_SECRET`.
3. Install and migrate:

```bash
npm install
npx prisma migrate deploy
npm run dev
```

Open http://localhost:3000

## Documents Portal

- `/documents` — Google sign-in
- Admin emails (`ADMIN_EMAILS`) → `/admin` (upload/delete)
- Other users → `/library` (view/download)
- Max upload size: 10 MB (stored in the database for Heroku compatibility)

## GitHub + Heroku

### Private GitHub repo

```bash
gh repo create dbks --private --source=. --remote=origin --push
```

### Heroku

```bash
heroku create YOUR-APP-NAME
heroku addons:create heroku-postgresql:essential-0
heroku config:set AUTH_SECRET="..." AUTH_TRUST_HOST=true AUTH_URL=https://YOUR-APP-NAME.herokuapp.com
heroku config:set GOOGLE_CLIENT_ID="..." GOOGLE_CLIENT_SECRET="..."
heroku config:set ADMIN_EMAILS="185519@nith.ac.in"
git push heroku master
```

Add this Google OAuth redirect URI:

`https://YOUR-APP-NAME.herokuapp.com/api/auth/callback/google`

## Stack

- Next.js (App Router)
- PostgreSQL + Prisma
- Auth.js (Google)
- Heroku (`Procfile` runs migrations then `next start`)
