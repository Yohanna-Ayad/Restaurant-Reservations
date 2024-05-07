'use strict';

/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * search box toggle
 */

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}



/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});


// Shopping Cart
// Quantity

const currentValue = []; // Initial value

document.addEventListener("DOMContentLoaded", function () {
  const decreaseBtns = document.querySelectorAll(".decrease-btn");
  const increaseBtns = document.querySelectorAll(".increase-btn");
  const quantityInputs = document.querySelectorAll(".quantity-input");

  decreaseBtns.forEach(function (decreaseBtn, index) {
    currentValue[index] = Number(quantityInputs[index].value);
    decreaseBtn.addEventListener("click", function () {
      if (currentValue[index] > 0) {
        currentValue[index] -= 1;
        quantityInputs[index].value = currentValue[index];
        
      }
    });
  });

  increaseBtns.forEach(function (increaseBtn, index) {
    increaseBtn.addEventListener("click", function () {
      currentValue[index] = Number(quantityInputs[index].value);
      currentValue[index] += 1;
      quantityInputs[index].value = currentValue[index];
    });
  });

 
});

// resturant

// cart
let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
 function addToCart(productName) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productName === cartItem.productName) {
      matchingItem = cartItem;
    }
  });
  let index;
  document.querySelectorAll(".js-add-to-cart").forEach((button, i) => {
    if (button.dataset.productName == productName) {
      index = i;
    }
  });
  if (matchingItem) {
    matchingItem.quantity = currentValue[index];
  } else {
    cart.push({
      productName: productName,
      quantity: currentValue[index],
    });
  }
    saveToStorage();
  if (currentValue[index] == 0) {
    removeFromCart(productName);
  }
}
function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

function updateProductQuantity() {
  let containers = document.querySelectorAll(".product-container");
  containers.forEach((con) => {
    let name = con
      .querySelectorAll(".product-namelimit-text-to-2-lines")[0]
      .innerHTML.trim();

    let input = con.querySelectorAll(".quantity-input")[0];
    cart.forEach((cartItem) => {
      if (cartItem.productName.localeCompare(name) == 0) {
        input.value = cartItem.quantity;
      }
    });
  });
}
window.onload = () => {
  updateCartQuantity();
  // updateProductQuantity();
};
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.productName;

    addToCart(productName);
    updateCartQuantity();
  });
});









