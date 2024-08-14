import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const CustomerLayout = ()=>{
    return(
        <>
        <Header/>
        <Outlet/>
        </>
    )
}

export default CustomerLayout;