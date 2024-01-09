import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
// ** Type **
import {ITodo} from "../../../store/todos/type";
import styled from "styled-components";
// ** Hook **
import {useAppDispatch, useAppSelector} from "../../../hooks/TypedUseSelector";
// ** redux **
import { __editTodo, __getTodoList, __removeTodo, __toggleTodo} from "../../../store/todos/todoSlice";
// ** component **
import {InputWrap, Input, AddBtn} from "./TodoInsert";
// ** Fort Awesome **
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
library.add(faPenToSquare)

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

const EditBtn = styled.button`
    padding: 0 10px;
    border: none;
    color: #fff;
    background: transparent;
    cursor: pointer;
    font-size: 15px;
`

const Form = styled.form`
    width: 100%;
`

function TodoItem(todoItem:ITodo){
    // hook
    const dispatch = useAppDispatch()
    const userID = useAppSelector(state => state.auth.userID)

    // state
    const [edit, setEdit] = useState(false)
    const [value, setValue] = useState(todoItem)

    // props
    const completedProps = todoItem.completed === 0 ? 'false' : 'true'

    // handler function
    const toggleHandler = async (e: React.MouseEvent<HTMLLabelElement>) => {
        e.preventDefault()
        try {
            await dispatch(__toggleTodo(todoItem))
            dispatch(__getTodoList({userID: userID}))
        } catch (err){
            console.log(err)
        }
    }

    const removeHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            await dispatch(__removeTodo(todoItem))
            dispatch(__getTodoList({userID: userID}))
        } catch (err){
            console.log(err)
        }
    }

    // handler function
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            content: e.target.value
        })
    };

    const onSubmit = async (e: FormEvent) => {
        try {
            await e.preventDefault()
            await dispatch(__editTodo(value))
            setValue({
                ...value,
                content: ''
            })
            setEdit(false)
        } catch (err){
            console.log(err)
        }

    };

    const editHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setEdit(true)
    }

    return (
        <>
            {edit ? (
                <TodoList completed={completedProps}>
                    <Form onSubmit={onSubmit}>
                        <InputWrap>
                            <Input
                                placeholder="Add Item"
                                value={value.content}
                                onChange={onChange}
                            />
                            <AddBtn type="submit">+</AddBtn>
                        </InputWrap>
                    </Form>
                </TodoList>
            ) : (
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
                    <ItemWrap>
                        <EditBtn onClick={editHandler}>
                            <FontAwesomeIcon icon={faPenToSquare as IconProp} />
                        </EditBtn>
                        <RemoveBtn onClick={removeHandler}>
                            X
                        </RemoveBtn>
                    </ItemWrap>
                </TodoList>

            )}
        </>
    );
}

export default TodoItem;