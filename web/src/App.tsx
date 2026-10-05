import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingListPage } from "./Routes/BookingListPage";
import { GovernancePage } from "./Routes/GovernancePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookingListPage />} />
        <Route path="/governance" element={<GovernancePage />} />
      </Routes>
    </BrowserRouter>
  );
}
