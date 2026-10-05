import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import BookingHistoryPage from "./Routes/BookingHistoryPage";
import ClientBookingPage from "./Routes/ClientBookingPage";
import DisputeCenterPage from "./Routes/DisputeCenterPage";
import ProviderDashboardPage from "./Routes/ProviderDashboardPage";
import SettlementPage from "./Routes/SettlementPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="navbar">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/bookings">Bookings</NavLink>
        <NavLink to="/disputes">Disputes</NavLink>
        <NavLink to="/provider">Provider</NavLink>
        <NavLink to="/settlements">Settlements</NavLink>
      </div>

      <Routes>
        <Route path="/" element={<BookingHistoryPage />} />
        <Route path="/bookings" element={<BookingHistoryPage />} />
        <Route path="/booking/:id" element={<ClientBookingPage />} />
        <Route path="/disputes" element={<DisputeCenterPage />} />
        <Route path="/provider" element={<ProviderDashboardPage />} />
        <Route path="/settlements" element={<SettlementPage />} />
      </Routes>
    </BrowserRouter>
  );
}
