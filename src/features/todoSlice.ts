import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface Item {
  id: number;
  thingToDo: string;
  finished: boolean;
}

export interface TodoState {
  list: Item[];
}

const initialState: TodoState = {
  list: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setInitialItems: (state, action: PayloadAction<Item[]>) => {
      state.list = [...action.payload];
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.list = [...state.list, action.payload];
    },
    clear: (state) => {
      state.list = [];
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const newList = [...state.list].filter(
        (item) => item.id !== action.payload
      );
      state.list = newList;
    },
    tickItem: (state, action: PayloadAction<number>) => {
      const newList = [...state.list];
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].id === action.payload) {
          newList[i].finished = !newList[i].finished;
          break;
        }
      }
      state.list = newList;
    },
  },
});

export const { addItem, setInitialItems, removeItem, tickItem, clear } =
  todoSlice.actions;

export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
