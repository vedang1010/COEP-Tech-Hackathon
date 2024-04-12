"use client"
// import React from 'react'

import { styled } from "styled-components"
// import BookingList from "./VenueList"
import { useRouter } from "next/navigation"

const Navbar = () => {
    const router = useRouter();
    const handlePageChange = () => {
        router.push('/venuelist')
    }
   

    return (
        <NavbarContainer>
                <VenueListButton onClick={ handlePageChange}>Venue</VenueListButton>
         
        </NavbarContainer>
    )
}
const VenueListButton = styled.button`
    margin: 50px;
    width: 250px;
    height: 50px;
    border-radius: 8px;
    cursor: pointer;
`
const NavbarContainer = styled.div`
    width: 100vw;
    height: 10vh;
    background-color: aquamarine;
    display: flex;
    justify-content: flex-end;
    /* justify-content: center; */
    align-items: center;
    color: black;
`

export default Navbar
