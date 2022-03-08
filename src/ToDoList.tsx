import React, { useState } from "react";

import { useForm } from "react-hook-form";
import styled from "styled-components";

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 10px auto;
`;

interface ILoginForm {
  task: string;
}

const ToDoList = () => {
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
