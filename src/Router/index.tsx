import React, {useEffect} from "react";
import {Routes,Route,useNavigate} from "react-router-dom";
import Main from "../pages/main/Main";
import Login from "../pages/Login/Login";
import {useAppSelector} from "../hooks/TypedUseSelector";

const Routers = () => {
    const navigate = useNavigate()
    const isLogin = useAppSelector((state) => state.auth.isLogin)

    useEffect(() => {
        isLogin ? navigate('/') : navigate('/login')
    }, [isLogin])

    return (
        <Routes>
            <Route path="/" element={<Main/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>
    )
}

export default Routers