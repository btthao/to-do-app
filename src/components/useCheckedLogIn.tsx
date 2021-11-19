import { onAuthStateChanged } from "@firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setInitialItems } from "../features/todoSlice";
import { login, selectUser } from "../features/userSlice";
import { auth, db } from "../utils/firebase";

const useCheckedLogIn = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectUser);
  const router = useRouter();
  const [checkedLogIn, setCheckedLogIn] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const docRef = doc(db, "users", currentUser.email as string);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            dispatch(setInitialItems(docSnap.data().todo));
          }
          dispatch(
            login({ user: currentUser.displayName, email: currentUser.email })
          );
          router.push("/");
        } else if (router.pathname === "/") {
          router.push("/login");
        }
        setCheckedLogIn(true);
      });
    }

    return () => {
      isSubscribed = false;
      setCheckedLogIn(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { checkedLogIn, user };
};

export default useCheckedLogIn;
