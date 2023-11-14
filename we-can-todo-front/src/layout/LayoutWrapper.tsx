import React from "react";
import styled from "styled-components";

const backgroundImg = require("../assets/images/background.png")

// ** Styled-Component **
const StyledWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background-color: #260147;
    color: #fff;
`

const StyledInner = styled.div`
    position: relative;
    margin: 0 auto;
    padding: 0 15px;
    max-width: 500px;
    height: 100vh;
    background: url(${backgroundImg}) no-repeat 0 0;
    background-size: cover;
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