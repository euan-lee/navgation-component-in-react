import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './page.css'; 
const SmoothPage = ({ isVisible, children }) => {
  const [isRendered, setIsRendered] = useState(isVisible);
  
  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
    }
  }, [isVisible]);

  return (
    <div
      className={`smooth-page ${isVisible ? 'fade-in' : 'fade-out'}`}
    >
      {isRendered && children}
    </div>
  );
};

SmoothPage.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default SmoothPage;