import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Navbar from '../components/layout/Navbar';
import Pipes from '../components/layout/Pipes';
import BodyPortal from '../components/utils/BodyPortal';
import { selectCurrentUser } from '../redux/user/userSelector';

const Dashboard = ({ user }) => {
   const [viewProfilePhoto, setViewProfilePhoto] = useState(false);
   const nodeRef = useRef(null);

   const openPhoto = () => {
      setViewProfilePhoto(true);
      const node = nodeRef.current;
      node.classList.remove('profile-zoom-out');
      node.classList.remove('home__profile--photo');
      node.classList.add('home__profile--view-photo');
      node.classList.add('profile-zoom-in');
   };
   const closePhoto = () => {
      setViewProfilePhoto(false);
      const node = nodeRef.current;
      node.classList.remove('profile-zoom-in');
      node.classList.add('profile-zoom-out');
      setTimeout(() => {
         node.classList.add('home__profile--photo');
      }, 200);
   };

   return (
      <>
         <BodyPortal>
            <div
               className="home__profile--backdrop"
               style={{ display: viewProfilePhoto ? 'block' : 'none' }}
               onClick={closePhoto}
            ></div>
         </BodyPortal>
         <Navbar page="home" />
         <Pipes />
         <div className="section">
            <h1 className="home__title">Welcome!</h1>
            <div className="home__profile" onClick={openPhoto}>
               <img
                  className="home__profile--photo"
                  ref={nodeRef}
                  src={user.photoURL}
                  alt="profile"
               />
            </div>
         </div>
         <Pipes />
         <div className="section">
            <div className="home__details">
               <div className="home__details__row">
                  <div className="home__details__heading">Your Details:</div>
               </div>
               <div className="home__details__row">
                  <div className="home__details--key">Name</div>
                  <div className="home__details--value">{user.displayName}</div>
               </div>
               <div className="home__details__row">
                  <div className="home__details--key">Email</div>
                  <div className="home__details--value">{user.email}</div>
               </div>
            </div>
         </div>
      </>
   );
};

const mapStateToProps = createStructuredSelector({
   user: selectCurrentUser,
});
export default connect(mapStateToProps)(Dashboard);
