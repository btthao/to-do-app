import { signInWithEmailAndPassword } from "@firebase/auth";
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
import { auth } from "../utils/firebase";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { checkedLogIn, user } = useCheckedLogIn();

  const userLogIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch(
            login({
              user: userCredential.user.displayName,
              email: userCredential.user.email,
            })
          );
        })
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className={styles.main}>
      <Head>
        <title>Log in</title>
        <meta name="description" content="todo app - log in" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {checkedLogIn && !user && (
        <Form>
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
          <Button type="submit" onClick={userLogIn}>
            Log in
          </Button>
          <p>
            Don&apos;t have an account?{" "}
            <span onClick={() => router.push("/signup")}>Sign up</span> now.
          </p>
        </Form>
      )}
    </div>
  );
};

export default Login;
