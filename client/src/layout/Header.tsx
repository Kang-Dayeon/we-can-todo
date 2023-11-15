import React, {useState} from "react";
import styled from "styled-components";
// ** Redux **
import {persist} from "../store/store";
import {logout} from "../store/auth/authSlice";
// ** Hook **
import {useAppDispatch, useAppSelector} from "../hooks/TypedUseSelector";
// ** Library **
import Moment from "react-moment";
import {useInterval} from "use-interval"
// ** Fort Awesome **
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRightFromBracket)

// ** Styled-Component **
const HeaderWrap = styled.div`
    position: relative;
    z-index: 100;
    padding: 50px 0 0;
    width: auto;
    height: 130px;
    background: transparent;
`
const TimeWrap = styled.div<{isLogin: string}>`
    display: ${(props) => (props.isLogin === 'true')? 'block' : 'none'};
`
const Time = styled.span`
    display: inline-block;
    margin-right: 5px;
    font-size: 16px;
    color: #fff;
    font-weight: normal;
`
const Title = styled.h1<{isLogin: string}>`
    position: absolute;
    bottom: 15px;
    padding: 0 20px;
    width: 100%;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #fff;
    font-size: 23px;
    font-weight: bold;
    text-align: ${(props) => (props.isLogin === 'true')? 'left' : 'center'};
`
const LogoutBtn = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px;
    font-size: 18px;
    color: #fff;
    background: transparent;
    border: none;
    border-radius: 50%;
    transition: all 0.3s;
    &:hover{
        right: 5px;
        background: #feca3c;
    }
`

function Header () {
    // state
    const isLogin = useAppSelector(state => state.auth.isLogin)
    // const userName = useAppSelector(state => state.auth.loginUser !== undefined ? state.auth.loginUser.name : undefined)
    const userName = "d"
    const [nowTime, setNowTime] = useState(Date.now())

    // hook
    const dispatch = useAppDispatch()

    // handler function
    const logoutHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(logout)
        await persist.purge();
    }

    // useInterval hook
    useInterval(() => {
        setNowTime(Date.now())
    },1000)

    return (
        <HeaderWrap>
            {isLogin ?
                <LogoutBtn onClick={logoutHandler}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket as IconProp} />
                </LogoutBtn> : <></>
            }
            <Title isLogin={isLogin.toString()}>
                {isLogin ? `What's up, ${userName}!` : 'MY TODO APP'}
                <TimeWrap isLogin={isLogin.toString()}>
                    <Time>
                        <Moment format="YY-MM-DD HH:mm">{nowTime}</Moment>
                    </Time>
                </TimeWrap>
            </Title>

        </HeaderWrap>
    )
}

export default Header;