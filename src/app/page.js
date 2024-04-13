'use client'

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import Cookies from "js-cookie";
import { getAuth } from "firebase/auth";
import CustomErrorBoundary from "./ErrorBoundary/ErrorBoundary";
// import { useRouter } from 'next/router';
const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 3rem;
`;

const LogoutButton = styled.button`
  padding: 1rem 2rem;
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ff7875;
  }
`;

const Home = ({ user }) => {
  const router = useRouter();

  // Retrieve position from cookies, default to null
  const position = Cookies.get("position") || null;

  useEffect(() => {
    const userSession = sessionStorage.getItem("user");
    if (!user && !userSession) {
      router.push("/sign-in");
    }
  }, [user, router]);



  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem('user');
        router.push('/sign-in'); // Redirect to the sign-up page after signing out
      })
      .catch((error) => {
        console.error('Error signing out:', error);
        // Handle sign-out error
      });
  };
  return (
    <Container>
      <h1>Welcome Home!</h1>
      <p>Your position: {position}</p>
      <LogoutButton onClick={handleSignOut}>Log out</LogoutButton>
    </Container>
  );
}

Home.getInitialProps = async () => {
  try {
    const auth = getAuth();
    const [user] = useAuthState(auth);
    console.log(user)
    return { user };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { user: null };
  }
}

export default Home;
