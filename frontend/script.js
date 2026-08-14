const products = [
  {
    id: 1,
    name: "Orbit Speaker",
    category: "Electronics",
    price: 129,
    rating: 4.9,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Cloud Headphones",
    category: "Electronics",
    price: 189,
    rating: 4.8,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Arc Wireless Charger",
    category: "Accessories",
    price: 59,
    rating: 4.7,
    badge: "Pro",
    image:
      "https://images.unsplash.com/photo-1587033411391-5d9e51cce126?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Everyday Sneakers",
    category: "Footwear",
    price: 98,
    rating: 4.9,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 5,
    name: "The Weekend Tote",
    category: "Bags",
    price: 75,
    rating: 4.6,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 6,
    name: "Sunday Crewneck",
    category: "Apparel",
    price: 84,
    rating: 4.8,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 7,
    name: "Dewy Skin Set",
    category: "Beauty",
    price: 62,
    rating: 4.7,
    badge: "Sale",
    oldPrice: 78,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 8,
    name: "Studio Water Bottle",
    category: "Sports",
    price: 34,
    rating: 4.8,
    badge: "",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 9,
    name: "Pebble Table Lamp",
    category: "Home",
    price: 115,
    rating: 4.9,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 10,
    name: "Luna Sunglasses",
    category: "Accessories",
    price: 48,
    rating: 4.6,
    badge: "Sale",
    oldPrice: 60,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 11,
    name: "Form Yoga Mat",
    category: "Sports",
    price: 71,
    rating: 4.8,
    badge: "Pro",
    image:
      "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 12,
    name: "Stoneware Mug",
    category: "Home",
    price: 29,
    rating: 4.7,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80",
  },
];
const state = {
  category: "All pieces",
  search: "",
  sort: "featured",
  cart: [],
  wishes: new Set(),
};
const categories = ["All pieces", ...new Set(products.map((product) => product.category))];
const $ = (id) => document.querySelector(id),
  money = (n) => `$${n.toFixed(2)}`;
function categoryButtons() {
  return categories
    .map(
      (category) =>
        `<button class="category ${category === state.category ? "active" : ""}" data-category="${category}">${category}<span>${category === "All pieces" ? products.length : products.filter((product) => product.category === category).length}</span></button>`,
    )
    .join("");
}
function renderCategories() {
  $("#categoryNav").innerHTML = categoryButtons();
  $("#mobileCategories").innerHTML = categoryButtons();
  document.querySelectorAll("[data-category]").forEach(
    (button) =>
      (button.onclick = () => {
        state.category = button.dataset.category;
        render();
      }),
  );
}
function filtered() {
  let product = products.filter(
    (product) =>
      (state.category === "All pieces" || product.category === state.category) &&
      product.name.toLowerCase().includes(state.search),
  );
  return product.sort((item1, item2) =>
    state.sort === "price-low"
      ? item1.price - item2.price
      : state.sort === "price-high"
        ? item2.price - item1.price
        : state.sort === "rating"
          ? item2.rating - item1.rating
          : item1.id - item2.id,
  );
}
function renderProducts() {
  const list = filtered();
  $("#productGrid").innerHTML = list
    .map(
      (product) =>
        `<article class="product-card"><div class="product-image">${product.badge ? `<span class="badge ${product.badge.toLowerCase().replace(" ", "")}">${product.badge}</span>` : ""}<button class="heart ${state.wishes.has(product.id) ? "saved" : ""}" data-wish="${product.id}" aria-label="Save ${product.name}">${state.wishes.has(product.id) ? "♥" : "♡"}</button><img src="${product.image}" alt="${product.name}"></div><div class="product-info"><span class="product-type">${product.category}</span><h3>${product.name}</h3><div class="price-row"><div class="price">${money(product.price)}${product.oldPrice ? `<span class="old-price">${money(product.oldPrice)}</span>` : ""}</div><span class="rating"><span>★</span> ${product.rating}</span></div><button class="add" data-add="${product.id}">Add to bag <b>+</b></button></div></article>`,
    )
    .join("");
  $("#emptyState").hidden = !!list.length;
  document
    .querySelectorAll("[data-add]")
    .forEach((button) => (button.onclick = () => add(+button.dataset.add)));
  document.querySelectorAll("[data-wish]").forEach(
    (button) =>
      (button.onclick = () => {
        const id = +button.dataset.wish;
        state.wishes.has(id) ? state.wishes.delete(id) : state.wishes.add(id);
        renderProducts();
        updateCounts();
      }),
  );
}
function add(id) {
  let items = state.cart.find((item) => item.id === id);
  items ? items.qty++ : state.cart.push({ id, qty: 1 });
  updateCart();
  openDrawer();
}
function updateCounts() {
  const count = state.cart.reduce((n, item) => n + item.qty, 0);
  $("#cartCount").textContent = count;
  $("#drawerCount").textContent = count;
  $("#favoriteCount").textContent = state.wishes.size;
}
function updateCart() {
  updateCounts();
  $("#cartItems").innerHTML = state.cart.length
    ? state.cart
        .map((item) => {
          const product = products.find((product) => product.id === item.id);
          return `<div class="cart-item"><img src="${product.image}" alt=""><div><h3>${product.name}</h3><p>${money(product.price)}</p><div class="qty"><button data-qty="${product.id}" data-change="-1">−</button>${item.qty}<button data-qty="${product.id}" data-change="1">+</button></div></div><button class="remove" data-remove="${product.id}">×</button></div>`;
        })
        .join("")
    : '<p class="empty-state">Your bag is feeling light.</p>';
  $("#total").textContent = money(
    state.cart.reduce(
      (n, item) => n + products.find((product) => product.id === item.id).price * item.qty,
      0,
    ),
  );
  document
    .querySelectorAll("[data-change]")
    .forEach(
      (button) => (button.onclick = () => changeQty(+button.dataset.qty, +button.dataset.change)),
    );
  document.querySelectorAll("[data-remove]").forEach(
    (button) =>
      (button.onclick = () => {
        state.cart = state.cart.filter((item) => item.id !== +button.dataset.remove);
        updateCart();
      }),
  );
}
function changeQty(id, change) {
  const item = state.cart.find((item) => item.id === id);
  item.qty += change;
  if (item.qty < 1) state.cart = state.cart.filter((item) => item.id !== id);
  updateCart();
}
function render() {
  renderCategories();
  renderProducts();
}
function openDrawer() {
  $("#drawer").classList.add("open");
  $("#overlay").classList.add("open");
  $("#drawer").setAttribute("aria-hidden", "false");
}
function closeDrawer() {
  $("#drawer").classList.remove("open");
  $("#overlay").classList.remove("open");
  $("#drawer").setAttribute("aria-hidden", "true");
}
$("#search").oninput = (input) => {
  state.search = input.target.value.toLowerCase();
  renderProducts();
};
$("#option").onchange = (choice) => {
  state.sort = choice.target.value;
  renderProducts();
};
$("#cartButton").onclick = openDrawer;
$("#closeCart").onclick = closeDrawer;
$("#overlay").onclick = closeDrawer;
$("#promoShop").onclick = () => $("#shop").scrollIntoView();
$("#favoritesButton").onclick = () => {
  state.search = "";
  state.category = "All pieces";
  render();
  document.querySelectorAll(".product-card").forEach((card) => {
    if (!card.querySelector(".heart.saved")) card.style.display = "none";
  });
};
render();
updateCart();