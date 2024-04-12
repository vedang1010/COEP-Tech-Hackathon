"use client";
// import React from 'react'
import { useState } from "react";
import { styled } from "styled-components";
// import BookingList from "./VenueList"
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [displayReq, setDisplayReq] = useState(true); // Boolean state variable

  const handlePageChange = () => {
    router.push("/venuelist");
  };
  const handleDisplayChange = () => {
    router.push("/request");
  };
  const handleHomeChange = () => {
    router.push("/home");
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        router.push("/sign-in"); // Redirect to the sign-up page after signing out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        // Handle sign-out error
      });
  };
  //    const display_req=true;

  return (
    <NavbarContainer>
      <VenueListButton onClick={handleHomeChange}>Home</VenueListButton>
      <VenueListButton onClick={handleDisplayChange}>Request </VenueListButton>
      <VenueListButton onClick={handlePageChange}>Venue</VenueListButton>
      <LogoutButton onClick={handleSignOut}>Log out</LogoutButton>
    </NavbarContainer>
  );
};
const VenueListButton = styled.button`
  margin: 50px;
  width: 250px;
  height: 50px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 20px;

  &:hover {
    color: red; /* Change text color to red on hover */
}
`;
const NavbarContainer = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: black;
  display: flex;
  justify-content: flex-end;
  /* justify-content: center; */
  align-items: center;
  color: black;
`;
const LogoutButton = styled.button`
  padding: 1em 2em;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
  transition: background-color 0.3s;
  margin: 2rem;
  &:hover {
    background-color: #ff7875;
  }
`;
export default Navbar;
