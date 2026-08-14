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
const cats = ["All pieces", ...new Set(products.map((p) => p.category))];
const $ = (s) => document.querySelector(s),
  money = (n) => `$${n.toFixed(2)}`;
function categoryButtons() {
  return cats
    .map(
      (c) =>
        `<button class="category ${c === state.category ? "active" : ""}" data-category="${c}">${c}<span>${c === "All pieces" ? products.length : products.filter((p) => p.category === c).length}</span></button>`,
    )
    .join("");
}
function renderCategories() {
  $("#categoryNav").innerHTML = categoryButtons();
  $("#mobileCategories").innerHTML = categoryButtons();
  document.querySelectorAll("[data-category]").forEach(
    (b) =>
      (b.onclick = () => {
        state.category = b.dataset.category;
        render();
      }),
  );
}
function filtered() {
  let p = products.filter(
    (p) =>
      (state.category === "All pieces" || p.category === state.category) &&
      p.name.toLowerCase().includes(state.search),
  );
  return p.sort((a, b) =>
    state.sort === "price-low"
      ? a.price - b.price
      : state.sort === "price-high"
        ? b.price - a.price
        : state.sort === "rating"
          ? b.rating - a.rating
          : a.id - b.id,
  );
}
function renderProducts() {
  const list = filtered();
  $("#productGrid").innerHTML = list
    .map(
      (p) =>
        `<article class="product-card"><div class="product-image">${p.badge ? `<span class="badge ${p.badge.toLowerCase().replace(" ", "")}">${p.badge}</span>` : ""}<button class="heart ${state.wishes.has(p.id) ? "saved" : ""}" data-wish="${p.id}" aria-label="Save ${p.name}">${state.wishes.has(p.id) ? "♥" : "♡"}</button><img src="${p.image}" alt="${p.name}"></div><div class="product-info"><span class="product-type">${p.category}</span><h3>${p.name}</h3><div class="price-row"><div class="price">${money(p.price)}${p.oldPrice ? `<span class="old-price">${money(p.oldPrice)}</span>` : ""}</div><span class="rating"><span>★</span> ${p.rating}</span></div><button class="add" data-add="${p.id}">Add to bag <b>+</b></button></div></article>`,
    )
    .join("");
  $("#emptyState").hidden = !!list.length;
  document
    .querySelectorAll("[data-add]")
    .forEach((b) => (b.onclick = () => add(+b.dataset.add)));
  document.querySelectorAll("[data-wish]").forEach(
    (b) =>
      (b.onclick = () => {
        const id = +b.dataset.wish;
        state.wishes.has(id) ? state.wishes.delete(id) : state.wishes.add(id);
        renderProducts();
        updateCounts();
      }),
  );
}
function add(id) {
  let item = state.cart.find((x) => x.id === id);
  item ? item.qty++ : state.cart.push({ id, qty: 1 });
  updateCart();
  openDrawer();
}
function updateCounts() {
  const count = state.cart.reduce((n, x) => n + x.qty, 0);
  $("#cartCount").textContent = count;
  $("#drawerCount").textContent = count;
  $("#favoriteCount").textContent = state.wishes.size;
}
function updateCart() {
  updateCounts();
  $("#cartItems").innerHTML = state.cart.length
    ? state.cart
        .map((i) => {
          const p = products.find((p) => p.id === i.id);
          return `<div class="cart-item"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${money(p.price)}</p><div class="qty"><button data-qty="${p.id}" data-change="-1">−</button>${i.qty}<button data-qty="${p.id}" data-change="1">+</button></div></div><button class="remove" data-remove="${p.id}">×</button></div>`;
        })
        .join("")
    : '<p class="empty-state">Your bag is feeling light.</p>';
  $("#total").textContent = money(
    state.cart.reduce(
      (n, i) => n + products.find((p) => p.id === i.id).price * i.qty,
      0,
    ),
  );
  document
    .querySelectorAll("[data-change]")
    .forEach(
      (b) => (b.onclick = () => changeQty(+b.dataset.qty, +b.dataset.change)),
    );
  document.querySelectorAll("[data-remove]").forEach(
    (b) =>
      (b.onclick = () => {
        state.cart = state.cart.filter((i) => i.id !== +b.dataset.remove);
        updateCart();
      }),
  );
}
function changeQty(id, change) {
  const item = state.cart.find((x) => x.id === id);
  item.qty += change;
  if (item.qty < 1) state.cart = state.cart.filter((x) => x.id !== id);
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
$("#search").oninput = (e) => {
  state.search = e.target.value.toLowerCase();
  renderProducts();
};
$("#sort").onchange = (e) => {
  state.sort = e.target.value;
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
