import React, {useState} from "react";
// ** Redux **
import {useDispatch} from "react-redux";
import {login} from "../../store/auth/authSlice";
// ** Type **
import {ILogin} from "../../store/auth/type";
// ** Component **
import LayoutWrapper from "../../layout/LayoutWrapper";
import Content from "../../layout/Content";
import Header from "../../layout/Header";
import InputText from "../../components/Input/InputText";
import Button from "../../components/Button/Button";

function Login(){
    const dispatch = useDispatch()

    // state
    const [text, setText] = useState<ILogin>({
        loginId: '',
        password: ''
    })

    // handler function
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target;
        setText({
            ...text,
            [name]: value
        })
    }

    const loginHandler = (e: React.MouseEvent<HTMLElement>) => {
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
            <Header></Header>
            <Content>
                <InputText
                    type="text"
                    name="loginId"
                    placeholder="ID"
                    value={text.loginId}
                    onChange={onChangeInput}
                />
                <InputText
                    type="password"
                    name="password"
                    placeholder="password"
                    value={text.password}
                    onChange={onChangeInput}
                />
                <Button onClick={loginHandler}>Login</Button>
            </Content>
        </LayoutWrapper>
    )
}

export default Login