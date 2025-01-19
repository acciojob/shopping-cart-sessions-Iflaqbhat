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
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Function to render the product list
function renderProducts() {
  productList.innerHTML = products.length
    ? ""
    : "<li>No products available</li>"; // Show message if no products
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} 
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Function to render the cart list
function renderCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cartList.innerHTML = cart.length
    ? ""
    : "<li>No items in the cart</li>"; // Show message if cart is empty

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} 
      <button class="remove-from-cart-btn" data-index="${index}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners for "Remove from Cart" buttons
  document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      removeFromCart(index);
    });
  });
}

// Function to add a product to the cart
function addToCart(productId) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product); // Add the product to the cart
    sessionStorage.setItem("cart", JSON.stringify(cart)); // Update session storage
    renderCart(); // Update the cart display
  }
}

// Function to remove a product from the cart by index
function removeFromCart(index) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.splice(index, 1); // Remove the product at the specified index
  sessionStorage.setItem("cart", JSON.stringify(cart)); // Update session storage
  renderCart(); // Update the cart display
}

// Function to clear the entire cart
function clearCart() {
  sessionStorage.removeItem("cart"); // Clear cart data from session storage
  renderCart(); // Update the cart display
}

// Add event listener for "Clear Cart" button
clearCartBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear the cart?")) {
    clearCart();
  }
});

// Initial rendering
renderProducts(); // Display the product list
renderCart(); // Display the cart if it has existing items
