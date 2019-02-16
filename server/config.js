const get = require("lodash.get");
const requireFresh = require("./requireFresh");
const { DEFAULT_HTTP_METHOD } = require('./defaults');

let configFile;

const getConfig = path => {
  if (!configFile) {
    throw new Error("Config file hasn't been set yet!");
  }

  const config = requireFresh(configFile);

  if (!path) {
    return config;
  }

  return get(config, path);
};

const getEndpointConfig = (url, method = DEFAULT_HTTP_METHOD) =>
  getConfig("mocks").find(
    entry => entry.url === url && entry.method === method
  );

const setConfigFile = file => { configFile = file };

module.exports = {
  getConfig,
  getEndpointConfig,
  setConfigFile
};
