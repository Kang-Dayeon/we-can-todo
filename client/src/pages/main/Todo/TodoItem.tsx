import React from "react";
// ** Type **
import {ITodo} from "../../../store/todos/type";
import styled from "styled-components";
// ** Hook **
import {useAppDispatch, useAppSelector} from "../../../hooks/TypedUseSelector";
// ** redux **
import {__getTodoList, __removeTodo, __toggleTodo} from "../../../store/todos/todoSlice";

// ** Img **
const IconCheck = require('../../../assets/images/icon/icon_check.png');

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
    color: #fff;
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
    // hook
    const dispatch = useAppDispatch()
    const userID = useAppSelector(state => state.auth.userID)

    // props
    const completedProps = todoItem.completed === 0 ? 'false' : 'true'

    // handler function
    const toggleHandler = async (e: React.MouseEvent<HTMLLabelElement>) => {
        e.preventDefault()
        try {
            await dispatch(__toggleTodo(todoItem)).then(() => {
                dispatch(__getTodoList({userID}))
            })
        } catch (err){
            console.log(err)
        }
    }

    const removeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            await dispatch(__removeTodo(todoItem)).then(() => {
                dispatch(__getTodoList({userID}))
            })
        } catch (err){
            console.log(err)
        }
    }

    return (
        <TodoList completed={completedProps}>
            <ItemWrap>
                <div>
                    <CheckBox id="check"></CheckBox>
                    <CheckLabel
                        htmlFor="check"
                        onClick={toggleHandler}
                        completed={completedProps}>
                    </CheckLabel>
                </div>
                <TodoText completed={completedProps}>
                    {todoItem.content}
                </TodoText>
            </ItemWrap>
            <RemoveBtn onClick={removeHandler}>
                X
            </RemoveBtn>
        </TodoList>
    );
}

export default TodoItem;