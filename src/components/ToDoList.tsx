import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";

import styled from "styled-components";

const Header = styled.div`
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  line-height: 50px;
  height: 50px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 10px auto;
  input {
    border-style: none;
    padding: 10px;
    margin: 10px 0px;
    background-color: inherit;
    border-bottom: 1px solid white;
    color: white;
    &:focus {
      outline: none;
      border-bottom: 1px solid ${(props) => props.theme.textColor};
    }
  }
  button {
    color: ${(props) => props.theme.bgColor};
    background-color: ${(props) => props.theme.textColor};
    border-style: none;
    border-radius: 5px;
  }
`;

interface ILoginForm {
  task: string;
}

interface IToDo {
  text: string;
  category: "To-Do" | "DOING" | "DONE";
}

const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

const ToDoList = () => {
  const [toDoList, setToDoList] = useRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ILoginForm>();
  const onValid = (data: ILoginForm) => {
    console.log(data);
    setValue("task", "");
  };

  return (
    <div>
      <Header>
        <h1> To Do List</h1>
      </Header>

      <LoginForm onSubmit={handleSubmit(onValid)}>
        <input
          placeholder="Write your Task"
          {...register("task", { required: "Please write a todo" })}
        />
        <span>{errors?.task?.message}</span>

        <button>Add</button>
      </LoginForm>
    </div>
  );
};

export default ToDoList;
