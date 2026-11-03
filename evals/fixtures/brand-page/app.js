const form = document.querySelector("#interest-form");
const nameInput = document.querySelector("#name");
const feedback = document.querySelector("#form-feedback");

nameInput.addEventListener("input", () => nameInput.setCustomValidity(""));
form.addEventListener("submit", (event) => {
  event.preventDefault();
  nameInput.setCustomValidity(nameInput.value.trim() ? "" : "Enter your name.");
  if (!form.reportValidity()) return;
  feedback.textContent = "Demo complete. No ticket was reserved, no details were stored, and no email or payment was sent.";
  form.reset();
});
