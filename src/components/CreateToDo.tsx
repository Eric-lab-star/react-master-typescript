import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  task: string;
}

const CreateToDo = () => {
  const setToDoList = useSetRecoilState(toDoState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onValid = ({ task }: IForm) => {
    setToDoList((toDoList) => [
      { text: task, category: "To-Do", id: Date.now() },
      ...toDoList,
    ]);
    setValue("task", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        placeholder="Write your Task"
        {...register("task", { required: "Please write a todo" })}
      />
      <span>{errors?.task?.message}</span>

      <button>Add</button>
    </form>
  );
};

export default CreateToDo;
