// ** 새 항목을 등록 할 수 있는 컴포넌트 **
import React, { ChangeEvent, FormEvent, useState } from "react";
import useAddTodo from "../hooks/useAddTodo";

function TodoInsert() {
    const [value, setValue] = useState('');
    const addTodo = useAddTodo();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        addTodo(value)
        setValue('');
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                placeholder="할 일을 입력하세요."
                value={value}
                onChange={onChange}
            />
            <button type="submit">ADD</button>
        </form>
    );
}

export default TodoInsert