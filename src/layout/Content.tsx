import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    padding: 30px;
    width: auto;
    height: 100%;
    max-height: 550px;
    background-color: #fff;
    color: #000;
`

const StyledInner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: auto;
`

function Content (props:any) {
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