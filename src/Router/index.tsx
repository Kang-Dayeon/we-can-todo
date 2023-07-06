import React from "react";
import {Routes,Route} from "react-router-dom";
import Main from "../pages/main/Main";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Main/>}></Route>
        </Routes>
    )
}

export default Routers