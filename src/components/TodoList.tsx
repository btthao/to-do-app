import { doc, updateDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { selectTodo } from "../features/todoSlice";
import { selectUser } from "../features/userSlice";
import { db } from "../utils/firebase";
import Item from "./Item";
import styles from "../styles/Todo.module.scss";

const TodoList: React.FC = () => {
  const { email } = useAppSelector(selectUser);
  const { list } = useAppSelector(selectTodo);
  const [updateFirebase, setUpdateFirebase] = useState(false);

  useEffect(() => {
    if (updateFirebase) {
      const docRef = doc(db, "users", email as string);
      updateDoc(docRef, {
        todo: list,
      });
      setUpdateFirebase(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <div className={styles.list}>
      {list.length ? (
        <ul>
          {list.map(({ id, thingToDo, finished }) => (
            <Item
              finished={finished}
              id={id}
              key={id}
              updateFirebase={() => setUpdateFirebase(true)}
            >
              {thingToDo}
            </Item>
          ))}
        </ul>
      ) : (
        <p>Empty list :(</p>
      )}
    </div>
  );
};

export default TodoList;
