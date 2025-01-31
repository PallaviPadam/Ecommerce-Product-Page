// Product Data
const products = [
    { id: 1, name: "Lipstick", price: 600, category: "Beauty", image: "images/lipstick.jpg" },
    { id: 2, name: "Mobile", price: 20, category: "Electronics", image: "images/mobile.jpg" },
    { id: 3, name: "Ring", price: 70000, category: "Jewellary", image: "images/ring.jpg" }
];

// Load Products into Page
const productContainer = document.getElementById("products");
function loadProducts() {
    productContainer.innerHTML = "";
    products.forEach(product => {
        productContainer.innerHTML += `
            <div class="product" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
    });
}
loadProducts();

// Cart Functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartBtn = document.getElementById("cart-btn");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const closeCart = document.getElementById("close-cart");

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        let productId = e.target.getAttribute("data-id");
        let product = products.find(p => p.id == productId);
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }
});

function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Open & Close Cart
cartBtn.addEventListener("click", () => {
    cartModal.classList.toggle("hidden");
    showCartItems();
});

closeCart.addEventListener("click", () => {
    cartModal.classList.add("hidden");
});

function showCartItems() {
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
        cartItems.innerHTML += `<p>${item.name} - $${item.price} <button onclick="removeFromCart(${index})">❌</button></p>`;
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCartItems();
}

updateCartCount();
 
