import React, { useState } from "react";

import { useForm } from "react-hook-form";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const ToDoList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onValid = (data: any) => {
    console.log(data);
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
          {...register("name", { required: "required" })}
          type="text"
          placeholder="name"
        />
        <span>{errors?.name?.message}</span>
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

        <button>Add</button>
      </form>
    </Wrapper>
  );
};

export default ToDoList;
