import React, { useRef, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const RightPanel = ({ vacations }) => {
  const calendarRef = useRef(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const teamMembers = [
    { name: "Dawid", color: "black" },
    { name: "Yemao", color: "purple" },
    { name: "Petra", color: "blue" },
    { name: "Emmanuel", color: "green" },
    { name: "Yanqing", color: "orange" },
    { name: "Mowei", color: "pink" },
    { name: "Hugo", color: "#FFD700" }, // Gold for better readability
    { name: "Shreeya", color: "gray" },
  ];

  const swedishHolidays = new Set([
    "2025-01-01", "2025-01-06", "2025-04-18", "2025-04-20",
    "2025-04-21", "2025-05-01", "2025-05-29", "2025-06-06",
    "2025-06-21", "2025-11-01", "2025-12-25", "2025-12-26",
  ]);

  const countWorkdays = (startDate, endDate) => {
    let count = 0;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
      const formattedDate = currentDate.toISOString().split("T")[0];

      if (dayOfWeek !== 0 && dayOfWeek !== 6 && !swedishHolidays.has(formattedDate)) {
        count++; // Count only valid workdays
      }
      currentDate.setDate(currentDate.getDate() + 1); // Move to next day
    }
    return count;
  };

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

  return (
    <div className="w-3/4 h-full bg-gray-50 p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Team Vacation Calendar
      </h2>

      {/* Scrollable summary bar */}
      {/* <div className="overflow-x-auto whitespace-nowrap bg-white p-2 shadow-md rounded mb-4 border border-gray-300">
        <div className="flex space-x-4">
          {calculateMonthlyVacationDays().map((member) => (
            <div
              key={member.name}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg shadow-sm"
              style={{ backgroundColor: member.color, color: "white" }}
            >
              <span className="font-bold">{member.name}:</span>
              <span>{member.days} workdays</span>
            </div>
          ))}
        </div>
      </div> */}

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
