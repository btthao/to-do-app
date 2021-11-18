import React, { InputHTMLAttributes } from "react";
import styles from "../styles/Form.module.scss";

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <input className={styles.input} {...props} />;
};

export default Input;
