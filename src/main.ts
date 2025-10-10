import "./style.css";

// Global Variables
let counter = 0;

// Counter Function
function incrementCounter() {
  counter += 1;
  counterElement.textContent = counter.toString();
}

document.body.innerHTML = `
  <button id="Click">Make Cookies! 👆</button>
  <p>Cookies: <span id="counter">0</span></p>
`;

// Click handler
const button = document.getElementById("Click")!;
const counterElement = document.getElementById("counter")!;

// Increment counter (By User)
button.addEventListener("click", () => {
  incrementCounter();
  console.log("+1!");
});

// Increment counter (Automatically)
setInterval(() => {
  incrementCounter();
}, 1000);
