// ** 새 항목을 등록 할 수 있는 컴포넌트 **
import { ChangeEvent, FormEvent, useState } from "react";
// ** Hook **
import useAddTodo from "../../../hooks/useAddTodo";
import styled from "styled-components";

// ** Styled-Component **
const InputWrap = styled.div`
    display: flex;
    padding: 10px 20px;
    width: auto;
    background-color: rgba(255,255,255,0.2);
    border: none;
    border-radius: 30px;
`
const Input = styled.input`
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
const AddBtn = styled.button`
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
    // state
    const [value, setValue] = useState('')

    // hook
    const addTodo = useAddTodo()

    // handler function
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault()
        // addTodo(value)
        setValue('')
    };

    return (
        <form onSubmit={onSubmit}>
            <InputWrap>
                <Input
                    placeholder="Add Item"
                    value={value}
                    onChange={onChange}
                />
                <AddBtn type="submit">+</AddBtn>
            </InputWrap>
        </form>
    );
}

export default TodoInsert