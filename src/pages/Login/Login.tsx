import React, {useState} from "react";
// ** Redux **
import {useDispatch} from "react-redux";
import {login} from "../../store/auth/authSlice";
// ** Type **
import { IUser } from "../../store/auth/type";
// ** Component **
import LayoutWrapper from "../../layout/LayoutWrapper";
import Content from "../../layout/Content";
import Header from "../../layout/Header";
import InputText from "../../components/Input/InputText";
import Button from "../../components/Button/Button";
import Anchor from "../../components/Anchor/Anchor";
import axios from "axios";

function Login(){
    const dispatch = useDispatch()

    // state
    const [text, setText] = useState<IUser>({
        loginId: '',
        password: ''
    })
    const [idNull, setIdValue] = useState<boolean>(false)
    const [pwNull, setPwNull] = useState<boolean>(false)

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
        if(text.loginId !== '' && text.password !== ''){
            setIdValue(false)
            setPwNull(false)
            const body = {
                loginId: text.loginId,
                password: text.password
            }
            axios.post("http://localhost:8080/api/login", body)
                .then((res) => {
                    console.log(res.data)
                })
            console.log(window.sessionStorage.getItem('user'))
            dispatch(login(body))
        } else {
            (text.loginId === '') ? setIdValue(true) : setIdValue(false);
            (text.password === '') ? setPwNull(true) : setPwNull(false);
        }
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
                    children="아이디를 적어주세요."
                    nullValue={idNull}
                />
                <InputText
                    type="password"
                    name="password"
                    placeholder="password"
                    value={text.password}
                    onChange={onChangeInput}
                    children="비밀번호를 적어주세요."
                    nullValue={pwNull}
                />
                <Button onClick={loginHandler}>Login</Button>
                <Anchor link="/sign-up">Sign Up</Anchor>
            </Content>
        </LayoutWrapper>
    )
}

export default Login