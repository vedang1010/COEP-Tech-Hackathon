'use client'
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/config/config';
import { useRouter } from 'next/navigation';
import { ref, getDatabase, onValue } from 'firebase/database';
import Cookies from 'js-cookie';

const SignIn = () => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [invalidLogin, setInvalidLogin] = useState(false); // State to track invalid login attempt
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      const uid = res.user.uid;
      console.log('UID:', uid);

      const userRef = ref(getDatabase(), `Users/${uid}`);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          const position = userData.position;
          console.log('Position:', position);
          Cookies.set('position', position);
          sessionStorage.setItem('user', true);

          setInvalidLogin(false); // Reset invalid login state on successful login
          router.push('/');

          router.push('/home')
        } else {
          setInvalidLogin(true);
          console.log('User data not found.');
        }
      });

      setEmail('');
      setPassword('');
      setInvalidLogin(false); // Reset invalid login state on successful login

    } catch (e) {
      console.error(e);
      setInvalidLogin(true); // Set invalid login state on failed login attempt
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Sign In</Title>
        <Input
          type="email"
          placeholder="Email"
          autoComplete="new-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {invalidLogin && <ErrorText>Invalid login credentials</ErrorText>} {/* Show error message if login is invalid */}
        <Button onClick={handleSignIn}>Sign In</Button>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1a202c;
`;

const FormContainer = styled.div`
  background-color: #2d3748;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #4a5568;
  color: #fff;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #4299e1;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3182ce;
  }
`;

const ErrorText = styled.p`
  color: #ff0000;
  margin-bottom: 0.5rem;
`;

export default SignIn;
