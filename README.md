# Mockayo - simple HTTP mock server

## Set up

Install the package as a devDependency:

```
npm install mockayo --save-dev
```

Create a JavaScript config file with any name, with the following structure:

```
module.exports = {
  baseDirectory: '[PATH TO YOUR DIRECTORY WITH MOCK SCENARIOS]',
  port: [PORT TO RUN THE MOCK SERVER ON], // defaults to 8000,
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

For each mock (combination of URL and method), create a directory with at least one scenario, called `default.js`. You can create as many as you want though.
Each scenario should be a regular JavaScript file, exporting an object with the following structure:

```
module.exports = {
  code: [HTTP RESPONSE CODE], // defaults to 200
  body: [HTTP RESPONSE BODY - STRING OR JAVASCRIPT OBJECT (NOT SERIALIZED)],
}
```

[Check out an example of the config file and mock scenarios](https://github.com/marcin-mazurek/mockayo/tree/master/test/testFiles).

Finally, add a command to your package.json:

```
  "scripts": {
    // ... your scripts ...
    "mock-server": "mockayo [RELATIVE/ABSOLUTE PATH TO YOUR CONFIG FILE]"
  },
```

Now, you can run your mock server, using the following command:

```
npm run mock-server
```
