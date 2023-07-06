import React, {useState} from "react";
import LayoutWrapper from "../../layout/LayoutWrapper";
import Content from "../../layout/Content";
// import useInput from "../../hooks/useInput";
import {useDispatch} from "react-redux";
import {login} from "../../store/auth/authSlice";
import {ILogin} from "../../store/auth/type";

function Login(){
    const dispatch = useDispatch()

    const [text, setText] = useState<ILogin>({
        loginId: '',
        password: ''
    })

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setText({
            ...text,
            [name]: value
        })
    }

    const loginAction = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        dispatch(
            login({
                loginId: text.loginId,
                password: text.password
            })
        )
    }

    return (
        <LayoutWrapper>
            <Content>
                <input type="text" name="loginId" value={text.loginId} onChange={onChangeInput}/>
                <input type="password" name="password" value={text.password} onChange={onChangeInput}/>
                <button onClick={loginAction}>Login</button>
            </Content>
        </LayoutWrapper>
    )
}

export default Login