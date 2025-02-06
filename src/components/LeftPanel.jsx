import React, { useState } from "react";

const LeftPanel = ({ addVacation }) => {
  const teamMembers = [
    { name: "Dawid", color: "black" },
    { name: "Emmanuel", color: "green" },
    { name: "Hugo", color: "#FFD700" },
    { name: "Mowei", color: "pink" },
    { name: "Petra", color: "blue" },
    { name: "Shreeya", color: "gray" },
    { name: "Yanqing", color: "orange" },
    { name: "Yemao", color: "purple" },
  ].sort((a, b) => a.name.localeCompare(b.name));

  const [vacation, setVacation] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const [error, setError] = useState(""); // State to hold error messages

  const handleChange = (e) => {
    setVacation({ ...vacation, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate date range
    if (new Date(vacation.startDate) > new Date(vacation.endDate)) {
      setError("End date cannot be earlier than start date.");
      return;
    }

    // Validate that a team member is selected
    if (!vacation.name) {
      setError("Please select a team member.");
      return;
    }

    const member = teamMembers.find((m) => m.name === vacation.name);
    if (member) {
      // Add one day to the end date to make it inclusive
      const adjustedEndDate = new Date(vacation.endDate);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

      addVacation({
        title: vacation.name,
        start: vacation.startDate,
        end: adjustedEndDate.toISOString().split("T")[0], // Format as yyyy-mm-dd
        color: member.color, // Pass the member's color
      });

      // Clear the form and error
      setVacation({ name: "", startDate: "", endDate: "" });
      setError("");
    }
  };

  return (
    <div className="w-1/4 h-full bg-gray-100 p-4 border-r border-gray-300 flex flex-col">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Team Members</h2>
      <ul className="space-y-3">
        {teamMembers.map((member) => (
          <li key={member.name} className="flex items-center">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: member.color }}
            ></span>
            <span className="ml-3 text-gray-700">{member.name}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Schedule Vacation
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Name</label>
            <select
              name="name"
              value={vacation.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select a Team Member</option>
              {teamMembers.map((member) => (
                <option key={member.name} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={vacation.startDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">End Date</label>
            <input
              type="date"
              name="endDate"
              value={vacation.endDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeftPanel;
