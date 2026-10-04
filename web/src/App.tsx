import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./routes/LandingPage";
import { ProviderDashboardPage } from "./routes/ProviderDashboardPage";
import { ClientBookingPage } from "./routes/ClientBookingPage";
import { BookingHistoryPage } from "./routes/BookingHistoryPage";
import { SettlementPage } from "./routes/SettlementPage";
import { DisputeCenterPage } from "./routes/DisputeCenterPage";
import "./styles/app.css";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/provider" element={<ProviderDashboardPage />} />
        <Route path="/book" element={<ClientBookingPage />} />
        <Route path="/history" element={<BookingHistoryPage />} />
        <Route path="/settlement" element={<SettlementPage />} />
        <Route path="/disputes" element={<DisputeCenterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

