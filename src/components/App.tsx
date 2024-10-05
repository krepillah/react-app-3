import { useState, useEffect, useRef } from "react";
import { ITodo } from "../types/data";
import TodoList from "./TodoList";
import { styled, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --main-blue: #387dff;
        --main-green: #03A696;
        --main-light-green:#04D49D;
        --main-orange: #F28157;
        --main-red: #ff786c;
        --main-light-grey: #d3d3d3;
    }

    body{
        color: #35364e;
    }
`;

const AppBlock = styled.section`
    width: 90vw;
    max-width: 600px;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 30px;
    border: 1px solid var(--main-light-grey);
    display: flex;
    padding: 50px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AppBlockTitle = styled.h1`
    font-size: 30px;
    font-family: monospace;
    margin-bottom: 20px;
    color: #387dff;
    text-transform: capitalize;
`;

const AppBlockInput = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Input = styled.input`
    border: 1px solid var(--main-light-grey);
    padding: 20px 15px;
    border-radius: 20px;
    flex-grow: 1;

    &:focus-visible {
        border-color: var(--main-light-green); 
        outline: none; 
    }
`;

const Button = styled.button`
    border: 1px solid var(--main-blue);
    background: none;
    color: var(--main-blue);
    padding: 20px 30px;
    border-radius: 20px;
    margin-left: 5px;
    cursor: pointer;

    &:hover{
        background: var(--main-blue);
        color: white;
    }
`;

const App: React.FC = () => {
    const [value, setValue] = useState("");
    const [todos, setTodos] = useState<ITodo[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const addTodo = () => {
        if(value){
            setTodos([...todos, {
                id: Date.now(),
                title: value,
                completed: false,
            }])
        }
        setValue('');
    }

    const deleteTodo = (id: number): void => {
        setTodos(todos.filter( todo => todo.id !== id));
    }

    const togleTodo = (id: number): void => {
        setTodos(todos.map(todo => {
            if(todo.id !== id) return todo;
            return {
                ...todo,
                completed: !todo.completed,
            }
        }))
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === "Enter"){
            addTodo();
        }
    }

    useEffect(() => {
        inputRef.current && inputRef.current.focus();
    }, [])

    return (
        <>
            <GlobalStyle />
            <AppBlock>
                <AppBlockTitle> To-Do's widget.</AppBlockTitle>
                <AppBlockInput>
                    <Input placeholder="Your to-do's..." ref={inputRef} type="text" value={value} onKeyDown={handleKeyDown} onChange={handleChange}/>
                    <Button onClick={addTodo}>Add</Button>
                </AppBlockInput>
                <TodoList items={todos} number={1} deleteTodo={deleteTodo} togleTodo={togleTodo}/>
            </AppBlock>
        </>
    )
}

export default App;