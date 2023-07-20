import React from "react";
// ** Hook **
import useTodoAction from "../../hooks/useTodoAction";
// ** Type **
import {ITodo} from "../../store/todos/type";
import styled from "styled-components";

// ** Img **
const IconCheck = require('../../assets/images/icon/icon_check.png');

// ** Styled-Component **
const TodoList = styled.li<{completed: string }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    padding: 12px 10px;
    border-radius: 15px;
    box-shadow: ${(props) => (props.completed === "true") ? 'none' : '1px 1px 3px 0 rgba(0,0,0,0.1)'};
    background: rgba(38,1,71,0.2);
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
const CheckLabel = styled.label<{ completed: string }>`
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${(props) => (props.completed === "true") ? `url(${IconCheck}) no-repeat center` : 'none'};
    background-color: ${(props) => (props.completed === "true") ? '#CEF2E1' : '#fff'};
    background-size: 70%;
    transform: translateY(10%);
`
const TodoText = styled.p<{ completed: string }>`
    font-size: 14px;
    padding: 0 10px;
    word-break: break-all;
    color: ${(props) => (props.completed === "true") ? '#999' : '#fff'};
    text-decoration: ${(props) => (props.completed === "true") ? 'line-through' : 'none'} ;
`
const RemoveBtn = styled.button`
    padding: 0 10px;
    width: 10px;
    border: none;
    color: #fff;
    background: transparent;
    cursor: pointer;
`

function TodoItem(todoItem:ITodo){
    // reducer
    const { onToggle, onRemove } = useTodoAction(todoItem.id);
    // props
    const completedProps = todoItem.completed

    // handler function
    const toggleHandler = (e: React.MouseEvent<HTMLLabelElement>) => {
        e.preventDefault()
        onToggle()
    }

    const removeHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if(window.confirm('정말 삭제하시겠습니까?')) onRemove()
    }

    return (
        <TodoList completed={completedProps.toString()}>
            <ItemWrap>
                <div>
                    <CheckBox id="check"></CheckBox>
                    <CheckLabel
                        htmlFor="check"
                        onClick={toggleHandler}
                        completed={completedProps.toString()}>
                    </CheckLabel>
                </div>
                <TodoText completed={completedProps.toString()}>
                    {todoItem.text}
                </TodoText>
            </ItemWrap>
            <RemoveBtn onClick={removeHandler}>
                X
            </RemoveBtn>
        </TodoList>
    );
}

export default TodoItem;