import "./style.css";

// Global Variables
let counter = 0;
let growthRate = 0;
let slowPrice = 10;
let pacedPrice = 100;
let fastPrice = 1000;
const increasePriceRate = 1.15;
let lastTime = performance.now();

document.body.innerHTML = `
  <button id="Click">Make Matcha! 🍵</button>
  <p>Matcha: <span id="counter">0</span></p>
  <p>Current Growth Rate: <span id="growthRate">0</span></p>

  <button id="slowClicker" disabled>Add Baby Grinder🤖 (<span id="slowPrice">10</span> Matcha)</button>
  <button id="pacedClicker" disabled>Add Focused Student🎓 (<span id="pacedPrice">100</span> Matcha)</button>
  <button id="fastClicker" disabled>Add Samurai Sous Chef🥋 (<span id="fastPrice">1000</span> Matcha)</button>
`;

// Click handler
const button = document.getElementById("Click")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const currentGrowthRateElement = document.getElementById("growthRate")!;
const slowPriceElement = document.getElementById("slowPrice")!;
const pacedPriceElement = document.getElementById("pacedPrice")!;
const fastPriceElement = document.getElementById("fastPrice")!;
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
  currentGrowthRateElement.textContent = growthRate.toFixed(1);
  slowPriceElement.textContent = slowPrice.toString();
  pacedPriceElement.textContent = pacedPrice.toString();
  fastPriceElement.textContent = fastPrice.toString();
  buySlowClickerButton.disabled = counter < slowPrice;
  buyPacedClickerButton.disabled = counter < pacedPrice;
  buyFastClickerButton.disabled = counter < fastPrice;
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
  if (counter >= slowPrice) {
    counter -= slowPrice;
    growthRate += 0.1;
    slowPrice = Math.round(increasePriceRate * slowPrice * 100) / 100;
    updateDisplay();
  }
});

// Buy Paced Clicker
buyPacedClickerButton.addEventListener("click", () => {
  if (counter >= pacedPrice) {
    counter -= pacedPrice;
    growthRate += 2.0;
    pacedPrice = Math.round(increasePriceRate * pacedPrice * 100) / 100;
    updateDisplay();
  }
});

// Buy Fast Clicker
buyFastClickerButton.addEventListener("click", () => {
  if (counter >= fastPrice) {
    counter -= fastPrice;
    growthRate += 50;
    fastPrice = Math.round(increasePriceRate * fastPrice * 100) / 100;
    updateDisplay();
  }
});

// Start the animation loop
requestAnimationFrame(animate);
