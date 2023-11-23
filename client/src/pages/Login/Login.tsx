import React from "react";
// ** Redux **
import {__login} from "../../store/auth/authSlice";
// ** Component **
import LayoutWrapper from "../../layout/LayoutWrapper";
import Content from "../../layout/Content";
import Header from "../../layout/Header";
import InputText from "../../components/Input/InputText";
import Button from "../../components/Button/Button";
import Anchor from "../../components/Anchor/Anchor";
import Validation from "../../components/Validation/Validation";
// ** Library **
import {useFormik} from "formik";
import * as Yup from 'yup';
// ** Hook **
import {useAppDispatch, useAppSelector} from "../../hooks/TypedUseSelector";


function Login(){
    const dispatch = useAppDispatch()

    const isLogin = useAppSelector(state => state.auth.isLogin)
    const isUsername = useAppSelector(state => state.auth.username)

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Must be 15 characters of less')
                .required('Required'),
            password: Yup.string()
                .max(15, 'Must be 15 characters of less')
                .required('Required'),
        }),
        onSubmit: async values => {
            try {
                await dispatch(__login(values))
                if(!isLogin){
                    if(isUsername !== '' && !isLogin){
                        console.log(isLogin)
                        alert("비밀번호가 일치하지 않습니다!")
                    } else if(isUsername === '' && !isLogin){
                        console.log(isLogin)
                        alert("아이디가 일치하지 않습니다!")
                    }
                }
            } catch (err){
                console.log(err)
            }
        }
    })

    return (
        <LayoutWrapper>
            <Header></Header>
            <Content>
                <form onSubmit={formik.handleSubmit}>
                    <InputText
                        type="text"
                        name="username"
                        placeholder="ID"
                        value={formik.values.username || ''}
                        onChange={formik.handleChange}
                        {...formik.getFieldProps('username')}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <Validation>{formik.errors.username}</Validation>
                    ): null}
                    <InputText
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formik.values.password || ''}
                        onChange={formik.handleChange}
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <Validation>{formik.errors.password}</Validation>
                    ): null}
                    <Button type="submit">Login</Button>
                    <Anchor link="/sign-up">Sign Up</Anchor>
                </form>
            </Content>
        </LayoutWrapper>
    )
}

export default Login