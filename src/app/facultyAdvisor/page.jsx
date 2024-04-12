    // // pages/index.js
    // "use client"
    // import { useState } from 'react';
    // import styled from 'styled-components';

    // const TabContainer = styled.div`
    //   display: flex;
    //   justify-content: center;
    //   margin-bottom: 20px;
    // `;

    // const TabButton = styled.button`
    //   padding: 10px 20px;
    //   margin: 0 10px;
    //   background-color: ${props => props.active ? 'blue' : 'transparent'};
    //   color: ${props => props.active ? 'white' : 'black'};
    //   border: 1px solid blue;
    //   border-radius: 5px;
    //   cursor: pointer;
    // `;


    // const IndexPage = () => {
    //   const [activeTab, setActiveTab] = useState('pending'); // Default tab

    //   const handleTabClick = (tab) => {
    //     setActiveTab(tab);
    //   };

    //   return (
    //     <div>
    //       <h1>Tab Interface Example</h1>
    //       <div className="tab-buttons">
    //         <button onClick={() => handleTabClick('pending')} className={activeTab === 'pending' ? 'active' : ''}>Pending</button>
    //         <button onClick={() => handleTabClick('accepted')} className={activeTab === 'accepted' ? 'active' : ''}>Accepted</button>
    //         <button onClick={() => handleTabClick('canceled')} className={activeTab === 'canceled' ? 'active' : ''}>Canceled</button>
    //       </div>
          
    //       <div className="content">
    //         {activeTab === 'pending' && (
    //           <div>
    //             <h2>Pending Items</h2>
    //             {/* Render pending items */}
    //           </div>
    //         )}
    //         {activeTab === 'accepted' && (
    //           <div>
    //             <h2>Accepted Items</h2>
    //             {/* Render accepted items */}
    //           </div>
    //         )}
    //         {activeTab === 'canceled' && (
    //           <div>
    //             <h2>Canceled Items</h2>
    //             {/* Render canceled items */}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   );
    // };

    // export default IndexPage;




    // pages/index.js
    "use client"
import { useState } from 'react';
import styled from 'styled-components';
import '../facultyAdvisor/facAd.css';

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  // margin-bottom: 20px;
  margin-top:5rem;
`;

const TabButton = styled.button`
  padding: 15px 25px;
  margin: 20px 10px;
  background-color: ${props => props.active ? '#3285A6' : 'rgba(50, 133, 166, 0.5)'};
  color: ${props => props.active ? 'white' : 'white'};
  border: 1px solid #3285A6;
  border-radius: 5px;
  cursor: pointer;
  font-size:20px;
`;

const IndexPage = () => {
  const [activeTab, setActiveTab] = useState('pending'); // Default tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <TabContainer>
        <TabButton onClick={() => handleTabClick('pending')} active={activeTab === 'pending'}>Pending</TabButton>
        <TabButton onClick={() => handleTabClick('accepted')} active={activeTab === 'accepted'}>Accepted</TabButton>
        <TabButton onClick={() => handleTabClick('canceled')} active={activeTab === 'canceled'}>Canceled</TabButton>
      </TabContainer>
      
      <div className="content">
        {activeTab === 'pending' && (
          <div>
            <h2>Pending Items</h2>
            {/* Render pending items */}
          </div>
        )}
        {activeTab === 'accepted' && (
          <div>
            <h2>Accepted Items</h2>
            {/* Render accepted items */}
          </div>
        )}
        {activeTab === 'canceled' && (
          <div>
            <h2>Canceled Items</h2>
            {/* Render canceled items */}
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
