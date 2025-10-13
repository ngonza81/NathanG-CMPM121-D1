import "./style.css";

// Global Variables
const increasePriceRate = 1.15;
let counter = 0;
let growthRate = 0;
let lastTime = performance.now();
const availableItems = [
  {
    id: "slow",
    name: "Baby Grinder🤖",
    rate: 0.1,
    cost: 10,
  },
  {
    id: "paced",
    name: "Focused Student🎓",
    rate: 2.0,
    cost: 100,
  },
  {
    id: "fast",
    name: "Samurai Sous Chef🥋",
    rate: 50,
    cost: 1000,
  },
];

document.body.innerHTML = `
  <button id="Click">Make Matcha! 🍵</button>
  <p>Matcha: <span id="counter">0</span></p>
  <p>Current Growth Rate: <span id="growthRate">0</span></p>
  <div id="shop"></div>
`;

// Creating buttons for each upgrade item
const shop = document.getElementById("shop")!;

for (const item of availableItems) {
  shop.innerHTML += `
    <button id="${item.id}Clicker" disabled>
      Add ${item.name} (<span id="${item.id}Price">${item.cost}</span> Matcha)
    </button>
  `;
}

// Click and number handlers
const button = document.getElementById("Click")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const currentGrowthRateElement = document.getElementById("growthRate")!;

// Make Upgrade Buttons and update prices and growth rate display
function updateDisplay() {
  currentGrowthRateElement.textContent = growthRate.toFixed(1);
  counterElement.textContent = counter.toFixed(1);
  for (const item of availableItems) {
    const priceElement = document.getElementById(`${item.id}Price`)!;
    const buttonElement = document.getElementById(
      `${item.id}Clicker`,
    )! as HTMLButtonElement;
    priceElement.textContent = item.cost.toString();
    buttonElement.disabled = counter < item.cost;
  }
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

// Upgrade button handlers
for (const item of availableItems) {
  const button = document.getElementById(
    `${item.id}Clicker`,
  )! as HTMLButtonElement;

  button.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      item.cost = Math.round(item.cost * increasePriceRate * 100) / 100;
      updateDisplay();
    }
  });
}

// Start the animation loop
requestAnimationFrame(animate);
