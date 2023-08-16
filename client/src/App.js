import React from "react";
import axios from "axios";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MainRouter from "./MainRouter";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <div>
      <MainRouter />
    </div>
  );
};

export default App;
