import "./style.css";

// Global Variables
let counter = 0;
let growthRate = 0;
let lastTime = performance.now();

document.body.innerHTML = `
  <button id="Click">Make Cookies! 👆</button>
  <p>Cookies: <span id="counter">0</span></p>
  <p>Current Growth Rate: <span id="growthRate">0</span></p>

  <button id="slowClicker" disabled>Add Slow Clicker (10 Cookies)</button>
  <button id="pacedClicker" disabled>Add Paced Clicker (100 Cookies)</button>
  <button id="fastClicker" disabled>Add Fast Clicker (1000 Cookies)</button>
`;

// Click handler
const button = document.getElementById("Click")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const currentGrowthRateElement = document.getElementById("growthRate")!;
const buySlowClickerButton = document.getElementById(
  "slowClicker",
)! as HTMLButtonElement;
const buyPacedClickerButton = document.getElementById(
  "pacedClicker",
)! as HTMLButtonElement;
const buyFastClickerButton = document.getElementById(
  "fastClicker",
)! as HTMLButtonElement;

function updateDisplay() {
  currentGrowthRateElement.textContent = growthRate.toFixed(1);
  counterElement.textContent = Math.floor(counter).toString();
  buySlowClickerButton.disabled = counter < 10;
  buyPacedClickerButton.disabled = counter < 100;
  buyFastClickerButton.disabled = counter < 1000;
}

// Increment counter (Automatically by frame rate)
function animate(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  counter += (growthRate * deltaTime) / 1000;

  updateDisplay();
  requestAnimationFrame(animate);
}

// Increment counter (By User)
button.addEventListener("click", () => {
  counter += 1;
  updateDisplay();
});

// Buy Slow Clicker
buySlowClickerButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 0.1;
    updateDisplay();
  }
});

// Buy Paced Clicker
buyPacedClickerButton.addEventListener("click", () => {
  if (counter >= 100) {
    counter -= 100;
    growthRate += 2.0;
    updateDisplay();
  }
});

// Buy Fast Clicker
buyFastClickerButton.addEventListener("click", () => {
  if (counter >= 1000) {
    counter -= 1000;
    growthRate += 50;
    updateDisplay();
  }
});

// Start the animation loop
requestAnimationFrame(animate);
