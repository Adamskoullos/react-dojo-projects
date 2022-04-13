import React, { useEffect, useState, useRef } from "react";

const Loader = ({ loadingMessage, isLoading, doneMessage }) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showDoneMessage, setShowDoneMessage] = useState(false);
  const isLoadingPreviousValue = useRef(null);

  useEffect(() => {
    let loadingMessageDelay;
    let doneMessageDelay;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 4000);
    } else if (isLoadingPreviousValue.current) {
      setShowDoneMessage(true);
      doneMessageDelay = setTimeout(() => {
        setShowDoneMessage(false);
      }, 300);
    }

    isLoadingPreviousValue.current = isLoading;

    return () => {
      clearTimeout(loadingMessageDelay);
      clearTimeout(doneMessageDelay);
      setShowLoadingMessage(false);
      setShowDoneMessage(false);
    };
  }, [isLoading]);

  return (
    <div aria-live="assertive" aria-atomic="true">
      {showLoadingMessage && <p className="loading">{loadingMessage}</p>}
      {showDoneMessage && <p className="visually-hidden">{doneMessage}</p>}
    </div>
  );
};

export default Loader;
