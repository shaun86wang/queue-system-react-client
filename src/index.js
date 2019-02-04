import ReactDOM from "react-dom";
import App from 'app.jsx';
import React from "react";
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";

ReactDOM.render(
  <div>
    <Header
          absolute
          color="transparent"
          brand="Live Kue"
          rightLinks={<HeaderLinks />}
        />
  <App></App>
  </div>
  ,
  document.getElementById("root")
);
