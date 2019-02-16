const getScenariosTemplate = ({ scenarios, selectedScenario }) =>
  scenarios
    .map(scenario => {
      return `
        <option value="${scenario.name}" ${
        selectedScenario === scenario.name ? "selected" : ""
      }>
          ${scenario.label}
        </option>
      `;
    })
    .join("");

const getCardTemplate = ({ endpoint, index }) => `
  <div class="endpoint-card border">
    <h4 class="endpoint-title">${endpoint.name}</h4>
    <p><code>${endpoint.method} ${endpoint.url}</code></p>
    <label for="entry-${index}">Select scenario:</label>
    <select class="form-control" id="entry-${index}">
      ${getScenariosTemplate(endpoint)}
    </select>
  </div>
`;

function changeScenario(endpoint, event) {
  const file = document.querySelector(`#${event.target.id}`).value;

  fetch("/__admin/set-scenario", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      file,
      url: endpoint.url,
      method: endpoint.method
    })
  });
}

const createEndpointCard = ({ endpoint, index }) => {
  const content = document.createElement("div");
  content.className = "col-lg-12";
  content.innerHTML = getCardTemplate({ endpoint, index });

  content
    .querySelector("select")
    .addEventListener("change", event => changeScenario(endpoint, event));

  return content;
};

fetch("/__admin/get-endpoints")
  .then(response => response.json())
  .then(endpoints => {
    const container = document.querySelector("#container");

    endpoints.forEach((endpoint, index) => {
      const endpointCard = createEndpointCard({ endpoint, index });
      container.appendChild(endpointCard);
    });
  });
