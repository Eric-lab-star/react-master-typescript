import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoSelector, toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Header = styled.div`
  font-size: 30px;
  font-weight: 800;
  text-align: center;
  line-height: 50px;
  height: 50px;
`;

const ToDoList = () => {
  const [toDo, doing, done] = useRecoilValue(toDoSelector);

  return (
    <div>
      <Header>
        <h1> To Do List</h1>
      </Header>
      <CreateToDo />
      <h2>To Do</h2>
      <ul>
        {toDo.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((toDo) => {
          return <ToDo key={toDo.id} {...toDo} />;
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
