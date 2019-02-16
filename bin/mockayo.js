#!/usr/bin/env node

const path = require("path");
const { ArgumentParser } = require("argparse");

const runServer = require("../server/runServer");
const { setConfigFile } = require("../server/config");
const appVersion = require("../package.json").version;

const parser = new ArgumentParser({
  version: appVersion,
  addHelp: true,
  description: "Mockayo CLI"
});

parser.addArgument(["config"], {
  help: "configuration file path",
  type: "string"
});

const args = parser.parseArgs();

const configFile = path.resolve(process.cwd(), args.config);

setConfigFile(configFile);
runServer();
