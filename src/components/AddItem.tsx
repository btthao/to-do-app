import AddIcon from "@mui/icons-material/Add";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addItem, selectTodo } from "../features/todoSlice";
import { selectUser } from "../features/userSlice";
import styles from "../styles/Todo.module.scss";
import { db } from "../utils/firebase";

const AddItem: React.FC = () => {
  const [item, setItem] = useState("");
  const dispatch = useAppDispatch();
  const { email } = useAppSelector(selectUser);
  const { list } = useAppSelector(selectTodo);

  const addItemToList = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (item) {
      const data = {
        id: list.length ? list[list.length - 1].id + 1 : 1,
        thingToDo: item,
        finished: false,
      };
      dispatch(addItem(data));
      setItem("");
      const docRef = doc(db, "users", email as string);
      await updateDoc(docRef, {
        todo: arrayUnion(data),
      });
    }
  };

  return (
    <form className={styles.input}>
      <input
        value={item}
        placeholder="Add new item"
        onChange={(e) => setItem(e.target.value)}
      />
      <button type="submit" onClick={addItemToList}>
        <AddIcon fontSize="small" />
      </button>
    </form>
  );
};

export default AddItem;
