'use client';
import { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/config'; // Assuming db is your Firebase database instance
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { ref, set, getDatabase, onValue } from 'firebase/database';


// Import `ref` and `set` from the Firebase Realtime Database module
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

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #444;
  border: none;
  border-radius: 4px;
  color: #fff;
  outline: none;
`;

const Option = styled.option`
  background-color: #444;
  color: #fff;
`;

const SignUpPage = () => {
  const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [positionOptions, setPositionOptions] = useState([
        'Faculty',
        'Club Member',
        'Faculty Advisor',
        'Admin',
        'Venue In Charge',
    ]);
    const [selectedPosition, setSelectedPosition] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignUp = async () => {
        try {
          const res = await createUserWithEmailAndPassword(email, password);
          console.log({ res });
          sessionStorage.setItem('user', true);
          setEmail('');
          setPassword('');
          var idd = res.user.uid;
          console.log(idd);
          if (selectedPosition) {
            const database = getDatabase(); 
      
            const reference = ref(database, `Users`);
            console.log(reference);
            const reference2 = ref(database, `Users/` + idd);

            console.log(reference2);

            set(reference2, {
              position: selectedPosition,
            });
          }
      
          router.push('/sign-in');
        } catch (e) {
          console.error(e);
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
                <Select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
                    <Option value="">Select Position</Option>
                    {positionOptions.map((position, index) => (
                        <Option key={index} value={position}>
                            {position}
                        </Option>
                    ))}
                </Select>
                <Button onClick={handleSignUp}>Sign Up</Button>
            </SignUpForm>
        </Container>
    );
};

export default SignUpPage;
