// Sample product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Clear the cart and render it as empty on page load
window.onload = () => {
  sessionStorage.setItem("cart", JSON.stringify([])); // Clear session storage for cart
  renderCart(); // Ensure the cart starts empty
};

// Function to render the cart items in the DOM
function renderCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear the current cart list

  cart.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
  });
}

// Function to add a product to the cart
function addToCart(productId) {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product); // Add product to cart (allowing duplicates)
    sessionStorage.setItem("cart", JSON.stringify(cart)); // Update session storage
    renderCart(); // Re-render the cart
  }
}

// Function to clear the cart
function clearCart() {
  sessionStorage.setItem("cart", JSON.stringify([])); // Reset the cart in session storage
  renderCart(); // Clear the cart in the DOM
}

// Add event listeners to buttons for adding products and clearing the cart
document.addEventListener("DOMContentLoaded", () => {
  // Populate product list
  const productList = document.getElementById("product-list");
  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - $${product.price}`;
    
    const button = document.createElement("button");
    button.textContent = "Add to Cart";
    button.addEventListener("click", () => addToCart(product.id));
    li.appendChild(button);

    productList.appendChild(li);
  });

  // Clear cart button
  const clearCartBtn = document.getElementById("clear-cart-btn");
  clearCartBtn.addEventListener("click", clearCart);
});
