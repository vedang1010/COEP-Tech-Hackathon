"use client"
import React, { useState } from 'react';
import styled from 'styled-components';



const Form = () => {
//   const [formData, setFormData] = useState({
//     audience: '',
//     date: '',
//     et: '',
//     reason: '',
//     requirements: '',
//     st: '',
//     title: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission
//     console.log(formData);
//   };

  return (
    <FormContainer>
      {/* <form onSubmit={handleSubmit}>
        <Label htmlFor="audience">Audience:</Label>
        <Input
          type="text"
          id="audience"
          name="audience"
          value={formData.audience}
          onChange={handleChange}
        />

        <Label htmlFor="date">Date:</Label>
        <Input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <Label htmlFor="et">ET:</Label>
        <Input
          type="number"
          id="et"
          name="et"
          value={formData.et}
          onChange={handleChange}
        />

        <Label htmlFor="reason">Reason:</Label>
        <Input
          type="text"
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
        />

        <Label htmlFor="requirements">Requirements:</Label>
        <TextArea
          id="requirements"
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
        />

        <Label htmlFor="st">ST:</Label>
        <Input
          type="number"
          id="st"
          name="st"
          value={formData.st}
          onChange={handleChange}
        />

        <Label htmlFor="title">Title:</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <Button type="submit">Submit</Button>
      </form> */}
      jjj
    </FormContainer>
  );
};
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color:blue;
  width: 500px;
  z-index:2;
  height: 150px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;
export default Form;
