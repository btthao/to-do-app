import React, { useState } from "react";
import { useRouter } from "next/router";
import Input from "../components/Input";
import Button from "../components/Button";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../utils/firebase";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/userSlice";
import styles from "../styles/Form.module.scss";
import Form from "../components/Form";

const Login: React.FC = ({}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const logInToFirebase = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch(login({ user: userCredential.user.displayName }));
        })
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
    } else {
      alert("Please fill in all required fields.");
    }
  };
  return (
    <div className={styles.main}>
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
        <Button type="submit" onClick={(e) => logInToFirebase(e)}>
          Log in
        </Button>
        <p>
          Don't have an account?{" "}
          <span onClick={() => router.push("/signup")}>Sign up</span> now
        </p>
      </Form>
    </div>
  );
};

export default Login;
