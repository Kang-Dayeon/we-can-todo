import React from "react";
import {styled} from "styled-components";

// ** props type **
type onClick = (e: React.MouseEvent<HTMLButtonElement>) => void

// ** props interface **
interface props {
    children: string,
    onClick: onClick
}

// ** Styled-component **
const ButtonStyled = styled.button`
    margin-top: 15px;
    padding: 12px 0;
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
            onClick={props.onClick}
        >
            {children}
        </ButtonStyled>
    )
}

export default Button