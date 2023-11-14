import React from "react";
import axios from "axios";
// ** Redux **
import {useDispatch} from "react-redux";
import {login} from "../../store/auth/authSlice";
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

function Login(){
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            loginId: '',
            password: ''
        },
        validationSchema: Yup.object({
            loginId: Yup.string()
                .max(15, 'Must be 15 characters of less')
                .required('Required'),
            password: Yup.string()
                .max(15, 'Must be 15 characters of less')
                .required('Required'),
        }),
        onSubmit: values => {
            axios.post("/api/login", values, {withCredentials: true})
                .then((res) => {
                    console.log(window.sessionStorage.getItem("todoInfo"))
                    // console.log(res.data)
                })

            dispatch(login({
                loginId: values.loginId,
                password: values.password
            }))
        }
    })

    return (
        <LayoutWrapper>
            <Header></Header>
            <Content>
                <form onSubmit={formik.handleSubmit}>
                    <InputText
                        type="text"
                        name="loginId"
                        placeholder="ID"
                        value={formik.values.loginId || ''}
                        onChange={formik.handleChange}
                        {...formik.getFieldProps('loginId')}
                    />
                    {formik.touched.loginId && formik.errors.loginId ? (
                        <Validation>{formik.errors.loginId}</Validation>
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