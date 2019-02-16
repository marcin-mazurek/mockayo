const { generateKeyForRequest } = require("./utils");
const { DEFAULT_SCENARIO_FILE } = require("./defaults");

const serverState = new Map();

const getEndpointScenario = (url, method) =>
  serverState.get(generateKeyForRequest(url, method)) || DEFAULT_SCENARIO_FILE;

const setEndpointScenario = (url, method, fileToServe) =>
  serverState.set(generateKeyForRequest(url, method), fileToServe);

module.exports = {
  getEndpointScenario,
  setEndpointScenario
};
