import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/userSelector';
import { useHistory } from 'react-router-dom';

import NotLoggedIn from './NotLoggedIn';

const Home = ({ currentUser }) => {
   const history = useHistory();
   return (
      <>
         {currentUser ? (
            <button onClick={() => history.push('/edit')}>edit</button>
         ) : (
            <NotLoggedIn />
         )}
      </>
   );
};

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});
export default connect(mapStateToProps)(Home);
