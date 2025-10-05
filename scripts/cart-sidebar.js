import { PRODUCTS } from "./products.js";

const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");
const cartIcon = document.getElementById("cart-icon");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const closeCartBtn = document.getElementById("close-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartIcon.addEventListener("click", () => {
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
});

closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
  cartOverlay.classList.remove("active");
});

document.querySelectorAll(".product-card").forEach(card => {
  const btn = card.querySelector(".add-btn");
  if (!btn) return;

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const name = card.querySelector("a").textContent.trim();

    // find by name
    const product = PRODUCTS.find(p => p.name === name);
    if (!product) {
      console.warn(`Попытка добавить неизвестный товар: ${name}`);
      alert("Ошибка: неизвестный товар.");
      return;
    }

    addToCart(product);
  });
});

function addToCart(item) {
  // security
  if (!item.name || isNaN(item.price) || item.price <= 0 || item.price > 10000) {
    console.warn("Попытка добавить товар с неверной ценой:", item);
    alert("Ошибка: неверная цена товара.");
    return;
  }

  cart.push(item);
  saveCart();
  renderCart();

  // show cart
  cartSidebar.classList.add("active");
  cartOverlay.classList.add("active");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty">В корзине пусто</p>';
    cartCount.textContent = "0";
    if (cartTotal) cartTotal.textContent = "0 BYN";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price} BYN</span>
      <button class="remove-btn" data-index="${index}">&times;</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartCount.textContent = cart.length;
  if (cartTotal) cartTotal.textContent = total + " BYN";

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.index);
    });
  });
}

renderCart();
