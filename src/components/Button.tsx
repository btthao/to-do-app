import React, { ButtonHTMLAttributes } from "react";
import styles from "../styles/Form.module.scss";

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button className={styles.button} {...props} />;
};

export default Button;
