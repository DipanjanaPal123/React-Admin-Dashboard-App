import React, { useState } from "react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function generateCalendar(year, month) {
  const date = new Date(year, month, 1);
  const days = [];

  const startDay = date.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // blank days
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // actual days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return days;
}

export default function Calendar() {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const days = generateCalendar(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={prevMonth} className="nav-btn" aria-label="Previous Month">&lt;</button>
        <h3>
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <button onClick={nextMonth} className="nav-btn" aria-label="Next Month">&gt;</button>
      </div>

      <div className="calendar-grid">
        {daysOfWeek.map((d) => (
          <div key={d} className="calendar-day header">
            {d}
          </div>
        ))}

        {days.map((day, idx) =>
          day ? (
            <div
              key={idx}
              className={`calendar-day ${
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear()
                  ? "today"
                  : ""
              }`}
            >
              {day}
            </div>
          ) : (
            <div key={idx} className="calendar-day empty"></div>
          )
        )}
      </div>
    </div>
  );
}
