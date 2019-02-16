const test = require("ava");
const fetch = require("isomorphic-fetch");

const readFileAsString = require("./testUtils/readFileAsString");
const runMockServerInBackground = require("./testUtils/runMockServerInBackground");

runMockServerInBackground(test);

test("launches Control UI", async t => {
  const response = await fetch("http://localhost:5000/__admin/");
  const pageContent = await response.text();
  const expectedPageContent = readFileAsString("ui/index.html");

  t.is(expectedPageContent, pageContent);
});

test("exposes endpoints available in configuration through GET /__admin/get-endpoints", async t => {
  const response = await fetch("http://localhost:5000/__admin/get-endpoints");
  const endpoints = await response.json();

  t.snapshot(endpoints);
});

test("remembers the scenario set with POST /__admin/set-scenario", async t => {
  await fetch("http://localhost:5000/__admin/set-scenario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      file: "error.js",
      url: "/users",
      method: "GET"
    })
  });

  const endpointResponse = await fetch("http://localhost:5000/users");
  const endpointResponseBody = await endpointResponse.json();

  t.is(endpointResponse.status, 500);
  t.deepEqual(endpointResponseBody, { message: "Something went wrong!" });
});
