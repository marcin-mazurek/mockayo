
# Mockayo - simple HTTP mock server

## Config structure

```
module.exports = {
  baseDirectory: '[PATH TO YOUR DIRECTORY WITH MOCK SCENARIOS]',
  mocks: [
    {
      name: '[ENDPOINT NAME]',
      method: '[ENDPOINT METHOD]',
      url: '[ENDPOINT URL]',
      directory: '[SUBDIRECTORY WITH SCENARIOS (UNDER BASE DIRECTORY)]',
    },
    // ... define as many mocks as you wish ...
  ]
};
```