import React from "react";
import {styled} from "styled-components";

// ** props interface **
interface props{
    children: string;
}

// ** Styled-Component **
const StyledValidation = styled.p`
    padding: 5px 10px 0;
    font-size: 11px;
    color: #fff;
`

function Validation(props: props){
    return (
        <StyledValidation>
            {props.children}
        </StyledValidation>
    )
}

export default Validation