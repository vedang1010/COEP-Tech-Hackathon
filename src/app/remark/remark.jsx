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
import { getDatabase, ref, push } from 'firebase/database';

const Remarks = ({ currentUser, club }) => {
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState('');

  useEffect(() => {
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
          setRemarks(remarksArray);
        }
      } catch (error) {
        console.error('Error fetching remarks:', error);
      }
    };

    fetchRemarks();

    return () => {
      // Cleanup function
    };
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
    <div style={{ display: 'flex', height: '100%' }}>
      <div
        style={{
          flex: '1',
          padding: '20px',
        }}
      >
        <h2>Write Remark</h2>
        <div>
          <textarea
            style={{ width: '100%', marginBottom: '10px' }}
            value={newRemark}
            onChange={handleNewRemarkChange}
          />
          <button
            style={{ width: '100%' }}
            onClick={handleCreateRemark}
          >
            Send Remark
          </button>
        </div>
      </div>
      <div
        style={{
          flex: '1',
          padding: '20px',
          overflowY: 'auto', // Enable scrolling if content exceeds height
          backgroundColor: '#f0f0f0', // Change background color here
          color: 'black', // Change font color to black
          height: '100vh',
        }}
      >
        <h2>All Remarks</h2>
        <ul>
          {remarks.map(remark => (
            <li key={remark.id}>{remark.message}</li>
          ))}
        </ul>
      </div>
    </div>
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
