import "./style.css";

// Global Variables
let counter = 0;
let lastTime = performance.now();

document.body.innerHTML = `
  <button id="Click">Make Cookies! 👆</button>
  <p>Cookies: <span id="counter">0</span></p>
`;

// Click handler
const button = document.getElementById("Click")!;
const counterElement = document.getElementById("counter")!;

// Increment counter (Automatically by frame rate)
function animate(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  counter += (1 * deltaTime) / 1000;

  counterElement.textContent = Math.floor(counter).toString();

  requestAnimationFrame(animate);
}

// Increment counter (By User)
button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
});

requestAnimationFrame(animate);
