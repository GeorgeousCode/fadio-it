import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface Trial {
  start: number;
  end: number;
  title: string;
}

type Trials = Array<Trial>;

interface AppProps {
  trials: Trials;
}

// Sort trials by start key
function sortTrials(trials: Trials) {
  return trials.sort((c, b) => {
    if (c.start < b.start) {
      return -1;
    }
    if (c.start > b.start) {
      return 1;
    }
    return 0;
  });
}

// Insert more recent trial and keep intersection
function a(trials: Trials) {
  const trialsWithoutIntersection: Trials = [];
  let trialsWithIntersection: Trials = [];
  trials.forEach((trial) => {
    trialsWithIntersection = trialsWithIntersection.concat(
      trials.filter((t) => trial.end > t.start)
    );
    const trialExistInTrialsWithIntersection = trialsWithIntersection.findIndex(
      (t) => t.end === trial.end && t.start === trial.start
    );
    if (trialExistInTrialsWithIntersection === -1) {
      trialsWithoutIntersection.push(trial);
    }
  });
  console.log(trialsWithoutIntersection, trialsWithIntersection);
}

// Main render
function RenderClinicalTrials(props: AppProps) {
  const { trials } = props;
  const sortedTrials = sortTrials(trials);
  a(sortedTrials);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default RenderClinicalTrials;
