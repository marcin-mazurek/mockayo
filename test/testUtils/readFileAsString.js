const fs = require("fs");
const path = require("path");

module.exports = filePath =>
  String(fs.readFileSync(path.resolve(process.cwd(), filePath)));
