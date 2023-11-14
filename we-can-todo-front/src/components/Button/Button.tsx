import React, {HTMLAttributes} from "react";
import {styled} from "styled-components";

// ** props interface **
interface props extends HTMLAttributes<HTMLButtonElement>{
    children: string;
    type?: 'submit' | 'reset' | 'button' | undefined;
}

// ** Styled-component **
const ButtonStyled = styled.button`
    margin-top: 15px;
    padding: 12px 0;
    width: 100%;
    color: #000;
    border: none;
    border-radius: 20px;
    background: #feca3c;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
`

function Button(props: props){
    // props
    const children = props.children

    return (
        <ButtonStyled
            type={props.type}
        >
            {children}
        </ButtonStyled>
    )
}

export default Button