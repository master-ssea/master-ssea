import React from "react";
import Spinner from "./Spinner";

import loadingMessages from "../loadingMessages";

const LoadingPage = () => (
  <div
    style={{
      height: "100%",
      width: "80%",
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}
  >
    <h5>
      {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
    </h5>
    <br />
    <Spinner />
  </div>
);

export default LoadingPage;
