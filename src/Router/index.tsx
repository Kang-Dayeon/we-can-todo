import React, {useEffect} from "react";
import {Routes,Route,useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Main from "../pages/main/Main";
import Login from "../pages/Login/Login";
import {RootReducer} from "../store/rootReducer";

const Routers = () => {
    const navigate = useNavigate()
    const isLogin = useSelector((state: RootReducer) => state.auth.isLogin)

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