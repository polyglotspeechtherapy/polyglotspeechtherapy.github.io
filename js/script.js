// Calendly popup
function openCalendly() {
  Calendly.initPopupWidget({
    url: 'https://calendly.com/YOUR_CALENDLY_USERNAME'
  });
}

// Section reveal on scroll
function revealSections() {
  const sections = document.querySelectorAll('.section');
  const windowHeight = window.innerHeight;
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < windowHeight - 100) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);

// Get the hamburger menu and mobile navigation
const hamburgerMenu = document.getElementById('hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');

// Ensure both elements exist before trying to add event listener
if (hamburgerMenu && mobileNav) {
  // Add a click event listener to the hamburger menu
  hamburgerMenu.addEventListener('click', () => {
    // Toggle the 'active' class to show or hide the mobile nav
    mobileNav.classList.toggle('active');
  });
}


// ===== Mini-Cart =====
let cart = [];

const cartItemsDiv = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");

// Add PDF to cart
document.querySelectorAll(".buy-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const product = {
      title: btn.dataset.title,
      price: parseFloat(btn.dataset.price),
      file: btn.dataset.file
    };
    cart.push(product);
    updateCart();
  });
});

// Update cart display
function updateCart() {
  if(cart.length === 0){
    cartItemsDiv.innerHTML = "Cart is empty";
    cartTotalSpan.innerText = "0.00";
    return;
  }

  let total = 0;
  cartItemsDiv.innerHTML = "";
  cart.forEach((item, index) => {
    total += item.price;
    cartItemsDiv.innerHTML += `
      <p>${item.title} - $${item.price.toFixed(2)} 
        <button onclick="removeItem(${index})">Remove</button>
      </p>`;
  });
  cartTotalSpan.innerText = total.toFixed(2);
}

// Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// Checkout button
document.getElementById("checkout-btn").addEventListener("click", () => {
  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }

  // TODO: Integrate Stripe Checkout session here
  alert("Redirecting to payment gateway for " + cart.length + " items...");
});


// ========== Circular Subtitle Text Ring ==========
// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const text = "WELCOME TO POLYGLOT";
  const ring = document.querySelector(".subtitle-ring");
  if (!ring) return;

  const radius = 90; // distance from center
  const totalLetters = text.length;
  const degStep = 360 / totalLetters;

  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.textContent = char;
    // Rotate each letter around Y-axis
    const rotateY = degStep * i;
    span.style.transform = `rotateY(${rotateY}deg) translateZ(${radius}px)`;
    ring.appendChild(span);
  });
});



