import React from "react";
import styled from "styled-components";

// ** Styled-Component **
const StyledWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #eee;
    color: #fff;
`

const StyledInner = styled.div`
    position: relative;
    margin: 0 auto;
    max-width: 500px;
    background-color: #fff;
`

function LayoutWrapper (props:any) {
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

export default LayoutWrapper;