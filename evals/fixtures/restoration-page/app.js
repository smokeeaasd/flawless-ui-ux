const form = document.querySelector("#assessment-form");
const nameInput = document.querySelector("#name");
const description = document.querySelector("#description");
const feedback = document.querySelector("#feedback");

form.addEventListener("input", () => {
  nameInput.setCustomValidity("");
  description.setCustomValidity("");
  feedback.textContent = "Local demo: nothing is sent or stored.";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  nameInput.setCustomValidity(nameInput.value.trim() ? "" : "Enter your name.");
  description.setCustomValidity(description.value.trim() ? "" : "Describe the furniture problem.");
  if (!form.reportValidity()) return;
  feedback.textContent = "Demo complete. No assessment request was sent or stored, and no booking or payment was created.";
});
