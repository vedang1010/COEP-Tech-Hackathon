'use client'
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/config/config";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import styled from "styled-components";
import Cookies from "js-cookie";

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

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  // Retrieve position from cookies, default to null
  const position = Cookies.get("position") || null;

  useEffect(() => {
    const userSession = sessionStorage.getItem("user");
    if (!user && !userSession && !loading) {
      router.push("/sign-in");
    }
  }, [user, loading, router]);

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

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while the user is being fetched
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Show an error state if there was an error
  }

  return (
    <Container>
      <h1>Welcome Home!</h1>
      <p>Your position: {position}</p>
      <LogoutButton onClick={handleSignOut}>Log out</LogoutButton>
    </Container>
  );
};

export default dynamic(() => Promise.resolve(Home), { ssr: false });
