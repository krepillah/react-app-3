import { ITodo } from "../types/data"
import styled from "styled-components";

interface ITodoItem extends ITodo {
    number: number;
    deleteTodo: (id: number) => void;
    togleTodo: (id: number) => void;
}

const ItemBlock = styled.div<{underlined: boolean;}>`
    border: 1px solid var(--main-light-grey);
    padding: 5px 15px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    height: 32px;
    box-sizing: border-box;
    position: relative;
    margin-bottom: 10px;
    color: ${(props) => (props.underlined)?"#b7b7b7" : "#222323"};
    border-color: ${(props) => (props.underlined)?"var(--main-light-green)":"var(--main-light-grey)"};
`;

const ItemInput = styled.input`
    margin-left: 10px;
`;

const ItemButton = styled.button<{shown: boolean;}>`
    border: 1px solid var(--main-red);
    border-radius: 20px;
    min-width: 20px;
    height: 20px;
    display: ${(props) => (props.shown)?"none" : "block"};
    box-sizing: border-box;
    max-width: 20px;
    cursor: pointer;
    background: none;
    color: var(--main-red);
    line-height: 15px;

    &:hover{
        background: var(--main-red);
        color: white;
    }
`;

const Span = styled.span<{underlined: boolean;}>`
    flex-grow: 1;
    display: block;
    word-break: break-word;
    margin: 0 10px;
    opacity: 0.8;
    border-left: 1px solid var(--main-light-grey);
    padding-left: 10px; 
    text-decoration: ${(props) => (props.underlined)? "line-through" : "none"};
`;

const TodoItem: React.FC<ITodoItem> = ({id, title, number, completed, deleteTodo, togleTodo}) => {
    return (
        <ItemBlock underlined={completed}>
            {number}.
            <ItemInput type="checkbox" checked={completed} onChange={() => togleTodo(id)}/>
            <Span underlined={completed}>{title}</Span>
            <ItemButton shown={completed} onClick={() => deleteTodo(id)}>x</ItemButton>
        </ItemBlock>
    )
}

export default TodoItem;