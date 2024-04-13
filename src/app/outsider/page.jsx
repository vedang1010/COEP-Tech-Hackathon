'use client'
import { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/config';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { ref, set, getDatabase, onValue } from 'firebase/database';

import { get } from 'firebase/database';
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #212121;
`;

const SignUpForm = styled.div`
  background-color: #333;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #444;
  border: none;
  border-radius: 4px;
  color: #fff;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #5f3dc4;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4d2d9e;
  }
`;

const SignUpPage = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clubName, setClubName] = useState('');
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const handleSignUp = async () => {
    try {
      if (!email || !password || !clubName) {
        console.log("incompelte");
        setError("Please fill in all fields.");
        return;
      }
  
      const res = await createUserWithEmailAndPassword(email, password);
      if (!res) {
        console.log("sign up failed");

        setError("Sign up failed. Please try again.");
        return;
      }

      console.log("created entry ",res);
  
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');
      setClubName('');
      
      // var endpoint
      const database = getDatabase();
      console.log("adding entry in users table",`Users/${res.user.uid}`);
      // Create entry in Users table
      const userRef = ref(database, `Users/${res.user.uid}`);

      await set(userRef, {
        email: email,
        position: 'Outsider',
      });

      console.log("added entry in users table",`Users/${res.user.uid}`);
      
      // Create entry in Outsider table
      const clubRef = ref(database, `outsider/${clubName}`);
      await set(clubRef, {
        email: email,
        advisor: 'vc@gmail.com',
        name: clubName,
        // id: email,
      });
  
      router.push('/sign-in');
    } 
    catch (e) {
      console.log("intial error");
      console.error(e);
      setError("Sign up failed. Please try again.");
    }
  };
  
  return (
    <Container>
      <SignUpForm>
        <Title>Sign Up</Title>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Club Name"
          value={clubName}
          autoComplete="off"
          onChange={(e) => setClubName(e.target.value)}
        />
        <Button onClick={handleSignUp}>Sign Up</Button>
      </SignUpForm>
    </Container>
  );
};

export default SignUpPage;
