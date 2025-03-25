import React from 'react';
import {Outlet} from 'react-router'
import Nav from "./Components/Header/Nav"
import Footer from "./Components/Footer/Footer"


function Root(){
    return(
        <>

        <Nav/>
        <Outlet/>
        <Footer/>
        
        </>
    )
}


export default Root;
