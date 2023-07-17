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

function SignUp(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // state
    const userList = useAppSelector(state => state.auth.userList)
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
        if (text.name === ''){
            alert("이름을 입력해주세요.")
        } else if(text.loginId === ''){
            alert("아이디를 입력해 주세요.")
        } else if (text.password === ''){
            alert("비밀번호를 입력해주세요.")
        } else if(userList.some(user => user.loginId === text.loginId)){
            alert("이미 사용중인 아이디 입니다.")
        } else {
            dispatch(
                signup({
                    name: text.name,
                    loginId: text.loginId,
                    password: text.password
                })
            )
            navigate('/')
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
                />
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
                <Button onClick={signUpHandler}>Sign Up</Button>
            </Content>
        </LayoutWrapper>
    )
}

export default SignUp