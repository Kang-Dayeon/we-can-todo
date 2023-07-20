import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
// ** Redux **
import {useDispatch} from "react-redux";
import {signup} from "../../store/auth/authSlice";
// ** Hook **
import {useAppSelector} from "../../hooks/TypedUseSelector";
// ** Type **
import {ISignUp} from "../../store/auth/type";
// ** Component **
import LayoutWrapper from "../../layout/LayoutWrapper";
import Content from "../../layout/Content";
import Header from "../../layout/Header";
import InputText from "../../components/Input/InputText";
import Button from "../../components/Button/Button";
import Anchor from "../../components/Anchor/Anchor";

function SignUp(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // state
    const userList = useAppSelector(state => state.auth.userList)
    const [idNull, setIdValue] = useState<boolean>(false)
    const [pwNull, setPwNull] = useState<boolean>(false)
    const [nameNull, setNameValue] = useState<boolean>(false)
    const [text, setText] = useState<ISignUp>({
        name:'',
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

    const signUpHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if(text.loginId !== '' && text.password !== '' && text.name){
            setNameValue(false)
            setIdValue(false)
            setPwNull(false)
            dispatch(
                signup({
                    name: text.name,
                    loginId: text.loginId,
                    password: text.password
                })
            )
            navigate('/')
        } else {

            (text.loginId === '') ? setIdValue(true) : setIdValue(false);
            (text.password === '') ? setPwNull(true) : setPwNull(false);
            (text.name === '') ? setNameValue(true) : setNameValue(false);
        }
    }

    return (
        <LayoutWrapper>
            <Header></Header>
            <Content>
                <InputText
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={text.name}
                    onChange={onChangeInput}
                    children="이름을 적어주세요."
                    nullValue={nameNull}
                />
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
                <Button onClick={signUpHandler}>Sign Up</Button>
                <Anchor link="/login">Login</Anchor>
            </Content>
        </LayoutWrapper>
    )
}

export default SignUp