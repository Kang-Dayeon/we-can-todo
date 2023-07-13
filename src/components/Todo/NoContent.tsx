import React from "react";
import {styled} from "styled-components";

// ** Styled-Component **
const Message = styled.div`
    display: flex;
    padding: 10px 5px;
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