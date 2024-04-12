"use client"
import React from 'react'
import { useEffect, useState } from 'react';
import { styled } from "styled-components"
import app from "../config/config"
import { ref, set, getDatabase, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function ActForm() {
    const [date, setdate] = useState('');
    const [start_time,setstart_time] = useState('');
    const [end_time, setend_time] = useState('');
    const [title, settitle] = useState('');
    const [reason, setreason] = useState('');
    const [venue, setvenue] = useState('');
    const [audience, setaudience] = useState('');
    const [requirements, setrequirements] = useState('');
    const createChannel = (
      clubEmail,
      facultyAdvisorEmail,
      venueInchargeEmail
    ) => {
      try {
        console.log("Creating channel now inside enters");
        console.log(`${clubEmail}_${facultyAdvisorEmail}_${venueInchargeEmail}`);
        const temp = `${clubEmail}_${facultyAdvisorEmail}_${venueInchargeEmail}`;
        const channelKey = temp.replace(/[.@_]/g, '');
        console.log("new keyyyy "+ channelKey)
        // const channelKey = `${clubEmail}_${facultyAdvisorEmail}_${venueInchargeEmail}`;
        const database = getDatabase(app);
        console.log("kahskfj Channels/" + channelKey);
        const channelRef = ref(database, `Channels/${channelKey}`);
        console.log("Channel ref:", channelRef);
        console.log("Channel key:", channelKey);
  
        set(channelRef, {
          clubEmail,
          facultyAdvisorEmail,
          venueInchargeEmail,
          // members: {
          //   [facultyAdvisorEmail]: true, // Set faculty advisor as a member
          //   [venueInchargeEmail]: true, // Set venue incharge as a member
          // },
        })
          .then(() => {
            console.log("Channel created successfully.");
          })
          .catch((error) => {
            console.error("Error creating channel:", error);
          });
      } catch (error) {
        console.error("Error creating channel:", error);
      }
    };
    const handle_req_submit = () => {
        try {
        console.log(date);
        console.log(start_time);

        var idd = date+start_time+end_time;
        const database = getDatabase(app); 
      
            const reference = ref(database, "Requests");
            // console.log(reference);
            const reference2 = ref(database, "Requests/" + idd);

      console.log(reference2);

            set(reference2, {
                date: date,
                start_time:start_time,
                end_time: end_time,
                title:title,
                reason:reason,
                venue:venue,
                audience:audience,
                requirements:requirements,
                status:'pending'
            });

      console.log("Creating channel now entering");
      createChannel(clubEmail, facultyAdvisorEmail, venueInchargeEmail);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container>
      <FormContainer>
        <Title>Meeting Form</Title>
        <FormGroup>
          <Label>Date:</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Start Time:</Label>
          <Input
            type="time"
            value={start_time}
            onChange={(e) => setstart_time(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>End Time:</Label>
          <Input
            type="time"
            value={end_time}
            onChange={(e) => setend_time(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Reason:</Label>
          <Input
            type="text"
            value={reason}
            onChange={(e) => setreason(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Venue:</Label>
          <Select
            value={venue}
            onChange={(e) => setvenue(e.target.value)}
            required
          >
            <option value="">Select Venue</option>
            <option value="Cogni">Cognizant Lab</option>
            <option value="Main Auditorium">Main Auditorium</option>
            <option value="Mini Auditorium">Mini Auditorium</option>
            <option value="Hostel Ground">Hostel Ground</option>
            {/* Add more options as needed */}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Audience:</Label>
          <Select
            value={venue}
            onChange={(e) => setaudience(e.target.value)}
            required
          >
            <option value="">Select Audience</option>
            <option value="College students">College students</option>
            <option value="Outside college">Outside college</option>
            <option value="Both college and outsiders">
              Both college and outsiders
            </option>
            {/* Add more options as needed */}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Requirements:</Label>
          <TextArea
            //   name="requirements"
            rows="4"
            value={requirements}
            onChange={(e) => setrequirements(e.target.value)}
            required
          />
        </FormGroup>
        <Button onClick={handle_req_submit} type="submit">
          Submit
        </Button>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  /* min-width: 150vw; */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  margin-top:1rem;
  margin-bottom:1rem;
`;

const FormContainer = styled.div`
  max-width: 500px;
  min-width: 500px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  /* margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  font-family: Arial, sans-serif; */

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

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: black;
`;

const Input = styled.input`
  /* width: 100%;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #ccc;
  box-sizing: border-box; */

  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #4a5568;
  color: #fff;
`;

const TextArea = styled.textarea`
  width: 100%;
  /* padding: 8px;
  border-radius: 3px;
  border: 1px solid #ccc;
  box-sizing: border-box; */

  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #4a5568;
  color: #fff;
`;

const Button = styled.button`
  /* background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 3px;
  border: none;
  cursor: pointer; */

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

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #4a5568;
  color: #fff;
`;

// const VenueListButton = styled.button`
//     margin: 50px;
//     width: 250px;
//     height: 50px;
//     border-radius: 8px;
//     cursor: pointer;
// `
// const NavbarContainer = styled.div`
//     width: 100vw;
//     height: 10vh;
//     background-color: aquamarine;
//     display: flex;
//     justify-content: flex-end;
//     /* justify-content: center; */
//     align-items: center;
//     color: black;
// `

export default ActForm;
