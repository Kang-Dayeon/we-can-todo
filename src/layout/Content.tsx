import React from "react";
import styled from "styled-components";

// ** Styled-Component **
const StyledWrapper = styled.div`
    padding: 30px;
    width: auto;
    height: calc(100vh - 150px);
    background-color: #fff;
    color: #000;
    overflow-x: hidden;
    overflow-y: scroll;
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