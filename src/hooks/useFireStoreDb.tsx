import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "../../firebaseConfig";

export const useFireStoreDb = () => {
  const addData = async () => {
    try {
      await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchData = async () => {
    await getDocs(collection(db, "users"));
  };
  return {
    addData,
    fetchData,
  };
};
