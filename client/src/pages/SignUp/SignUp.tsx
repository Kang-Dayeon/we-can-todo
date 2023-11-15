import React from "react";
import {useNavigate} from "react-router-dom";
// ** Redux **
import {useDispatch} from "react-redux";
// import {signup} from "../../store/auth/authSlice";
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

function SignUp(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            name: '',
            loginId: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, 'Must be 15 characters of less')
                .required('Required'),
            loginId: Yup.string()
                .max(15, 'Must be 15 characters of less')
                .required('Required'),
            password: Yup.string()
                .max(15, 'Must be 15 characters of less')
                .required('Required'),
        }),
        onSubmit: values => {
            // dispatch(signup({
            //     name: values.name,
            //     loginId: values.loginId,
            //     password: values.password
            // }))
            navigate('/')
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
                    <Button type="submit">Sign Up</Button>
                    <Anchor link="/login">Login</Anchor>
                </form>
            </Content>
        </LayoutWrapper>
    )
}

export default SignUp