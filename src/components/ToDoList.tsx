import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";
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
  const toDoList = useRecoilValue(toDoState);
  console.log(toDoList);
  return (
    <div>
      <Header>
        <h1> To Do List</h1>
      </Header>
      <CreateToDo />
      <ul>
        {toDoList.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
