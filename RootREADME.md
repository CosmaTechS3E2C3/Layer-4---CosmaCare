# Layer4---CosmaCare

CosmaCare is the Layer‑4 cosmetology and personal‑care app in the CosmaTech ecosystem.  
It feels like **TheCut + a benefits engine + CosmaTech under the hood**.

---

## 1️⃣ Role in the CosmaTech Ecosystem

CosmaCare:

- Sits on top of **Layer‑3** (PWA, Mobile, API Gateway, Realtime, Supabase, App SDK).
- Uses **Layer‑2 protocols** (CosmaID, CosmaCoin, SpotCoin, ESEC, S3E2C3, CosmaTax, Governance, Oracle, Ledger, Bridge).
- Anchors to **Layer‑1 / Layer‑0** for settlement, integrity, and DA.

It is:

- A **booking + service engine** for cosmetology/personal‑care workers.
- An **economic engine** for payouts, fees, benefits, rewards.
- An **identity + authenticity engine** for worker verification.
- A **tax + compliance engine** for auto‑withholding and reporting.

---

## 2️⃣ Architecture Overview

CosmaCare is composed of:

- `web/` — PWA booking app (TheCut‑style UI).
- `mobile/` — Expo mobile app built on Layer3g Mobile Core.
- `contracts/` — CosmaCare domain contracts on Layer‑1a + Layer‑2.
- `diagrams/` — architecture, booking flow, settlement flow, S3E2C3 mapping, contract map.

The app uses:

- **Layer‑3f API Gateway** for REST + GraphQL.
- **Layer‑3d Realtime Events** for booking/settlement streams.
- **Layer‑3 Supabase Core** for mirrored data (bookings, profiles, payouts, disputes).
- **Layer‑3c App SDK** for unified blockchain access.

---

## 3️⃣ Contracts and Layer‑2/Layer‑1 Integration

Contracts:

- `CosmaCareRegistry` — identity + participant registry (CosmaID, S3E2C3, ESEC).
- `CosmaCareServiceCatalog` — service definitions mapped to S3E2C3 service schema.
- `CosmaCareBooking` — booking lifecycle (Pending → Confirmed → Completed → Settled → Closed).
- `CosmaCareSettlement` — payout logic (provider payout, platform fee, partner share, burn/treasury split).
- `CosmaCareDispute` — dispute window, arbitration, settlement override.
- `CosmaCareRewards` — credits/benefits minted in CosmaCoin/SpotCoin.

These contracts:

- Use **CosmaCoin / SpotCoin** for payouts and rewards.
- Use **CosmaTax** for auto‑withholding and reporting.
- Use **ESEC** for economic scoring (better scores → better rewards).
- Use **S3E2C3** for behavioral tiers (bad behavior → restricted bookings).
- Use **CosmaGovernance** for protocol upgrades.
- Use **CosmaOracle** for dynamic pricing per market.
- Anchor settlement and commitments into **Layer‑0 CosmaBed**.

---

## 4️⃣ Web App (PWA) Flows

Key pages:

- `LandingPage` — marketing + onboarding.
- `ClientBookingPage` — client selects provider, service, time; calls `CosmaCareBooking.createBooking`.
- `ProviderDashboardPage` — provider sees schedule, bookings, payouts, disputes.
- `BookingHistoryPage` — client/provider booking history.
- `SettlementPage` — settlement breakdown (provider payout, platform fee, partner share, burn/treasury).
- `DisputeCenterPage` — open/resolve disputes.

Hooks:

- `useCosmaSDK` — wraps Layer3c App SDK.
- `useAPI` — calls Layer3f API Gateway (`/cosmacare/booking`, `/cosmacare/settlement`, `/cosmacare/rewards`).
- `useRealtime` — subscribes to Layer3d events (`BookingCreated`, `BookingConfirmed`, `BookingCompleted`, `BookingSettled`, `CreditMinted`, `DisputeRaised`, `DisputeResolved`).
- `useSupabase` — mirrors bookings, profiles, settlements, disputes.

---

## 5️⃣ Mobile App Flows

Screens:

- `HomeScreen` — overview of bookings and payouts.
- `BookingScreen` — client booking flow.
- `ProviderDashboardScreen` — provider schedule + bookings.
- `PayoutsScreen` — payout history + rewards.
- `DisputeScreen` — disputes management.

Uses:

- Layer3g Mobile Core.
- App SDK.
- API Gateway.
- Realtime Events.
- Supabase.

Adds:

- Push notifications (booking confirmed, payout completed, dispute opened/resolved).

---

## 6️⃣ Booking + Settlement Lifecycle

1. **Booking Creation**  
   Client selects service + provider + time → `CosmaCareBooking.createBooking`.

2. **Confirmation**  
   Provider confirms → status `CONFIRMED` → event `BookingConfirmed`.

3. **Completion**  
   Service delivered → `completeBooking` → event `BookingCompleted`.

4. **Settlement Trigger**  
   `CosmaCareSettlement.settleBooking` called by backend or cron.

5. **Settlement Execution**  
   - Provider payout (SpotCoin / CosmaCoin).  
   - Platform fee.  
   - Partner share.  
   - Burn / Treasury split (e.g., 70% burn / 30% treasury).

6. **Rewards Minting**  
   `CosmaCareRewards.mintCredit` → benefits credits.

7. **Final State**  
   Booking marked `Settled` → `Closed`.

Disputes:

- If dispute raised within window → `CosmaCareDispute` handles arbitration.
- Settlement may be overridden based on dispute outcome.

---

## 7️⃣ How CosmaCare Uses Layers 0–3

- **Layer‑0 CosmaBed**  
  Anchors settlement, DA, integrity, S3E2C3/ESEC metadata.

- **Layer‑1 CosmaChain Core**  
  Executes bookings, settlements, rewards, disputes.

- **Layer‑1a Smart Contracts**  
  Hosts CosmaCare domain contracts.

- **Layer‑2 Protocols**  
  Identity, scoring, tax, oracle, governance, bridge, ledger, coins.

- **Layer‑3 Infrastructure**  
  API Gateway, Realtime Events, Supabase, App SDK, PWA Core, Mobile Core, Web3 Gateway.

CosmaCare is a **first‑class Layer‑4 app** fully powered by Layers 0–3.

---

