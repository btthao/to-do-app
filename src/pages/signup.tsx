import { setDoc } from "@firebase/firestore";
import { ErrorData } from "@firebase/util";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { doc } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import Button from "../components/Button";
import Form from "../components/Form";
import Input from "../components/Input";
import useCheckedLogIn from "../components/useCheckedLogIn";
import { login } from "../features/userSlice";
import styles from "../styles/Form.module.scss";
import { auth, db } from "../utils/firebase";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { checkedLogIn, user } = useCheckedLogIn();

  const userSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (username && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential: UserCredential) => {
          await updateProfile(userCredential.user, {
            displayName: username,
          });
          await setDoc(doc(db, "users", userCredential.user.email as string), {
            user: username,
            todo: [],
          });
          dispatch(login({ user: username, email }));
        })
        .then(() => {
          router.push("/");
        })
        .catch((error: ErrorData) => {
          alert(error.message);
        });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="todo app - sign up" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {checkedLogIn && !user && (
        <Form>
          <Input
            required
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            required
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={userSignUp}>
            Sign up
          </Button>
        </Form>
      )}
    </div>
  );
};

export default Signup;
