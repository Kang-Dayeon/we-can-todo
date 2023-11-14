import React from "react";
import {styled} from "styled-components";

// ** props interface **
interface props{
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: any;
}

// ** Styled-Component **
const Input = styled.input`
    display: block;
    margin: 10px 0 0;
    padding: 10px 15px;
    width: 100%;
    border: none;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 14px;
    &::placeholder{
        color: #fff;
    }
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