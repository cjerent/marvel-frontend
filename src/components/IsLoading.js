import React from "react";
import Loader from "react-loader-spinner";

const IsLoading = () => {
  return (
    <div className="loader">
      <Loader
        type="Puff"
        color="#a90000"
        height={200}
        width={200}
        timeout={3000} //3 secs
      />
    </div>
  );
};

export default IsLoading;
