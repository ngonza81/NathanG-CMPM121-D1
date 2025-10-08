import "./style.css";

let counter = 0;

document.body.innerHTML = `
  <button id="Click">Make Cookies! 👆</button>
  <p>Counter: <span id="counter">0</span></p>
`;

// Click handler
const button = document.getElementById("Click")!;
const counterElement = document.getElementById("counter")!;

// Increment counter
button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
  console.log("+1!");
});
