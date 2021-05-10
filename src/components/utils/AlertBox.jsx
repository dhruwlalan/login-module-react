import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import BodyPortal from './BodyPortal';

const AlertBox = ({ alert }) => {
   const [open, setOpen] = useState(true);
   console.log(open);
   const nodeRef = useRef(null);

   return (
      <BodyPortal>
         <button onClick={() => setOpen((prev) => !prev)}>check</button>
         <CSSTransition
            nodeRef={nodeRef}
            in={open}
            timeout={1000}
            classNames={{ enterActive: 'slideInDown', exitActive: 'slideOutUp' }}
         >
            <div
               ref={nodeRef}
               className={`alert alert--${alert.type}`}
               style={{ opacity: alert.showAlert ? 1 : 1 }}
            >
               {alert.msg}
            </div>
         </CSSTransition>
      </BodyPortal>
   );
};

const mapStateToProps = (state) => ({
   alert: state.alert,
});
export default connect(mapStateToProps)(AlertBox);
