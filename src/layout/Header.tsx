import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
    padding: 20px 30px;
    width: auto;
    height: 150px;
    background: url('./images/header.jpg') no-repeat center bottom;
    background-size: cover;
`
const StyledTitle = styled.h1`
    margin-top: 52px;
    color: #fff;
    font-size: 30px;
    font-weight: bold;
`

function Header () {
    return (
        <StyledHeader>
            <StyledTitle>
                MY TODO APP
            </StyledTitle>
        </StyledHeader>
    )
}

export default Header;