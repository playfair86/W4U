# W4U — Work For You

A peer-to-peer platform for South Africa's informal economy combining digital identity verification, a job marketplace, reputation scoring, and instant mobile payments.

> *"Every person has value to offer. We exist to build trust and ensure people are recognised and rewarded for what they contribute."*

See [`W4U_Product_Spec.pdf`](./W4U_Product_Spec.pdf), [`W4U_Business_Plan.pdf`](./W4U_Business_Plan.pdf), and [`W4U_White_Paper.pdf`](./W4U_White_Paper.pdf) for full context.

## Architecture

- **Mobile**: React Native + TypeScript (targets low-end Android)
- **API**: Node.js + Express + TypeScript (microservice-ready structure)
- **Database**: PostgreSQL 16 via Knex
- **Validation**: Zod
- **Auth**: JWT (15-min access) + refresh token rotation (30-day)
- **Infrastructure**: Docker Compose for local dev, AWS target

### Monorepo layout

```
W4U/
├── packages/
│   ├── shared/        # Shared types, enums, constants
│   ├── api/           # Express backend with service modules
│   │   └── src/services/{auth,marketplace,payment}/
│   └── mobile/        # React Native app
├── docker-compose.yml
└── package.json       # npm workspaces root
```

Each `src/services/<name>/` directory contains `routes.ts`, `controller.ts`, `service.ts`, and `validation.ts` — ready for extraction into independent microservices later.

## Trust Tiers

Per the product spec, W4U implements a 5-tier progressive trust system:

| Tier | Requirements | API Enforcement |
|---|---|---|
| `UNVERIFIED` | Mobile verified only | Can browse, cannot transact |
| `ID_VERIFIED` | SA ID + selfie match | Can post jobs, receive payments |
| `SKILLS_VERIFIED` | Qualifications verified | Priority in skill searches |
| `COMMUNITY_VOUCHED` | 5+ unique vouches | Featured in neighbourhood feeds |
| `FULLY_VETTED` | Background check complete | Top of search, premium badge |

## Quick Start

### Prerequisites
- Node.js ≥ 20
- npm ≥ 9
- Docker & Docker Compose

### Setup

```bash
# 1. Copy env file
cp .env.example .env

# 2. Start PostgreSQL
docker-compose up -d postgres

# 3. Install workspace dependencies
npm install

# 4. Run migrations
npm run db:migrate

# 5. Seed dev data
npm run db:seed

# 6. Start the API
npm run dev:api
```

The API listens on `http://localhost:3000`. Check health with:

```bash
curl http://localhost:3000/health
```

## API Endpoints (MVP)

All endpoints live under `/api/v1`. JSON request/response.

### 1. `POST /api/v1/auth/register`

Sends an OTP to the phone number. In dev mode, the OTP is returned in the response and logged to console.

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H 'Content-Type: application/json' \
  -d '{
    "phone_number": "+27821234567",
    "user_type": "PROVIDER",
    "display_name": "Sipho"
  }'
```

Response:
```json
{
  "success": true,
  "data": {
    "message": "OTP sent",
    "phone_number": "+27821234567",
    "dev_otp_code": "123456"
  }
}
```

Then verify the OTP to get JWT tokens:

```bash
curl -X POST http://localhost:3000/api/v1/auth/verify-otp \
  -H 'Content-Type: application/json' \
  -d '{
    "phone_number": "+27821234567",
    "otp_code": "123456",
    "user_type": "PROVIDER",
    "display_name": "Sipho"
  }'
```

### 2. `POST /api/v1/jobs`

Create a job posting. Requires `ID_VERIFIED` trust tier or higher.

```bash
curl -X POST http://localhost:3000/api/v1/jobs \
  -H 'Authorization: Bearer <ACCESS_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Paint 2 bedrooms",
    "description": "Need two bedrooms painted with white paint, walls and ceilings.",
    "category": "Home & Property",
    "subcategory": "Painting",
    "location": { "lat": -26.1076, "lng": 28.0567 },
    "budget_min": 1500,
    "budget_max": 2500,
    "timeframe": "This weekend"
  }'
```

### 3. `GET /api/v1/wallet/me`

Returns the authenticated user's wallet balance and 10 most recent transactions.

```bash
curl http://localhost:3000/api/v1/wallet/me \
  -H 'Authorization: Bearer <ACCESS_TOKEN>'
```

## Data Models

Core entities (see `packages/api/src/db/migrations/` for full schemas):

- **User** — id, phone_number, user_type, trust_tier, trust_score, wallet_id, qr_code_url
- **Wallet** — id, user_id, balance (Decimal 12,2), status
- **Transaction** — from/to wallet, type, amount, fee, net_amount, status
- **Verification** — user_id, type (ID/Selfie/Qualification), status, confidence_score
- **Review** — reviewer/provider, overall_rating + dimensional ratings, comment
- **Job** — consumer_id, title, description, category, location, budget range, status

## Mobile App

```bash
npm run dev:mobile
```

Navigation skeleton: Auth stack (Splash → Register → OTP → UserType) + Main tabs (Home, Search, QR Scan, Messages, Profile).

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev:api` | Start API with hot reload |
| `npm run dev:mobile` | Start React Native Metro bundler |
| `npm run db:migrate` | Run pending migrations |
| `npm run db:migrate:rollback` | Roll back last migration batch |
| `npm run db:seed` | Populate dev seed data |
| `npm run lint` | Lint all TypeScript |
| `npm run format` | Format all TypeScript |

## Status

**MVP scaffolding** — Core data models, auth flow, and 3 endpoints (register, job posting, wallet balance) implemented. See the product spec release plan for the full MVP → V4 feature roadmap.
