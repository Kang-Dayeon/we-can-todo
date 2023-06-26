import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #eee;
    color: #fff;
`

const StyledInner = styled.div`
    margin: 0 auto;
    max-width: 500px;
    height: 100%;
    background-color: #fff;
`

function LayoutWrapper (props:any) {
    const {children} = props
    return (
        <StyledWrapper>
            <StyledInner>
                {children}
            </StyledInner>
        </StyledWrapper>
    )
}

export default LayoutWrapper;