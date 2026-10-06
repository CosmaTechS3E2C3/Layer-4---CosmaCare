⭐ Layer‑4 CosmaCare README (10‑Point Format)
(Place in CosmaCare/README.md)

1. Purpose of Layer‑4 — CosmaCare
CosmaCare is the Layer‑4 application layer of the CosmaTech ecosystem.
It provides the full booking, dispute, settlement, rewards, and governance workflows for service‑based interactions between clients and providers.

Layer‑4 apps consume:

Layer‑0 (CosmaBed anchoring + DA)

Layer‑1 (CosmaChain smart contracts)

Layer‑2 (Identity, Scoring, Ledger, Governance, Oracle)

Layer‑3 (Supabase, API Gateway, Realtime, Workers)

And expose functionality to:

Layer‑5 (CosmaApp super‑app)

Layer‑6 (AI modules)

Layer‑7 (Enterprise analytics + routing)

2. Core Features
CosmaCare provides:

Booking lifecycle (create → confirm → complete → settle)

Dispute lifecycle (open → resolve)

Settlement engine (multi‑split payouts)

Rewards engine (SpotCoin + CosmaCoin minting)

Governance (proposals, votes, policies)

Provider registry + service catalog

DID‑based identity + scoring integration

Realtime updates across all clients

3. Layer‑4 Folder Structure
Code
CosmaCare/
  contracts/
  interfaces/
  supabase/
  api/
  sdk/
  backend/
  workers/
  mobile/
  web/
Each folder is universal across all Layer‑4 apps.

4. Smart Contracts (Layer‑1 Logic)
CosmaCare uses 12 universal contracts:

Booking

Dispute

Settlement

Rewards

Governance

PolicyRegistry

Registry

RoleManager

ServiceCatalog

Events (universal)

Errors (universal)

Modifiers (universal)

These contracts emit events consumed by Layer‑3 workers.

5. Supabase (Layer‑3 Database + Realtime)
CosmaCare uses:

Universal tables

Universal triggers

Universal functions

Universal migrations

Universal realtime channels

Supabase is the single source of truth for:

bookings

disputes

settlements

rewards

profiles

governance

6. Workers (Layer‑3 → Layer‑4 Sync Engine)
Workers sync:

Layer‑1 contract events → Supabase

Supabase triggers → Realtime

Realtime → Mobile/Web apps

Workers include:

sync_chain_events.ts

sync_settlements.ts

sync_disputes.ts

sync_rewards.ts

emit_realtime_events.ts

7. API (Layer‑4 Gateway)
REST + GraphQL endpoints:

/bookings

/profiles

/services

/settlements

/disputes

/rewards

/governance

Backend routes are universal across all Layer‑4 apps.

8. SDK (Layer‑4 Client Library)
Universal SDK for:

Mobile

Web

Layer‑5 super‑app

Layer‑6 AI modules

Provides unified access to all API endpoints.

9. Mobile + Web Apps
Universal UI layers:

Mobile (React Native)

Web (React + Vite)

Both consume:

Layer‑4 API

Layer‑3 realtime

Layer‑2 DID + scoring

Layer‑1 contract events (via workers)

10. Integration with Layers 5–7
Layer‑5 (CosmaApp Super‑App)
CosmaCare becomes a module inside the unified CosmaApp shell.

Layer‑6 (AI Modules)
AI modules consume CosmaCare data:

fraud detection

anomaly detection

scoring

authenticity verification

Layer‑7 (Enterprise)
Enterprise clients consume:

booking analytics

payout analytics

dispute analytics

compliance + tax reports

⭐ Dev‑Prod README
(Place in CosmaCare/DEV-PROD.md)

Development Mode
Local Supabase instance

Local API server

Local workers (PM2)

Local mobile + web apps

Hardhat local blockchain

Dev Commands
npm run dev (web)

expo start (mobile)

pm2 start ecosystem.config.js (workers)

npx hardhat node (contracts)

Production Mode
Supabase cloud

API deployed to serverless or container

Workers deployed via PM2 or Docker

Mobile built via Expo EAS

Web deployed via Vercel/Netlify

Contracts deployed to CosmaChain mainnet

Production Requirements
ENV variables

API keys

Supabase service role

RPC URLs

Contract addresses

Governance keys

⭐ CosmaCare Booking Lifecycle (Layer‑1–3)
(Place in CosmaCare/docs/BOOKING-LIFECYCLE.md)

1. Create Booking (Layer‑1)
Contract: CosmaCareBooking.sol  
Event: BookingLifecycleEvent(status="created")

2. Supabase Insert (Layer‑3)
Trigger: on_booking_created.sql  
Realtime event emitted.

3. Confirm Booking
Contract event → worker → Supabase → realtime → apps.

4. Complete Booking
Contract event → worker → Supabase → realtime → apps.

5. Settlement
Contract: CosmaCareSettlement.sol  
Event: SettlementExecuted

Worker writes settlement to Supabase.

6. Rewards
Contract: CosmaCareRewards.sol  
Event: RewardMinted

Worker writes reward to Supabase.
