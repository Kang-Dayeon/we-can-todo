import React from "react";
import {styled} from "styled-components";

type onChange = (e: React.ChangeEvent<HTMLInputElement>) => void

interface props {
    type: string,
    name: string,
    placeholder: string,
    value: string,
    onChange: onChange
}

const Input = styled.input`
    display: block;
    margin: 10px 0;
    padding: 10px 15px;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 15px;
`

function InputText(props: props){
    return (
        <Input
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    )
}

export default InputText