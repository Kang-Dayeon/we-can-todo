// ** 새 항목을 등록 할 수 있는 컴포넌트 **
import { ChangeEvent, FormEvent, useState } from "react";
// ** Hook **
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../../hooks/TypedUseSelector";
import {__addTodo} from "../../../store/todos/todoSlice";

// ** Styled-Component **
export const InputWrap = styled.div`
    display: flex;
    padding: 10px 20px;
    width: auto;
    background-color: rgba(255,255,255,0.2);
    border: none;
    border-radius: 30px;
`
export const Input = styled.input`
    margin-right: 7px;
    flex-grow: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 14px;
    color: #fff;
    &::placeholder{
        color: #fff;
    }
`
export const AddBtn = styled.button`
    width: 30px;
    height: 30px;
    color: #fff;
    border: none;
    border-radius: 50%;
    background: #feca3c;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
`

function TodoInsert() {
    const dispatch = useAppDispatch()
    const userID = useAppSelector(state => state.auth.userID)

    // state
    const [value, setValue] = useState({
        content: '',
        completed: 0,
        userID
    })

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
            await dispatch(__addTodo(value))
            setValue({
                ...value,
                content: ''
            })
        } catch (err){
            console.log(err)
        }

    };

    return (
        <form onSubmit={onSubmit}>
            <InputWrap>
                <Input
                    placeholder="Add Item"
                    value={value.content}
                    onChange={onChange}
                />
                <AddBtn type="submit">+</AddBtn>
            </InputWrap>
        </form>
    );
}

export default TodoInsert