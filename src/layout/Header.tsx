import React from "react";
import styled from "styled-components";
// ** Redux **
import {persistor} from "../store/store";
import {logout} from "../store/auth/authSlice";
// ** Hook **
import {useAppDispatch, useAppSelector} from "../hooks/TypedUseSelector";
// ** Fort Awesome **
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRightFromBracket)

// ** Img **
const headerBg = require('../assets/images/header.jpg');

// ** Styled-Component **
const HeaderWrap = styled.div`
    position: relative;
    z-index: 100;
    width: auto;
    height: 150px;
    background: url(${headerBg}) no-repeat center bottom;
    background-size: cover;
`
const Title = styled.h1`
    position: absolute;
    top: 45px;
    left: 0;
    padding: 0 20px;
    width: 100%;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #fff;
    font-size: 26px;
    font-weight: bold;
`
const LogoutBtn = styled.button`
    position: absolute;
    top: 10px;
    right: 15px;
    padding: 10px;
    font-size: 18px;
    color: #fff;
    background: transparent;
    border: none;
    border-radius: 50%;
    transition: all 0.3s;
    &:hover{
        right: 10px;
        background: #3d79b1;
    }
`

function Header () {

    // state
    const isLogin = useAppSelector(state => state.auth.isLogin)
    const userName = useAppSelector(state => state.auth.loginUser !== undefined ? state.auth.loginUser.name : undefined)

    // hook
    const dispatch = useAppDispatch()

    // handler function
    const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(logout)
        await persistor.purge();
    }

    return (
        <HeaderWrap>
            {isLogin ?
                <LogoutBtn onClick={logoutHandler}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket as IconProp} />
                </LogoutBtn> : <></>
            }
            <Title>
                {isLogin ? `What's up, ${userName}!` : 'MY TODO APP'}
            </Title>
        </HeaderWrap>
    )
}

export default Header;