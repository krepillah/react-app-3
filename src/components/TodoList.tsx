import TodoItem from "./TodoItem"
import { ITodo } from "../types/data"
import styled from "styled-components";

interface ITodoListProps {
    items: ITodo[];
    number: number;
    deleteTodo: (id: number) => void;
    togleTodo: (id: number) => void;
}

const ListBlock = styled.div`
    width: 100%;
    margin-top: 40px;
`;


const TodoList: React.FC<ITodoListProps> = ({items, deleteTodo, togleTodo}) => {
    return (
        <ListBlock>
            {items.map((todo, id) => 
                <TodoItem key={todo.id} number={id+1} deleteTodo={deleteTodo} togleTodo={togleTodo} {...todo} />
            )}
        </ListBlock>
    )
}

export default TodoList;