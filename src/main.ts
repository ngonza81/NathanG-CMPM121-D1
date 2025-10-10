import "./style.css";

// Global Variables
let counter = 0;
let growthRate = 0;
let lastTime = performance.now();

document.body.innerHTML = `
  <button id="Click">Make Cookies! 👆</button>
  <p>Cookies: <span id="counter">0</span></p>

  <button id="autoClicker" disabled>Add Auto Clicker (10 Cookies)</button>
`;

// Click handler
const button = document.getElementById("Click")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const buyAutoClickerButton = document.getElementById(
  "autoClicker",
)! as HTMLButtonElement;

function updateDisplay() {
  counterElement.textContent = Math.floor(counter).toString();
  buyAutoClickerButton.disabled = counter < 10;
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

// Buy Auto Clicker
buyAutoClickerButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    updateDisplay();
  }
});

// Start the animation loop
requestAnimationFrame(animate);
