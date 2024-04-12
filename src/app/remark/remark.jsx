// // import { app } from "../config/con//fig"
// import { app } from "../../../config/config";
// import { useState, useEffect } from 'react';
// import { getDatabase, ref, push, serverTimestamp } from 'firebase/database';

// const Remarks = ({ currentUser, club }) => {
//   const [remarks, setRemarks] = useState([]);
//   const [newRemark, setNewRemark] = useState('');

//   useEffect(() => {
//     const fetchRemarks = async () => {
//       try {
//         // Get a reference to the Firebase database
//         const db = getDatabase(app);

//         // Reference to the "Remark" node in Firebase
//         const remarkRef = ref(db, 'Remark');

//         // Fetch remarks from Firebase
//         const snapshot = await push(remarkRef, 'value');
//         const remarksData = snapshot.val();

//         // Convert remarksData to an array of remarks
//         if (remarksData) {
//           const remarksArray = Object.keys(remarksData).map(key => ({
//             id: key,
//             message: remarksData[key].message, // Adjusted to match your database structure
//             incharge: remarksData[key].incharge, // Adjusted to match your database structure
//             advisor: remarksData[key].advisor // Adjusted to match your database structure
//           }));
//           setRemarks(remarksArray);
//         }
//       } catch (error) {
//         console.error('Error fetching remarks:', error);
//       }
//     };

//     // Call the fetchRemarks function
//     fetchRemarks();

//     // Clean up function to remove Firebase listener
//     return () => {
//       // No cleanup needed for this effect
//     };
//   }, []);

//   const handleNewRemarkChange = (event) => {
//     setNewRemark(event.target.value);
//   };

//   const handleCreateRemark = async () => {
//     try {
//       if (newRemark.trim() === '') {
//         return; // Don't create empty remarks
//       }
  
//       // Get a reference to the Firebase database
//       const db = getDatabase();
  
//       // Reference to the "Remark" node in Firebase
//       const remarkRef = ref(db, 'Remark');
  
//       // Push a new remark to the Firebase database
//       await push(remarkRef, {
//         message: newRemark,
//       });
  
//       // Clear the input field after creating the remark
//       setNewRemark('');
//     } catch (error) {
//       console.error('Error creating remark:', error);
//     }
//   };
  

//   return (
//     <div>
//       <h2>Remarks</h2>
//       <ul>
//         {remarks.map(remark => (
//           <li key={remark.id}>
//             {/* <strong>Incharge: </strong>{remark.incharge} | <strong>Advisor: </strong>{remark.advisor}<br /> */}
//             {remark.message}
//           </li>
//         ))}
//       </ul>
//       <div>
//         <textarea value={newRemark} onChange={handleNewRemarkChange} />
//         <button onClick={handleCreateRemark}>Send Remark</button>
//       </div>
//     </div>
//   );
// };

// export default Remarks;


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

  // useEffect(() => {
  //   const fetchRemarks = async () => {
  //     try {
  //       const db = getDatabase();
  //       const remarkRef = ref(db, 'Remark');
  //       const snapshot = await remarkRef.once('value');
  //       const remarksData = snapshot.val();
  //       if (remarksData) {
  //         const remarksArray = Object.keys(remarksData).map(key => ({
  //           id: key,
  //           message: remarksData[key].message,
  //         }));
  //         setRemarks(remarksArray);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching remarks:', error);
  //     }
  //   };

  //   fetchRemarks();

  //   return () => {
  //     // Cleanup function
  //   };
  // }, []);
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
      // Fetch remarks if not found in localStorage
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



const createChannel = (clubEmail, facultyAdvisorEmail, venueInchargeEmail) => {
    // Concatenate emails to create a unique channel key
    const channelKey = `${clubEmail}_${facultyAdvisorEmail}_${venueInchargeEmail}`;
  
    // Set up the node for the channel in the Channels database
    const channelRef = ref(database, `Channels/${channelKey}`);
    
    // Set initial data for the channel (if needed)
    set(channelRef, {
      clubEmail,
      facultyAdvisorEmail,
      venueInchargeEmail
    });
  };
  
  // Call this function when the request form is submitted
  const handleSubmitRequestForm = () => {
    // Assuming you have retrieved club email, faculty advisor email, and venue incharge email
    const clubEmail = 'club@example.com';
    const facultyAdvisorEmail = 'advisor@example.com';
    const venueInchargeEmail = 'incharge@example.com';
  
    // Create the channel in the Channels database
    createChannel(clubEmail, facultyAdvisorEmail, venueInchargeEmail);
  };

export default Remarks;
