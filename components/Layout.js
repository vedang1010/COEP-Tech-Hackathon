"use client";
// import Header from "./Header"
// import themes from "./themes"
import styled from 'styled-components';
import { useState, createContext } from 'react';
import Navbar from './Navbar';
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css'

const Layout = ({ children }) => {
    return (
        <LayoutWrapper>
            <Navbar />
            {children}
        </LayoutWrapper>
    )
}

const LayoutWrapper = styled.div`
    min-height: 100vh;
    background-color: blue;
    /* background-image: ; */
    color:green;
`

export default Layout;
// export { App };
