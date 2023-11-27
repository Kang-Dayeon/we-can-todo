import React from "react";
import {useNavigate} from "react-router-dom";
// ** Redux **
import {__register} from "../../store/auth/authSlice";
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

function SignUp(){
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const isRegister = useAppSelector(state => state.auth.isRegister)

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters of less')
                .required('Required'),
            username: Yup.string()
                .max(15, 'Must be 15 characters of less')
                .required('Required'),
            password: Yup.string()
                .max(15, 'Must be 15 characters of less')
                .required('Required'),
        }),
        onSubmit: async (values) => {
        try {
            await dispatch(__register(values))
            if(isRegister){
                alert("회원가입이 완료 되었습니다🎉")
                navigate('/')
            } else {
                alert("이미 존재하는 아이디 입니다😥")
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
                        name="name"
                        placeholder="Name"
                        value={formik.values.name || ''}
                        onChange={formik.handleChange}
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <Validation>{formik.errors.name}</Validation>
                    ): null}
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
                    <Button type="submit">Sign Up</Button>
                    <Anchor link="/login-page">Login</Anchor>
                </form>
            </Content>
        </LayoutWrapper>
    )
}

export default SignUp