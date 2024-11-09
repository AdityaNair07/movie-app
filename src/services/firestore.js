import { useToast } from "@chakra-ui/react";
import { db } from "../services/firebase";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  deleteField,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export const useFirestore = () => {
  const toast = useToast();

  const addDocument = async (collectionName, data) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  };

  const addToWatchlist = async (userId, watchlistItemId, data) => {
    try {
      if (await checkIsInWatchlist(userId, watchlistItemId)) {
        toast({
          title: "Error!",
          description: "Already in the watchlist",
          variant: "solid",
          isClosable: true,
          status: "error",
        });
        return false;
      }
      await setDoc(
        doc(db, "users", userId, "watchlist", watchlistItemId),
        data
      );
      toast({
        title: "Success!",
        description: "Add to watchlist",
        variant: "solid",
        isClosable: true,
        status: "success",
      });
    } catch (error) {
      console.log("Error adding document ", error);
      toast({
        title: "Error!",
        description: "An error occurred",
        variant: "solid",
        isClosable: true,
        status: "error",
      });
    }
  };

  const checkIsInWatchlist = async (userId, watchlistItemId) => {
    const docRef = doc(
      db,
      "users",
      userId.toString(),
      "watchlist",
      watchlistItemId.toString()
    );

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) return true;
    else return false;
  };

  const removeFromWatchlist = async (userId, watchlistItemId) => {
    try {
      await deleteDoc(
        doc(
          db,
          "users",
          userId.toString(),
          "watchlist",
          watchlistItemId.toString()
        )
      );
      toast({
        title: "Success!",
        description: "Removed from watchlist!",
        variant: "solid",
        isClosable: true,
        status: "success",
      });
    } catch (error) {
      console.log("Error removing document ", error);
      toast({
        title: "Error!",
        description: "Error removing item from watchlist!",
        variant: "solid",
        isClosable: true,
        status: "error",
      });
    }
  };

  const getWatchlist = async (userId) => {
    const querySnapShot = await getDocs(
      collection(db, "users", userId.toString(), "watchlist")
    );

    const data = querySnapShot.docs.map((doc) => ({ ...doc.data() }));

    return data;
  };

  return {
    addDocument,
    addToWatchlist,
    checkIsInWatchlist,
    removeFromWatchlist,
    getWatchlist,
  };
};
