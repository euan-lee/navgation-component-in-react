import React, { useState, useEffect } from 'react';
import Page1 from './Page/Page1';
import Page2 from './Page/Page2';
import Page3 from './Page/Page3';
import Page4 from './Page/Page4';
import SmoothPage from './SmoothPage';

function PageTransition() {
  const totalPages = 4;
  const pageComponents = [Page1, Page2, Page3, Page4];
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(true);
  const [loadOnce, setLoadOnce] = useState(true);
  const transitionDuration = 1000;

  useEffect(() => {
      if (loadOnce === true) {
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
        Transition(parseInt(savedPage,true)); 
     }
    setLoadOnce(false);
    }
  }, []);

  const Transition = (page, fromStorage) => {
    if (page >= 1 && page <= totalPages) {
      setIsVisible(false);
      new Promise((resolve) => setTimeout(resolve, transitionDuration))
        .then(() => {
          fromStorage === false &&
            localStorage.setItem(
              'pageHistory',
              JSON.stringify([...(JSON.parse(localStorage.getItem('pageHistory')) || []), currentPage])
            );
          setCurrentPage(page);
          localStorage.setItem('currentPage', page.toString());
          setIsVisible(true);
        })
        .catch((error) => {
          alert('An error occurred during page transition:', error);
        });
    }
  };
  
  const navigateToPreviousPage = () => {
    const history = JSON.parse(localStorage.getItem('pageHistory')) || [];
    if (history.length > 0) {
      const previousPage = history.pop(); 
      Transition(previousPage,true);
      localStorage.setItem('pageHistory', JSON.stringify(history));
      localStorage.setItem('currentPage', previousPage.toString());
    }
  };

  return (
    <>
      <div className='header'>
        <button onClick={navigateToPreviousPage}>Go Back</button>
      </div>

      <div className='mainPage'>
        <div>
          <button onClick={() => Transition(currentPage - 1,false)}>Prev</button>
        </div>
        <div className='content'>
          <SmoothPage isVisible={isVisible}>
            {React.createElement(pageComponents[currentPage - 1])}
          </SmoothPage>
        </div>
        <div>
          <button onClick={() => Transition(currentPage + 1,false)}>Next</button>
        </div>
      </div>
    </>
  );
}

export default PageTransition;
