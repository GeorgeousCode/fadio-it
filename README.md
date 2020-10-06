This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

[DEMO](https://georgeouscode.github.io/fadio-it/)

[REPO](https://github.com/GeorgeousCode/fadio-it/)

## Install dependencies

- `npm install`

## Serve the project

- `npm start`

## Build the project

- `npm run build`

## Deploy the project

- `npm run deploy`

## Algo

- Each trials are sorted by start.
- Each trials are processed:
  - The first trial is inserted inside an array (the array represent the first line).
  - If the first trial have intersection I delete it from the trials and keep it for other lines.
  - Same for the second and other trials.
  - After that I have the first line of the trials.
  - I push the array inside another array (array of each lines).
  - This process is recursive and all trials was deleted in the first step (because of their intersections) are processed.
- I have an array of array which represents each line of trials.
- I compute this array to find numberOfIntersections of each trials (to compute their height).
