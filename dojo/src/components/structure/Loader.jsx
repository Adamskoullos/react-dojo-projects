import React, { useEffect, useState } from "react";

const Loader = ({ loadingMessage, isLoading }) => {
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  useEffect(() => {
    let loadingMessageDelay;

    if (isLoading) {
      loadingMessageDelay = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 4000);
    }

    return () => {
      clearTimeout(loadingMessageDelay);
      setShowLoadingMessage(false);
    };
  }, [isLoading]);

  return showLoadingMessage ? (
    <p className="loading">{loadingMessage}</p>
  ) : null;
};

export default Loader;
