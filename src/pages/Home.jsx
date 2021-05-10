import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/userSelector';

import Spinner from '../components/utils/Spinner';

import NotLoggedIn from './NotLoggedIn';
import Dashboard from './Dashboard';

const Home = ({ currentUser }) => {
   if (currentUser === 'checking') {
      return <Spinner />;
   } else if (currentUser) {
      return <Dashboard />;
   } else {
      return <NotLoggedIn />;
   }
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(Home);
