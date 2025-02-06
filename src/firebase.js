import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMLGcrev0mgc2UyCHBjhMr6gvuIftQV6w",
  authDomain: "teamcalender-bf43c.firebaseapp.com",
  projectId: "teamcalender-bf43c",
  storageBucket: "teamcalender-bf43c.firebasestorage.app",
  messagingSenderId: "601972509139",
  appId: "1:601972509139:web:4036f89a28c666d1078726",
  measurementId: "G-5HME984KJK",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add Vacation
export const addVacation = async (vacation) => {
  try {
    const docRef = await addDoc(collection(db, "vacations"), vacation);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Fetch Vacations
export const fetchVacations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "vacations"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching documents: ", e);
    return [];
  }
};

// Delete Vacation
export const deleteVacation = async (id) => {
  try {
    await deleteDoc(doc(db, "vacations", id));
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export { db };
