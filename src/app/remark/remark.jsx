import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDatabase, ref, push } from 'firebase/database';

const Container = styled.div`
  display: flex;
  justify-content: center;
  // align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  padding: 20px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const Button = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const RemarksList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RemarkItem = styled.li`
  background-color: black;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Remarks = ({ currentUser, club }) => {
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState('');




  useEffect(() => {
    const savedRemarks = localStorage.getItem('remarks');
  
    const fetchRemarks = async () => {
      try {
        const db = getDatabase();
        const remarkRef = ref(db, 'Remark');
        const snapshot = await remarkRef.once('value');
        const remarksData = snapshot.val();
        if (remarksData) {
          const remarksArray = Object.keys(remarksData).map(key => ({
            id: key,
            message: remarksData[key].message,
          }));
          localStorage.setItem('remarks', JSON.stringify(remarksArray));
          setRemarks(remarksArray);
        }
      } catch (error) {
        console.error('Error fetching remarks:', error);
      }
    };
  
    // Attempt to load remarks from localStorage first
    if (savedRemarks) {
      setRemarks(JSON.parse(savedRemarks));
    } else {
      fetchRemarks();
    }
  }, []);
  

  const handleNewRemarkChange = (event) => {
    setNewRemark(event.target.value);
  };

  const handleCreateRemark = async () => {
    try {
      if (newRemark.trim() === '') {
        return;
      }

      const db = getDatabase();
      const remarkRef = ref(db, 'Remark');
      const newRemarkRef = await push(remarkRef, {
        message: newRemark,
      });

      // Update the remarks state with the new remark
      setRemarks(prevRemarks => [
        ...prevRemarks,
        {
          id: newRemarkRef.key,
          message: newRemark,
        }
      ]);

      setNewRemark('');
    } catch (error) {
      console.error('Error creating remark:', error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Heading>Write Remark</Heading>
        <Textarea
          value={newRemark}
          onChange={handleNewRemarkChange}
          placeholder="Type your remark here..."
        />
        <Button onClick={handleCreateRemark}>Send Remark</Button>
        <Heading>All Remarks</Heading>
        <RemarksList>
          {remarks.map(remark => (
            <RemarkItem key={remark.id}>{remark.message}</RemarkItem>
          ))}
        </RemarksList>
      </Wrapper>
    </Container>
  );
};

export default Remarks;
