import React from "react";
import styled from "styled-components";

const headerBg = require('../assets/images/header.jpg');

const StyledHeader = styled.div`
    z-index: 100;
    padding: 20px 30px;
    width: auto;
    height: 150px;
    background: url(${headerBg}) no-repeat center bottom;
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