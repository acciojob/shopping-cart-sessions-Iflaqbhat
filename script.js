// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear the current cart display
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== productId);

  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event listeners
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    addToCart(productId);
  }

  if (e.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(e.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();

