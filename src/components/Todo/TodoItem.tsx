import React from "react";
import useTodoAction from "../../hooks/useTodoAction";
import {ITodo} from "../../store/todos/type";
import styled from "styled-components";

const IconCheck = require('../../assets/images/icon/icon_check.png');

// ** styled component **
const TodoList = styled.li<{ completedTodo: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding: 12px 10px;
    border: ${(props) => props.completedTodo ? 'none' : '1px solid rgba(0,0,0,0.2)'};
    border-radius: 15px;
    box-shadow: ${(props) => props.completedTodo ? 'none' : '1px 1px 3px 0 rgba(0,0,0,0.1)'};
`
const ItemWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`
const CheckBox = styled.input`
    type: checkbox;
    display: none;
`
const CheckLabel = styled.label<{ completedTodo: boolean }>`
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border: ${(props) => props.completedTodo ? '1px solid #45BF86' : '1px solid rgba(0,0,0,0.3)'};
    border-radius: 50%;
    background: ${(props) => props.completedTodo ? `url(${IconCheck}) no-repeat center` : 'none'};
    background-color: ${(props) => props.completedTodo ? '#CEF2E1' : '#fff'};
    background-size: 70%;
    transform: translateY(10%);
`
const TodoText = styled.p<{ completedTodo: boolean }>`
    font-size: 12px;
    padding: 0 10px;
    word-break: break-all;
    color: ${(props) => props.completedTodo ? '#999' : '#000'};
    text-decoration: ${(props) => props.completedTodo ? 'line-through' : 'none'} ;
`
const RemoveBtn = styled.button`
    padding: 0 10px;
    width: 10px;
    border: none;
    color: #999;
    background: transparent;
`

function TodoItem(todoItem:ITodo){
    const { onToggle, onRemove } = useTodoAction(todoItem.id);
    const completedTodo: boolean = todoItem.completed

    return (
        <TodoList completedTodo={completedTodo}>
            <ItemWrap>
                <div>
                    <CheckBox id="check"></CheckBox>
                    <CheckLabel htmlFor="check" onClick={() => onToggle} completedTodo={completedTodo}></CheckLabel>
                </div>
                <TodoText completedTodo={completedTodo}>
                    {todoItem.text}
                </TodoText>
            </ItemWrap>
            <RemoveBtn onClick={() => onRemove}>
                X
            </RemoveBtn>
        </TodoList>
    );
}

export default TodoItem;