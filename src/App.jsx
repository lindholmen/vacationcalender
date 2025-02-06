import './App.css';
import React, { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

function App() {
  const [vacations, setVacations] = useState([]);

  const mergeVacations = (newVacation) => {
    const merged = [];
    let added = false;

    vacations.forEach((vacation) => {
      if (
        vacation.title === newVacation.title &&
        (new Date(vacation.start) <= new Date(newVacation.end) &&
          new Date(newVacation.start) <= new Date(vacation.end))
      ) {
        // Merge overlapping or adjacent ranges
        newVacation = {
          title: newVacation.title,
          start: new Date(
            Math.min(new Date(vacation.start), new Date(newVacation.start))
          )
            .toISOString()
            .split("T")[0],
          end: new Date(
            Math.max(new Date(vacation.end), new Date(newVacation.end))
          )
            .toISOString()
            .split("T")[0],
          color: newVacation.color,
        };
        added = true;
      } else {
        merged.push(vacation);
      }
    });

    if (!added) {
      merged.push(newVacation);
    } else {
      merged.push(newVacation);
    }

    return merged;
  };

  const addVacation = (newVacation) => {
    const updatedVacations = mergeVacations(newVacation);
    setVacations(updatedVacations);
  };

  return (
    <div className="flex h-screen">
      <LeftPanel addVacation={addVacation} />
      <RightPanel vacations={vacations} />
    </div>
  );
}

export default App;
