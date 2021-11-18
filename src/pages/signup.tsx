import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { setDoc } from "@firebase/firestore";
import { doc } from "firebase/firestore";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/userSlice";
import { useRouter } from "next/router";
import { ErrorData } from "@firebase/util";
import Form from "../components/Form";
import styles from "../styles/Form.module.scss";

interface SignupProps {}

const Signup: React.FC<SignupProps> = ({}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const signUpToFirebase = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
          dispatch(login({ user: username }));
        })
        .then(() => {
          router.push("/");
        })
        .catch((error: ErrorData) => {
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
        <Button type="submit" onClick={(e) => signUpToFirebase(e)}>
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default Signup;
