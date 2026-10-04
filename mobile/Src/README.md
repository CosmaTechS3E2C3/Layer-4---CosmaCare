# CosmaCare Mobile (Layer‑4)

CosmaCare is the healthcare + wellness module of the CosmaTech ecosystem.  
This mobile app provides:

- Booking services
- Provider dashboards
- Dispute resolution
- Settlement + payout tracking
- Realtime event updates
- Rewards + credits

## Tech Stack

- React Native (Expo)
- TypeScript
- Supabase (Layer‑3)
- CosmaCare API Gateway (Layer‑4)
- WebSockets (realtime)
- CosmaTech SDK

## Structure
src/
components/
hooks/
screens/
styles/
App.tsx
config.ts


## Environment

Create a `.env` file:

COSMACARE_API_BASE=https://api.cosmacare.tech
COSMACARE_WS_URL=wss://ws.cosmacare.tech
SUPABASE_URL=your-url
SUPABASE_ANON_KEY=your-key


## Run
npm install
npm start



