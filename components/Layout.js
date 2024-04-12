"use client";
// import Header from "./Header"
// import themes from "./themes"
import styled from 'styled-components';
import { useState, createContext } from 'react';
import Navbar from './Navbar';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast-container {
    /* Customize the toast container */
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    z-index: 9999; /* Adjust z-index as needed */
  }

  .Toastify__toast {
    /* Customize individual toast styles */
    font-family: Arial, sans-serif;
    border-radius: 8px;
  }

  .Toastify__toast--success {
    /* Customize success toast styles */
    background-color: #4caf50;
    color: #ffffff;
  }

  .Toastify__toast--error {
    /* Customize error toast styles */
    background-color: #f44336;
    color: #ffffff;
  }

  /* Add more styles as needed */
`;
const Layout = ({ children }) => {
    return (
        <LayoutWrapper>
            <Navbar />
            <ToastContainer/>
            {children}
        </LayoutWrapper>
    )
}

const LayoutWrapper = styled.div`
    min-height: 100vh;
    background-color: black;
    /* background-image: ; */
`

export default Layout;
// export { App };
