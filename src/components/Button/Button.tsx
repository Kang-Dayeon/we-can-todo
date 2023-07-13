import React from "react";
import {styled} from "styled-components";

type onClick = (e: React.MouseEvent<HTMLButtonElement>) => void

interface props {
    children: string,
    onClick: onClick
}

const ButtonStyled = styled.button`
    margin-top: 15px;
    padding: 12px 0;
    color: #fff;
    border: none;
    border-radius: 20px;
    background: #3d79b1;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
`

function Button(props: props){
    const children = props.children
    return (
        <ButtonStyled
            onClick={props.onClick}
        >
            {children}
        </ButtonStyled>
    )
}

export default Button