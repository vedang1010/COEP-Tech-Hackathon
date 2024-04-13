"use client";
// import React from 'react'
import { useState,useEffect } from "react";
import { styled } from "styled-components";
// import BookingList from "./VenueList"
import Cookies from "js-cookie";
import {} from '../src/app/config/config'
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import dynamic from 'next/dynamic'

const Navbar = ({ user }) => {

  const router = useRouter();
  useEffect(() => {
    const userSession = sessionStorage.getItem("user");
    if (!user && !userSession) {
      router.push("/sign-in");
    }
  }, [user, router]);

  const position = Cookies.get("position") || null;
  console.log(position)
  // const router = useRouter();
  const [displayReq, setDisplayReq] = useState(true); // Boolean state variable
const auth=getAuth()
  const handlePageChange = () => {
    router.push("/venuelist");
  };
  const handleDisplayChange = () => {
    router.push("/request");
  };
  const handleDisplayIncharge = () => {
    router.push("/incharge");
  };
  const handleDisplayFaculty = () => {
    router.push("/facultyAdvisor");
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


      {/* <VenueListButton onClick={handleDisplayIncharge}>Approve Locations</VenueListButton>
      <VenueListButton onClick={handleDisplayFaculty}>Approve Requests</VenueListButton>
      <VenueListButton onClick={handleDisplayChange}>Request</VenueListButton>
 */}

      {
         typeof window !== 'undefined' &&
        (position === "Venue In Charge" ? (
          <VenueListButton onClick={handleDisplayIncharge}>Approve Locations</VenueListButton>
        ) : position === "Faculty Advisor" ? (
          <VenueListButton onClick={handleDisplayFaculty}>Approve Requests</VenueListButton>
        ) : (
          <VenueListButton onClick={handleDisplayChange}>Request</VenueListButton>
        ))
      }
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
  color: #fff;
  font-weight: bold;
  font-size: 20px;

  &:hover {
    color: #000; /* Change text color to red on hover */
}
`;
const NavbarContainer = styled.div`
  width: 100vw;
  height: 10vh;
  background-color: #B11000;
  display: flex;
  justify-content: flex-end;
  /* justify-content: center; */
  align-items: center;
  color: black;
`;
const LogoutButton = styled.button`
  padding: 1em 2em;
  background-color: #B11000;
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
// export default Navbar;
export default dynamic(()=>Promise.resolve(Navbar),{ssr:false});
