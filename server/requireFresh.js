module.exports = file => {
  delete require.cache[require.resolve(file)];
  return require(file);  // eslint-disable-line
};
