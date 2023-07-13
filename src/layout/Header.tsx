import React from "react";
import styled from "styled-components";
import {logout} from "../store/auth/authSlice";
import {useAppDispatch} from "../hooks/TypedUseSelector";
import {persistor} from "../store/store";

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
    const dispatch = useAppDispatch()

    const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(logout)
        await persistor.purge();
    }

    return (
        <StyledHeader>
            <StyledTitle>
                MY TODO APP
            </StyledTitle>
            <button onClick={logoutHandler}>logout</button>
        </StyledHeader>
    )
}

export default Header;