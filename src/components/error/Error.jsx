import React from "react";
import { useHistory } from "react-router-dom";

function Error() {
  const history = useHistory();
  return (
    <div>
      <h1>404</h1>
      <button
        onClick={() => history.replace("/")}
        className="btn btn-primary m-4 btn-block mx-auto text-center"
      >
        Go To Home
      </button>
    </div>
  );
}

export default Error;
