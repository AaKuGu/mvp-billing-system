import React from "react";
import Loading from "./Loading";

const LoadingWrapper = ({ loading, children }) => {
  if (loading) {
    return <Loading />;
  } else {
    return children;
  }
};

export default LoadingWrapper;
