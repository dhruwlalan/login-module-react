import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import BodyPortal from './BodyPortal';

const AlertBox = ({ alert }) => {
   const [showAlert, setShowAlert] = useState(alert.showAlert);
   const nodeRef = useRef(null);

   useEffect(() => {
      const node = nodeRef.current;
      if (alert.showAlert) {
         setShowAlert(true);
         console.log('enter');
         node.classList.remove('slideOutUp');
         node.classList.add('slideInDown');
      } else {
         setTimeout(() => {
            setShowAlert(false);
         }, 400);
         console.log('leave');
         node.classList.remove('slideInDown');
         node.classList.add('slideOutUp');
      }
   }, [alert]);

   return (
      <BodyPortal>
         {/* <Animate
            nodeRef={nodeRef}
            start={() => ({
               y: -150,
            })}
            update={() => ({
               y: [alert.showAlert ? 0 : -150],
               timing: { duration: 400, ease: easeExpOut },
            })}
         >
            {({ y }) => {
               return (
                  <div
                     ref={nodeRef}
                     className={`alert alert--${alert.type}`}
                     style={{ transform: `translate3d(-50%, ${y}%, 0)` }}
                  >
                     {alert.msg}
                  </div>
               );
            }}
         </Animate> */}
         <div
            ref={nodeRef}
            className={`alert alert--${alert.type}`}
            style={{ display: showAlert ? 'block' : 'none' }}
         >
            {alert.msg}
         </div>
      </BodyPortal>
   );
};

const mapStateToProps = (state) => ({
   alert: state.alert,
});
export default connect(mapStateToProps)(AlertBox);
