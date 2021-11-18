import type { NextPage } from "next";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, logout, selectUser } from "../features/userSlice";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import Button from "../components/Button";

const Home: NextPage = () => {
  const { user } = useAppSelector(selectUser);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const logOut = () => {
    signOut(auth).then(() => {
      dispatch(logout());
    });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(login({ user: currentUser.displayName }));
      } else {
        router.push("/login");
      }
    });
  }, [dispatch, router]);
  return (
    <div>
      <Head>
        <title>Todo app</title>
        <meta name="description" content="todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user && (
        <div>
          <Button onClick={() => logOut()}>Log out</Button>
        </div>
      )}
    </div>
  );
};

export default Home;
