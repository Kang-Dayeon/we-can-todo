import React from "react";
import {styled} from "styled-components";

const Message = styled.div`
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: #999;
`

function NoContent(){
    return (
        <Message>
            No content
        </Message>
    )
}

export default NoContent