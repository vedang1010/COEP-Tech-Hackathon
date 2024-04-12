'use client'
import { useEffect, useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/config';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { ref, set, getDatabase, onValue } from 'firebase/database';
import Cookies from 'js-cookie';
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

  const [clubs, setClubs] = useState([]);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  
  
  const selectedClubName = Cookies.get("clubName") || null;
  const [selectedClub, setSelectedClub] = useState(`${selectedClubName}`); // Initializing with "Coep CSI Club"
  useEffect(() => {
    // Fetch clubs from the database
    const fetchClubs = async () => {
      const database = getDatabase();
      const clubsRef = ref(database, 'Clubs');
      onValue(clubsRef, (snapshot) => {
        const clubsData = [];
        snapshot.forEach((childSnapshot) => {
          clubsData.push(childSnapshot.val());
        });
        setClubs(clubsData);
      });
    };

    fetchClubs();
  }, []);


  const handleSignUp = async () => {
    try {
      if (!email || !selectedClub) {
        setError("Please fill in all fields.");
        return;
      }
  
      const database = getDatabase();
      const usersRef = ref(database, 'Users');
  
      // Fetching all users from the database
      onValue(usersRef, async (snapshot) => {
        const usersData = snapshot.val() || {};
  
        // Flag to track if user is found
        let userFound = false;
  
        // Loop through each user entry
        for (const userId in usersData) {
          const userData = usersData[userId];
  
          // Compare email address with current email
          if (userData.email === email) {
            console.log("Found");
            console.log("Position:", userData.position);
            userFound = true;
            break; // No need to continue searching if user is found
          }
        }
  
        // If user is not found in the database
        if (!userFound) {
          console.log("Not found");
        }
      });
  
      // Fetching club data outside of onValue callback
      const clubRef = ref(database, `Clubs`);
      const clubsSnapshot = await get(clubRef);
      const clubsData = clubsSnapshot.val();
  
      // Search for the club with the same name as the selected club
      const clubToUpdate = Object.values(clubsData).find(club => club.name === selectedClub);
  
      if (clubToUpdate) {
        console.log("Club to update", clubToUpdate);
        console.log("Path", `Clubs/${clubToUpdate.id}/advisor`);
  
        // Update advisor field for Faculty Advisor
        await set(ref(database, `Clubs/${clubToUpdate.id}/advisor`), email);
        console.log("Advisor email updated successfully.");
      } else {
        console.log(`Club '${selectedClub}' not found.`);
      }
  
    } catch (e) {
      console.error(e);
      setError("Sign up failed. Please try again.");
    }
  };
  



  return (
    <Container>
      <SignUpForm>
        <Title>Change Faculty Advisor</Title>
        <Input
          type="email"
          placeholder="Enter Email of Faculty."
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          value={selectedClub}
          disabled
        />
        <Button onClick={handleSignUp}>Update</Button>
      </SignUpForm>
    </Container>
  );
};

export default SignUpPage;
