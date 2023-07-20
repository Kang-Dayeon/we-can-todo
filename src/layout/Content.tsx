import React from "react";
import styled from "styled-components";

// ** Styled-Component **
const StyledWrapper = styled.div`
    padding: 30px 15px;
    width: 100%;
    height: auto;
    background-color: rgba(38,1,71,0.5);
    color: #000;
    overflow-x: hidden;
    overflow-y: scroll;
    border-radius: 20px;
    &::-webkit-scrollbar{
        display: none;
    }
`

const StyledInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

function Content (props:any) {
    // props
    const {children} = props

    return (
        <StyledWrapper>
            <StyledInner>
                {children}
            </StyledInner>
        </StyledWrapper>
    )
}

export default Content;