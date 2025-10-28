import "./style.css";

// ————————————————
// Game State

const increasePriceRate = 1.15;
let counter = 0;
let growthRate = 0;
let lastTime = performance.now();
const availableItems = [
  {
    id: "slow",
    name: "Baby Grinder🤖",
    rate: 1,
    cost: 10,
    description:
      "A toy mortar from a tea-themed gacha machine. It… sort of works?",
  },
  {
    id: "paced",
    name: "Focused Student🎓",
    rate: 3,
    cost: 100,
    description:
      "One of your classmates, bribed with free tea. They copy your technique (but slower).",
  },
  {
    id: "fast",
    name: "Samurai Sous Chef🥋",
    rate: 10,
    cost: 500,
    description:
      "A warrior who believes the whisk is the soul. They don't sleep. Neither should you.",
  },
  {
    id: "faster",
    name: "Tea Spirit (Mizuko)✨",
    rate: 25,
    cost: 1000,
    description:
      "A mischievous forest spirit who controls water. Demands respect (and clean bowls).",
  },
  {
    id: "fastest",
    name: "The Ancient One🌿",
    rate: 50,
    cost: 5000,
    description:
      "Our silent master. Finally returns. Says nothing. Just… produces perfect froth.",
  },
];
// ————————————————

// ————————————————
// UI Construction

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
      Add ${item.name} (<span id="${item.id}Price">${item.cost}</span> Matcha) - ${item.description}
    </button><br>
  `;
}
// ————————————————

// ————————————————
// Event Handlers

// Click and number handlers
const button = document.getElementById("Click")! as HTMLButtonElement;
const counterElement = document.getElementById("counter")!;
const currentGrowthRateElement = document.getElementById("growthRate")!;

// Make Upgrade Buttons and update prices and growth rate display
function updateDisplay() {
  currentGrowthRateElement.textContent = Math.floor(growthRate).toString();
  counterElement.textContent = Math.floor(counter).toString();
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
// ————————————————

// Start the animation loop
requestAnimationFrame(animate);
