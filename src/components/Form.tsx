import React from "react";
import styles from "../styles/Form.module.scss";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";

const Form: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>{children}</form>
      <div className={styles.icon}>
        <DynamicFormIcon />
      </div>
    </div>
  );
};

export default Form;
