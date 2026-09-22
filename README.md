# Custom Online Shop

Full custom online store: React (Vite + Tailwind) storefront + admin panel,
Node.js/Express backend, PostgreSQL database, Stripe checkout. Everything runs
in Docker, so deployment needs nothing installed manually beyond Docker itself.

## What's included

- **Storefront**: catalog with search/filter/sort, product pages, cart, Stripe
  checkout.
- **Admin panel** (`/admin`): login, product CRUD, category CRUD, order list
  with status updates.
- **Backend API**: Express + Prisma + PostgreSQL, JWT-protected admin routes,
  Stripe Checkout Sessions + webhook to confirm payment and decrement stock.

No customer accounts/login — checkout is guest-only, as requested.

## Project layout

```
backend/     Express API + Prisma schema
frontend/    React storefront + admin panel (built as static files, served by nginx)
docker-compose.yml
.env.example
```

## 1. Local development (optional)

If you want to preview changes before deploying:

```bash
# backend
cd backend
cp .env.example .env      # edit DATABASE_URL etc. if needed
npm install
npx prisma migrate dev
npm run seed
npm run dev                # http://localhost:4000

# frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev                # http://localhost:5173
```

For Stripe locally, use the Stripe CLI (`stripe listen --forward-to
localhost:4000/api/webhook/stripe`) to get a webhook secret for `.env`.

## 2. Push the project to GitHub

From the `shop` folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin git@github.com:<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo on GitHub first, or use `gh repo create`.)

## 3. Deploy on an OVH VPS

You only need Docker on the server — no Node, no Postgres install.

### 3.1 Get a VPS and point your domain at it

- Order an OVH VPS (any size, 2 vCPU / 4GB RAM is plenty to start).
- In your domain's DNS, add an `A` record pointing to the VPS's public IP.

### 3.2 Install Docker on the VPS

SSH into the server, then:

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# log out and back in so the group change takes effect
```

### 3.3 Clone the repo and configure

```bash
git clone https://github.com/<your-username>/<your-repo>.git shop
cd shop
cp .env.example .env
nano .env   # fill in real values, see below
```

Required values in `.env`:

- `POSTGRES_PASSWORD` — any strong password.
- `JWT_SECRET` — long random string (e.g. `openssl rand -hex 32`).
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` — from your Stripe dashboard
  (see 3.5 below).
- `FRONTEND_URL` — `https://your-domain.com` (used for Stripe redirect URLs).
- `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — your admin login credentials.
- `CORS_ORIGIN` — set to `https://your-domain.com` once you have a domain
  (or leave `*` while testing).

### 3.4 Build and run

```bash
docker compose up -d --build
```

This starts Postgres, runs Prisma migrations, seeds the admin user + demo
categories/products, and serves the site on port 80. Visit
`http://<server-ip>/` to see the store, and `http://<server-ip>/admin/login`
for the admin panel.

To view logs: `docker compose logs -f`
To stop: `docker compose down`
To redeploy after a `git pull`: `docker compose up -d --build`

### 3.5 Set up Stripe

1. Create a Stripe account, grab the **secret key** from
   https://dashboard.stripe.com/apikeys → put it in `STRIPE_SECRET_KEY`.
2. Go to https://dashboard.stripe.com/webhooks → **Add endpoint** →
   URL: `https://your-domain.com/api/webhook/stripe` → select event
   `checkout.session.completed` (and `checkout.session.expired` if you want
   abandoned-checkout handling) → copy the **signing secret** into
   `STRIPE_WEBHOOK_SECRET`.
3. Restart: `docker compose up -d --build backend`.

### 3.6 Add HTTPS (recommended)

The simplest option is to put [Caddy](https://caddyserver.com/) or
[nginx + certbot](https://certbot.eff.org/) in front, or use a reverse proxy
service like OVH's own Load Balancer / Cloudflare. A minimal Caddy setup:

```bash
sudo apt install -y caddy
sudo tee /etc/caddy/Caddyfile <<'EOF'
your-domain.com {
    reverse_proxy localhost:80
}
EOF
sudo systemctl restart caddy
```

Caddy will automatically obtain and renew a Let's Encrypt certificate. Point
`HTTP_PORT=80` (default) so the app container stays on plain HTTP behind
Caddy, which listens on 443/80 itself — if there's a conflict, change
`HTTP_PORT` in `.env` to e.g. `8080` and set `reverse_proxy localhost:8080`
in the Caddyfile instead.

## 4. Managing the store

- Log in at `/admin/login` with the `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
  you set.
- Add categories first, then products (price is entered in EUR, stored as
  cents internally).
- Orders appear under **Orders** once a customer completes Stripe checkout;
  update their status as you ship them.

## 5. Updating the site later

```bash
cd shop
git pull
docker compose up -d --build
```

Database data persists in a Docker volume (`postgres_data`) across restarts
and rebuilds.
