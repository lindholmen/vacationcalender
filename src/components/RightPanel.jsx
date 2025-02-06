import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const RightPanel = ({ vacations, deleteVacation }) => {
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleDateChange = (arg) => {
    const newDate = arg.start;
    setCurrentMonth(new Date(newDate).getMonth());
    setCurrentYear(new Date(newDate).getFullYear());
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      if (calendarApi) {
        calendarApi.updateSize();
      }
    }
  }, [currentMonth, currentYear]);

  // Adjust displayed end date for text above the calendar
  const adjustDisplayEndDate = (endDate) => {
    const adjustedDate = new Date(endDate);
    adjustedDate.setDate(adjustedDate.getDate() - 1); // Subtract one day for display
    return adjustedDate.toISOString().split("T")[0];
  };

  return (
    <div className="w-3/4 h-full bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Team Vacation Calendar
      </h2>

      {/* Vacation List with Delete Buttons */}
      <div className="mb-4">
        {vacations.map((vacation) => (
          <div
            key={vacation.id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>
              {vacation.title} ({vacation.start} - {adjustDisplayEndDate(vacation.end)})
            </span>
            <button
              onClick={() => deleteVacation(vacation.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div className="border border-gray-300 bg-white rounded h-full shadow p-4">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          weekends={false}
          events={vacations}
          height="100%"
          datesSet={handleDateChange}
        />
      </div>
    </div>
  );
};

export default RightPanel;
