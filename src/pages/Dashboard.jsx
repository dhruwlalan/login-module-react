import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Navbar from '../components/layout/Navbar';
import Pipes from '../components/layout/Pipes';
import { selectCurrentUser } from '../redux/user/userSelector';

const Dashboard = ({ user }) => {
   return (
      <>
         <Navbar page="home" />
         <Pipes />
         <div className="section">
            <h1 className="home__title">Welcome!</h1>
            <div className="home__profile">
               {/* <img className="home__profile--view-photo" />
               <img className="home__profile--photo" v-if="true" /> */}
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
