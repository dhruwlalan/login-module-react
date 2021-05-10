import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { Animate } from 'react-move';
import { easeExpOut } from 'd3-ease';

import BodyPortal from './BodyPortal';

const AlertBox = ({ alert }) => {
   const nodeRef = useRef(null);

   return (
      <BodyPortal>
         <Animate
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
         </Animate>
      </BodyPortal>
   );
};

const mapStateToProps = (state) => ({
   alert: state.alert,
});
export default connect(mapStateToProps)(AlertBox);
