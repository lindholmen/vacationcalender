//import './App.css';
import React, { useState, useEffect } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { fetchVacations, addVacation as saveToFirestore, deleteVacation as deleteFromFirestore } from "./firebase";

function App() {
  const [vacations, setVacations] = useState([]);

  // Fetch vacations from Firestore on component mount
  useEffect(() => {
    const getVacations = async () => {
      try {
        const data = await fetchVacations();
        setVacations(data);
      } catch (error) {
        console.error("Error fetching vacations:", error);
      }
    };
    getVacations();
  }, []);

  // Merge overlapping or adjacent vacations
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

    merged.push(newVacation);

    return merged;
  };

  // Add vacation, update Firestore and UI
  const addVacation = async (newVacation) => {
    const updatedVacations = mergeVacations(newVacation);
    setVacations(updatedVacations); // Update UI immediately

    try {
      // Save merged vacations to Firestore
      await saveToFirestore(newVacation);
    } catch (error) {
      console.error("Error saving vacation:", error);
    }
  };

  // Delete vacation
  const deleteVacation = async (id) => {
    try {
      // Optimistically update state
      const updatedVacations = vacations.filter((vacation) => vacation.id !== id);
      setVacations(updatedVacations);

      // Delete from Firestore
      await deleteFromFirestore(id);

      // Refetch vacations to ensure full sync with Firestore
      const refreshedVacations = await fetchVacations();
      setVacations(refreshedVacations);
    } catch (error) {
      console.error("Error deleting vacation:", error);

      // Refetch vacations in case of error to recover UI
      const refreshedVacations = await fetchVacations();
      setVacations(refreshedVacations);
    }
  };

  return (
    <div className="flex h-screen">
      <LeftPanel addVacation={addVacation} />
      <RightPanel vacations={vacations} deleteVacation={deleteVacation} />
    </div>
  );
}

export default App;
