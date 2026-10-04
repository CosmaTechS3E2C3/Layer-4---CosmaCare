import React from "react";

export default function ScheduleCalendar({ schedule }: { schedule: any[] }) {
  return (
    <div className="card">
      <div className="card-title">Provider Schedule</div>

      {schedule.length === 0 && (
        <div className="card-text">No scheduled appointments.</div>
      )}

      {schedule.map((slot, idx) => (
        <div key={idx} className="card-text">
          {new Date(slot.time).toLocaleString()} — {slot.status}
        </div>
      ))}
    </div>
  );
}

