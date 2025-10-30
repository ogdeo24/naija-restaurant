// cart.js — handles add/remove/display of cart items

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const cartList = document.getElementById("cart-items");
const totalDisplay = document.getElementById("cart-total");
const clearBtn = document.getElementById("clear-cart");
const addButtons = document.querySelectorAll(".add-to-cart");

// Add item to cart
addButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

// Remove item from cart
function removeItem(name) {
  cart = cart.filter(item => item.name !== name);
  updateCart();
}

// Clear cart
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    cart = [];
    updateCart();
  });
}

// Update display and total
function updateCart() {
  if (!cartList) return;
  cartList.innerHTML = "";

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity} - $${item.price * item.quantity}
      <button class="remove-btn" onclick="removeItem('${item.name}')">Remove</button>
    `;
    cartList.appendChild(li);
  });

  totalDisplay.textContent = total.toFixed(2);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Initial render on page load
updateCart();
