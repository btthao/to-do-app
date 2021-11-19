import Checkbox from "@mui/material/Checkbox";
import React from "react";
import { useAppDispatch } from "../app/hooks";
import { removeItem, tickItem } from "../features/todoSlice";
import styles from "../styles/Todo.module.scss";
import ClearIcon from "@mui/icons-material/Clear";

interface ItemProps {
  finished: boolean;
  id: number;
  updateFirebase: () => void;
}

const Item: React.FC<ItemProps> = ({
  children,
  finished,
  id,
  updateFirebase,
}) => {
  const dispatch = useAppDispatch();

  const remove = () => {
    dispatch(removeItem(id));
    updateFirebase();
  };

  const tick = () => {
    dispatch(tickItem(id));
    updateFirebase();
  };

  return (
    <li className={styles.item}>
      <Checkbox checked={finished} onChange={tick} />
      <span
        className={`${styles.itemText} ${finished ? styles.lineThrough : ""}`}
      >
        {children}
      </span>
      <button className={styles.button} type="button" onClick={remove}>
        <ClearIcon fontSize="small" />
      </button>
    </li>
  );
};

export default Item;
