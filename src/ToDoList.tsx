import React, { useState } from "react";

import { useForm } from "react-hook-form";

const ToDoList = () => {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  console.log(formState.errors);
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("gender", { required: "true" })}
          type="text"
          placeholder="gender"
        />
        <input
          {...register("name", { required: "true" })}
          type="text"
          placeholder="name"
        />
        <input
          {...register("lastname", {
            required: "true",
            minLength: {
              value: 5,
              message: "your name is short",
            },
          })}
          type="text"
          placeholder="lastname"
        />

        <button>Add</button>
      </form>
    </div>
  );
};

/* const ToDoList = () => {
  const [todo, setTodo] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    console.log(todo);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type={"text"}
          placeholder="Write Your Task"
          value={todo}
        />
        <button>Add</button>
      </form>
    </div>
  );
}; */

export default ToDoList;
