const jobs = [
  { id: "R-201", customer: "Maya Chen", bicycle: "Commuter", due: "2026-11-04", estimate: 65, status: "received" },
  { id: "R-202", customer: "Leo Martins", bicycle: "Cargo", due: "2026-11-03", estimate: 90, status: "in-progress" },
  { id: "R-203", customer: "Noor Ali", bicycle: "Road", due: "2026-11-03", estimate: 45, status: "ready" },
  { id: "R-204", customer: "Elena Park", bicycle: "Commuter", due: "2026-11-05", estimate: 65, status: "in-progress" },
  { id: "R-205", customer: "Owen Reed", bicycle: "Folding", due: "2026-11-06", estimate: 30, status: "received" },
  { id: "R-206", customer: "Sofia Costa", bicycle: "Hybrid", due: "2026-11-04", estimate: 55, status: "ready" },
];

const statusLabels = { received: "Received", "in-progress": "In progress", ready: "Ready" };
const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const date = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const search = document.querySelector("#search");
const statusFilter = document.querySelector("#status-filter");
const rows = document.querySelector("#job-rows");
const feedback = document.querySelector("#feedback");

function render() {
  const query = search.value.trim().toLowerCase();
  const visible = jobs.filter((job) =>
    `${job.id} ${job.customer} ${job.bicycle}`.toLowerCase().includes(query)
    && (statusFilter.value === "all" || job.status === statusFilter.value),
  );

  document.querySelector("#total-count").textContent = jobs.length;
  document.querySelector("#progress-count").textContent = jobs.filter((job) => job.status === "in-progress").length;
  document.querySelector("#ready-count").textContent = jobs.filter((job) => job.status === "ready").length;
  document.querySelector("#result-count").textContent = `${visible.length} of ${jobs.length} jobs shown`;
  rows.replaceChildren();

  for (const job of visible) {
    const row = document.createElement("tr");
    const values = [job.id, job.customer, job.bicycle, date.format(new Date(`${job.due}T00:00:00Z`)), statusLabels[job.status], currency.format(job.estimate)];
    for (const [index, value] of values.entries()) {
      const cell = document.createElement("td");
      cell.textContent = value;
      if (index === 4) cell.className = "status";
      row.append(cell);
    }

    const action = document.createElement("td");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = job.status === "ready" ? "Ready" : "Mark ready";
    button.disabled = job.status === "ready";
    button.setAttribute("aria-label", `${job.status === "ready" ? "Ready for pickup" : "Mark ready"}: ${job.id}, ${job.customer}`);
    button.addEventListener("click", () => {
      job.status = "ready";
      feedback.textContent = `${job.id} for ${job.customer} is ready for pickup. This demo resets on reload.`;
      render();
    });
    action.append(button);
    row.append(action);
    rows.append(row);
  }

  if (!visible.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 7;
    cell.textContent = "No jobs match these filters. Use Clear filters to see the full queue.";
    row.append(cell);
    rows.append(row);
  }
}

search.addEventListener("input", render);
statusFilter.addEventListener("change", render);
document.querySelector("#clear-filters").addEventListener("click", () => {
  search.value = "";
  statusFilter.value = "all";
  feedback.textContent = "Filters cleared.";
  render();
});

render();
