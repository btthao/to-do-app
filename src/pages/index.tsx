import { signOut } from "firebase/auth";
import Head from "next/head";
import React from "react";
import { useAppDispatch } from "../app/hooks";
import AddItem from "../components/AddItem";
import Button from "../components/Button";
import TodoList from "../components/TodoList";
import useCheckedLogIn from "../components/useCheckedLogIn";
import { clear } from "../features/todoSlice";
import { logout } from "../features/userSlice";
import styles from "../styles/Todo.module.scss";
import { auth } from "../utils/firebase";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { checkedLogIn, user } = useCheckedLogIn();

  const logOut = () => {
    signOut(auth).then(() => {
      dispatch(logout());
      dispatch(clear());
    });
  };

  return (
    <div>
      <Head>
        <title>Todo app</title>
        <meta name="description" content="todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {checkedLogIn && user && (
        <div className={styles.container}>
          <h1>Hi {user}!</h1>
          <Button onClick={logOut}>Log out</Button>
          <div className={styles.wrapper}>
            <AddItem />
            <TodoList />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
