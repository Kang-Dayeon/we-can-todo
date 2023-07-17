import React, {useEffect} from "react";
import {Routes,Route,useNavigate} from "react-router-dom";
// ** Component **
import Main from "../pages/main/Main";
import Login from "../pages/Login/Login";
// ** Hook **
import {useAppSelector} from "../hooks/TypedUseSelector";
import SignUp from "../pages/SignUp/SignUp";

const Routers = () => {
    // router
    const navigate = useNavigate()

    // state
    const isLogin = useAppSelector((state) => state.auth.isLogin)

    // function
    useEffect(() => {
        isLogin ? navigate('/') : navigate('/login')
    }, [isLogin])

    return (
        <Routes>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/sign-up" element={<SignUp/>}></Route>
        </Routes>
    )
}

export default Routers