import React, { useState } from "react";

import { useForm } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

interface IForm {
  gender: string;
  surname: string;
  lastname: string;
  email: string;
  password: string;
  password2: string;
  extraError?: string;
}

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.password2) {
      setError("password", { message: "Passwords are not the same" });
    }
    setError("extraError", { message: "server offline" });
  };

  console.log(errors);
  return (
    <Wrapper>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("gender", { required: "required" })}
          type="text"
          placeholder="gender"
        />
        <span>{errors?.gender?.message}</span>
        <input
          {...register("surname", { required: "required" })}
          type="text"
          placeholder="surname"
        />
        <span>{errors?.surname?.message}</span>
        <input
          {...register("lastname", {
            required: "required",
            minLength: {
              value: 5,
              message: "your name is short",
            },
          })}
          type="text"
          placeholder="lastname"
        />
        <span>{errors?.lastname?.message}</span>
        <input
          placeholder="email"
          {...register("email", {
            required: "email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com/,
              message: "only naver.com emails allowed",
            },
          })}
        />
        <span>{errors?.email?.message}</span>
        <input
          placeholder="password"
          {...register("password", { required: "required" })}
        />
        <span>{errors?.password?.message}</span>
        <input
          placeholder="password confirmation"
          {...register("password2", { required: "required" })}
        />
        <span>{errors?.password?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </Wrapper>
  );
};

export default ToDoList;
