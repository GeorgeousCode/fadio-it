import React, { Component } from "react";
import "./RenderClinicalTrials.css";

interface Trial {
  start: number;
  end: number;
  title: string;
  isProcessed?: boolean;
  numberOfIntersections?: number;
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

// Create lines with trials
function createTrialsLines(trials: Trials, trialsLines: Array<Trials>) {
  let trialsWithIntersection: Trials = [];
  const trialsWithoutIntersection: Trials = trials;

  // For each trial keep only trial without intersection and insert in the "trialsLines"
  trialsWithoutIntersection.forEach((trial, index, currentTrials) => {
    const findTrialToDelete = trials.filter(
      (t) => trial.end > t.start && trial.title !== t.title && !t.isProcessed
    );
    // Keep in an array trials which an intersection
    trialsWithIntersection = trialsWithIntersection.concat(findTrialToDelete);
    // Set current trial to processed
    currentTrials[index].isProcessed = true;
    // Delete all trials which an intersection
    findTrialToDelete.forEach((ttd) => {
      const findIndex = trials.findIndex((j) => j.title === ttd.title);
      if (findIndex !== -1) {
        currentTrials.splice(findIndex, 1);
      }
    });
  });
  // Insert in lines array all trials without intersection
  trialsLines.push(trialsWithoutIntersection);
  // Continue to process the rest of the trials with an intersection
  if (trialsWithIntersection.length > 0) {
    trialsLines = createTrialsLines(trialsWithIntersection, trialsLines);
  }
  return trialsLines;
}

// Get number of intersections
function getNumberOfIntersections(
  trial: Trial,
  otherTrialsLines: Array<Trials>
) {
  const numberOfIntersections = otherTrialsLines.reduce(
    (n, otherTrialsLine) => {
      if (
        otherTrialsLine.some(
          (t) =>
            (trial.start > t.start && trial.start < t.end) ||
            (trial.end > t.start && trial.end < t.end) ||
            (trial.start < t.start && trial.end > t.end)
        )
      ) {
        n += 1;
      }
      return n;
    },
    0
  );
  return numberOfIntersections;
}

// Compute height of each trials
function computeNumberOfIntersections(trialsLines: Array<Trials>) {
  trialsLines.forEach((trialsLine, line) => {
    trialsLine.forEach((trial, index, currentTrials) => {
      const otherTrialsLines = trialsLines.filter(
        (_otherTrialsLine, otherLine) => otherLine !== line
      );
      const numberOfIntersections = getNumberOfIntersections(
        trial,
        otherTrialsLines
      );
      currentTrials[index].numberOfIntersections = numberOfIntersections;
    });
  });
  return trialsLines;
}

// Create footer
function renderFooter(pixelForAMonth: number) {
  const items = [];

  for (let i = 0; i < 11; i += 1) {
    let yearDiv = null;
    // One trait is a year so 12 months
    const left = i * 12 * pixelForAMonth;
    if (i === 0 || i === 5 || i === 10) {
      // 19px is the half width of the yearDiv
      yearDiv = (
        <div className="yearDiv" style={{ left: left - 19 }}>
          20{i.toString().length > 1 ? i : `0${i}`}
        </div>
      );
    }
    items.push(<div className="trait" style={{ left }} />);
    items.push(yearDiv);
  }
  return <div className="footer">{items}</div>;
}

// Create trials
function RenderTrials(
  trialsLines: Array<Trials>,
  heightOfTrialsContainer: number,
  pixelForAMonth: number
) {
  return (
    <div className="trials">
      {trialsLines.map((trialsByLine, line) => {
        return trialsByLine.map((trial) => {
          const numberOfIntersections = trial.numberOfIntersections
            ? trial.numberOfIntersections
            : 1;
          const heightOfTrial =
            heightOfTrialsContainer / (numberOfIntersections + 1);
          return (
            <div
              className="trial"
              style={{
                left: pixelForAMonth * trial.start,
                top: heightOfTrial * line,
                // substract 2 pixels for border top and bottom
                height: heightOfTrial - 2,
                width: (trial.end - trial.start) * pixelForAMonth,
              }}
            >
              {trial.title}
            </div>
          );
        });
      })}
    </div>
  );
}

// Main render
function RenderClinicalTrials(props: AppProps) {
  const { trials } = props;
  // Sort trials
  const sortedTrials = sortTrials(trials);
  // Create each lines with trials
  let trialsLines = createTrialsLines(sortedTrials, []);
  // Compute intersections for each trials
  trialsLines = computeNumberOfIntersections(trialsLines);
  // 720 of the width divide by the number of month (120)
  const pixelForAMonth = 6;
  // Height of the container
  const heightOfTrialsContainer = 250;
  return (
    <div>
      {RenderTrials(trialsLines, heightOfTrialsContainer, pixelForAMonth)}
      {renderFooter(pixelForAMonth)}
    </div>
  );
}

export default RenderClinicalTrials;
