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
  const [selectedClub, setSelectedClub] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [clubs, setClubs] = useState([]);
  const [venues, setVenues] = useState([]);
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();


  useEffect(() => {
    // Fetch clubs and venues from the database
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

    const fetchVenues = async () => {
      console.log("fetching venues");
      const database = getDatabase();
      const venuesRef = ref(database, 'Venue'); // Corrected 'Venues' instead of 'Venue'
    
      onValue(venuesRef, (snapshot) => {
        const venuesData = [];
        snapshot.forEach((childSnapshot) => {
         
          venuesData.push(childSnapshot.val());
        });
        setVenues(venuesData);
      });
    };
    

    fetchClubs();
    fetchVenues();
  }, []);
  const handleSignUp = async () => {
    try {
      if (!email || !password || !selectedPosition || 
        (selectedPosition === 'Faculty Advisor' && !selectedClub) ||
        (selectedPosition === 'Club Member' && !selectedClub) ||
        (selectedPosition === 'Venue In Charge' && !selectedVenue)) {
          setError("Please fill in all fields.");
          return;
      }
  
      const res = await createUserWithEmailAndPassword(email, password);
      if (!res) {
        setError("Sign up failed. Please try again.");
        return;
      }
  
      console.log({ res });
      sessionStorage.setItem('user', true);
      setEmail('');
      setPassword('');
      const userId = res.user.uid;
  
      const database = getDatabase();
      const userRef = ref(database, `Users/${userId}`);
  
      // Fetch existing user data
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val() || {};
      console.log("Existing user data:", userData);
  
      // Merge existing user data with new position
      const updatedUserData = {
        ...userData,
        position: selectedPosition,
        email:email,
      };
      console.log("Updated user data:", updatedUserData);
  
      // Update user data
      await set(userRef, updatedUserData);
      console.log("User data updated successfully.");
  
      // Update club data if applicable
      if (selectedClub) {
        const clubRef = ref(database, `Clubs`);
        const clubsSnapshot = await get(clubRef);
        const clubsData = clubsSnapshot.val();
  
        // Search for the club with the same name as the selected club
        const clubToUpdate = Object.values(clubsData).find(club => club.name === selectedClub);
  
        if (clubToUpdate) {
          if (selectedPosition === 'Faculty Advisor') {
            console.log("club to update",clubToUpdate);

            console.log("path",`Clubs/${clubToUpdate.id}/advisor`);

            // Update advisor field for Faculty Advisor
            await set(ref(database, `Clubs/${clubToUpdate.id}/advisor`), email);
            console.log("Advisor email updated successfully.");
          } else if (selectedPosition === 'Club Member') {
            // Update email field for Club Member
            await set(ref(database, `Clubs/${clubToUpdate.id}/email`), email);
            console.log("Email updated successfully for Club Member.");
          }
        } else {
          console.log(`Club '${selectedClub}' not found.`);
        }
      }
      if (selectedVenue) {
        const venueRef = ref(database, `Venue`);
        const venuesSnapshot = await get(venueRef);
        const venuesData = venuesSnapshot.val();
      
        // Search for the venue with the same name as the selected venue
        const venueToUpdate = Object.values(venuesData).find(venue => venue.name === selectedVenue);
      
        if (venueToUpdate) {
          // Update in charge field for Venue In Charge
          await set(ref(database, `Venue/${venueToUpdate.name}/incharge`), email);
          console.log("In charge email updated successfully.");
        } else {
          console.log(`Venue '${selectedVenue}' not found.`);
        }
      }
      
      router.push('/sign-in');
    } catch (e) {
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
        <Select value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)}>
          <Option value="">Select Position</Option>
          {positionOptions.map((position) => (
            <Option key={position} value={position}>
              {position}
            </Option>
          ))}
        </Select>
        {selectedPosition === 'Faculty Advisor' && (
          <Select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)}>
            <Option value="">Select Club</Option>
            {clubs.map((club) => (
              <Option key={club.name} value={club.name}>
                {club.name}
              </Option>
            ))}
          </Select>
        )}

        {selectedPosition === 'Club Member' && (
          <Select value={selectedClub} onChange={(e) => setSelectedClub(e.target.value)}>
            <Option value="">Select Club</Option>
            {clubs.map((club) => (
              <Option key={club.name} value={club.name}>
                {club.name}
              </Option>
            ))}
          </Select>
        )}
        {selectedPosition === 'Venue In Charge' && (
          <Select value={selectedVenue} onChange={(e) => setSelectedVenue(e.target.value)}>
            <Option value="">Select Venue</Option>
            {venues.map((venue) => (
              <Option key={venue.name} value={venue.name}>
                {venue.name}
              </Option>
            ))}
          </Select>
        )}
        <Button onClick={handleSignUp}>Sign Up</Button>
      </SignUpForm>
    </Container>
  );
};

export default SignUpPage;
