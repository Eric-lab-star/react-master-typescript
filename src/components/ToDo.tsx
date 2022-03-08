import React from "react";
import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    console.log(name);
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);

      const newToDo = { text, id, category: name as any };

      return [
        ...prev.slice(0, targetIndex),
        newToDo,
        ...prev.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>

      {category !== "DONE" && (
        <button name={"DONE"} onClick={onClick}>
          Done
        </button>
      )}
      {category !== "To-Do" && (
        <button name={"To-Do"} onClick={onClick}>
          Todo
        </button>
      )}
      {category !== "DOING" && (
        <button name={"DOING"} onClick={onClick}>
          Doing
        </button>
      )}
    </li>
  );
};

export default ToDo;
