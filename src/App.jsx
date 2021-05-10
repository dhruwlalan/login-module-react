import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import AlertBox from './components/utils/AlertBox';
import Spinner from './components/utils/Spinner';
import { alert } from './redux/alert/alertActions';

const Home = lazy(() => import('./pages/Home'));
const Edit = lazy(() => import('./pages/Edit'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const ForgetPassword = lazy(() => import('./pages/ForgetPassword'));
const AccountManagement = lazy(() => import('./pages/AccountManagement'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

function App({ showAlert }) {
   return (
      <>
         <AlertBox></AlertBox>
         <Suspense fallback={<Spinner />}>
            <Switch>
               <Route exact path="/" component={Home} />
               <Route exact path="/edit" component={Edit} />
               <Route exact path="/login" component={Login} />
               <Route exact path="/signup" component={SignUp} />
               <Route exact path="/forgetPassword" component={ForgetPassword} />
               <Route exact path="/accmng" component={AccountManagement} />
               <Route exact path="/*" component={PageNotFound} />
            </Switch>
         </Suspense>
         <button onClick={() => showAlert('success', 'ohh YES')}>yes</button>
         <button onClick={() => showAlert('error', 'hell no')}>no</button>
      </>
   );
}

const mapDispatchToProps = (dispatch) => ({
   showAlert: (type, msg, time) => dispatch(alert(type, msg, time)),
});
export default connect(null, mapDispatchToProps)(App);
