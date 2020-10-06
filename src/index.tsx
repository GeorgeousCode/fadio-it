import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RenderClinicalTrials from "./RenderClinicalTrials";
import * as serviceWorker from "./serviceWorker";

const trials = [
  { start: 90, end: 115, title: "Bortezomib" },
  { start: 5, end: 50, title: "Study of Bendamustine" },
  { start: 70, end: 100, title: "Study of Stockolm" },
  { start: 55, end: 85, title: "ASCT With Nivolumab" },
  // { start: 6, end: 20, title: "B" },
  // { start: 8, end: 21, title: "C" },
  // { start: 116, end: 130, title: "D" },
  // { start: 110, end: 142, title: "E" },
];

ReactDOM.render(
  <React.StrictMode>
    <RenderClinicalTrials trials={trials} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
