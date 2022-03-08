import { atom, selector } from "recoil";

export enum Category {
  "To-Do",
  "DOING",
  "DONE",
}

export interface IToDo {
  text: string;
  category: Category;
  id: number;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",

  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    if (category === "To-Do")
      return toDos.filter((toDo) => toDo.category === "To-Do");
    if (category === "DOING")
      return toDos.filter((toDo) => toDo.category === "DOING");
    if (category === "DONE")
      return toDos.filter((toDo) => toDo.category === "DONE");
  },
});

export const categoryState = atom<Category>({
  key: "category",
  default: Category["To-Do"],
});
