"use client"
import React from 'react'
import { styled } from "styled-components"

function ActForm() {
    return (
        <Container>
      <FormContainer>
        <Title>Meeting Form</Title>
        <form>
          <FormGroup>
            <Label>Date:</Label>
            <Input type="date" name="date" />
          </FormGroup>
          <FormGroup>
            <Label>Start Time:</Label>
            <Input type="time" name="startTime" />
          </FormGroup>
          <FormGroup>
            <Label>End Time:</Label>
            <Input type="time" name="endTime" />
          </FormGroup>
          <FormGroup>
            <Label>Title:</Label>
            <Input type="text" name="title" />
          </FormGroup>
          <FormGroup>
            <Label>Reason:</Label>
            <Input type="text" name="reason" />
          </FormGroup>
          <FormGroup>
            <Label>Venue:</Label>
            <Input type="text" name="venue" />
          </FormGroup>
          <FormGroup>
            <Label>Audience:</Label>
            <Input type="text" name="audience" />
          </FormGroup>
          <FormGroup>
            <Label>Requirements:</Label>
            <TextArea name="requirements" rows="4" />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </form>
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
  background-color: #1a202c;
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

export default ActForm
