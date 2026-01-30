/* ============================
   ADD TO CART + POPUP
============================ */

// Select all "Add to Cart" buttons
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to Cart functionality
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const product = {
      name: btn.dataset.name,
      price: parseFloat(btn.dataset.price),
      image: btn.dataset.image,
      quantity: 1
    };

    // Check if product already exists in cart
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push(product);
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Show popup confirmation
    showPopup(product);
  });
});

// Function to build popup
function showPopup(product) {
  // Remove old popup if it exists
  const existingPopup = document.getElementById("cart-popup");
  if (existingPopup) existingPopup.remove();

  // Create popup
  let popup = document.createElement("div");
  popup.id = "cart-popup";
  popup.className = "cart-popup";
  popup.innerHTML = `
    <div class="popup-header">
      <span>Item added to your cart</span>
      <button class="popup-close">&times;</button>
    </div>
    <div class="popup-product">
      <img src="${product.image}" alt="${product.name}">
      <span>${product.name}</span>
    </div>
    <div class="popup-actions">
      <a href="cart.html" class="btn view-cart-btn">View Cart</a>
      <button class="btn continue-btn">Continue Shopping</button>
    </div>
  `;
  document.body.appendChild(popup);

  // Close popup
  popup.querySelector(".popup-close").addEventListener("click", () => popup.remove());
  popup.querySelector(".continue-btn").addEventListener("click", () => popup.remove());
}

/* ==========================
   CART PAGE RENDERING
========================== */

// Elements only exist on cart.html, so we check first
const cartContainer = document.getElementById("cart-container");
const cartTotalElem = document.getElementById("cart-total");
const cartSummary = document.getElementById("cart-summary");

function renderCart() {
  if (!cartContainer) return; // Don't run this if not on cart.html

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<div class="cart-empty"><p>Your cart is empty</p></div>`;
    if (cartSummary) cartSummary.classList.add("hidden");
    return;
  }

  // Build cart table
  let table = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
  `;

  let grandTotal = 0;

  cart.forEach((item, index) => {
    const total = item.price * item.quantity;
    grandTotal += total;

    table += `
      <tr>
        <td>
          <img src="${item.image}" alt="${item.name}" class="cart-img">
          <p>${item.name}</p>
          <p>R${item.price}</p>
        </td>
        <td>
          <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
          ${item.quantity}
          <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
        </td>
        <td>R${total}</td>
        <td>
          <button class="delete-btn" onclick="removeItem(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  table += `</tbody></table>`;
  cartContainer.innerHTML = table;

  if (cartTotalElem) cartTotalElem.textContent = `R${grandTotal}`;
  if (cartSummary) cartSummary.classList.remove("hidden");
}

// Update quantity
function updateQty(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Initialize rendering if on cart.html
renderCart();



