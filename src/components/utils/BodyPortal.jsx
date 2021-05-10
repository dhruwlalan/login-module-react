import ReactDOM from 'react-dom';

const BodyPortal = (props) => ReactDOM.createPortal(props.children, document.body);

export default BodyPortal;
