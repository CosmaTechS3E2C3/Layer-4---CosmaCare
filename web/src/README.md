# CosmaCare Web (Layer‑4)

CosmaCare is the healthcare + wellness module of the CosmaTech ecosystem.  
This web app provides:

- Booking history
- Client booking details
- Provider dashboards
- Dispute center
- Settlement + payout tracking
- Realtime event updates

## Tech Stack

- React (Vite)
- TypeScript
- React Router
- Supabase (Layer‑3)
- CosmaCare API Gateway (Layer‑4)
- WebSockets (realtime)
- CosmaTech SDK

## Structure

src/
components/
hooks/
Routes/
styles/
App.tsx
config.ts

## Environment

Create a `.env` file:
VITE_COSMACARE_API_BASE=https://api.cosmacare.tech
VITE_COSMACARE_WS_URL=wss://ws.cosmacare.tech
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key

npm install
npm run dev 
## Build

npm run build
npm run preview
