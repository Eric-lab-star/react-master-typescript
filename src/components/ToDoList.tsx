import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Header = styled.div`
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  height: 50px;
`;

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  console.log(category);
  return (
    <div>
      <Header>
        <h1> To Do List</h1>
      </Header>
      <select value={category} onInput={onInput}>
        <option value={"To-Do"}>To Do</option>
        <option value={"DOING"}>Doing</option>
        <option value={"DONE"}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      <hr />
    </div>
  );
};

export default ToDoList;
