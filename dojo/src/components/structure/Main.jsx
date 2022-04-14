import React, { useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
// import { withRouter } from 'react-router-dom';

const Main = ({ headingText, headingLevel = 2, children, location }) => {
  const heading = useRef(null);
  const H = `h${headingLevel}`;

  //   useEffect(() => {
  //     if (location.state && location.state.focus) {
  //       heading.current.focus();
  //     }
  //     window.scrollTo(0, 0);
  //   }, [location.state]);

  return (
    <main tabIndex="-1" id="main">
      <Helmet>
        <title>{headingText} | Ultimate Ice Cream</title>
      </Helmet>
      <H className="main-heading" ref={heading} tabIndex="-1">
        {headingText}
      </H>
      {children}
    </main>
  );
};

// export default withRouter(Main);
export default Main;
