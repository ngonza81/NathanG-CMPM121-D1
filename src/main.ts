import "./style.css";

document.body.innerHTML = `
  <button id="Click">Make Cookies! 👆</button>
`;

// Add a click handler (optional)
const button = document.getElementById("Click")!;

button.addEventListener("click", () => {
  console.log("+1!");
});
