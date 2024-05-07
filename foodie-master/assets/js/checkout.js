
// cart
let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(productName) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productName !== productName) {
      newCart.push(cartItem);
    }
  });
    cart = newCart;
    saveToStorage();
}

let products = [
  {
    image: "./assets/images/food-menu-1.png",
    name: "Fried Chicken Unlimited",
    rating: {
      stars: 5.0,
    },
    price: 49,
  },
  {
    image: "./assets/images/food-menu-2.png",
    name: "Burger King Whopper",
    rating: {
      stars: 5.0,
    },
    price: 29,
  },
  {
    image: "./assets/images/food-menu-3.png",
    name: "White Castle Pizzas",
    rating: {
      stars: 5.0,
    },
    price: 49,
  },
  {
    image: "./assets/images/food-menu-4.png",
    name: "Bell Burrito Supreme",
    rating: {
      stars: 5.0,
    },
    price: 59,
  },
  {
    image: "./assets/images/food-menu-5.png",
    name: "Kung Pao Chicken BBQ",
    rating: {
      stars: 5.0,
    },
    price: 49,
  },
  {
    image: "./assets/images/food-menu-6.png",
    name: "Wendy's Chicken",
    rating: {
      stars: 5.0,
    },
    price: 49,
  }
];

let cartSummaryHTML = "";


function updateBill() {
  let totalItems = 0;
  let beforeTax = 0,
    tax,
    total;
  cart.forEach((cartItem) => {
    totalItems++;
    products.forEach((product) => {
      if (product.name == cartItem.productName) {
        beforeTax += cartItem.quantity * product.price;
      }
    });
  });

  tax = 0.1 * beforeTax;
  total = beforeTax + 50 + tax;
  document.querySelectorAll(".qty")[0].innerHTML = totalItems;
  document.querySelectorAll(".total-items")[0].innerHTML =
    "Items (" +totalItems + ") ";
  document.querySelectorAll(".payment-summary-money")[0].innerHTML = "$"+ beforeTax;
  document.querySelectorAll(".payment-summary-money-beforeTax")[0].innerHTML = "$"+ (beforeTax + 50);
  document.querySelectorAll(".payment-summary-money-tax")[0].innerHTML = "$"+ tax;
  document.querySelectorAll(".payment-summary-money-total")[0].innerHTML = "$"+ total;
}
window.onload = () => {
  updateBill();
};
cart.forEach((cartItem) => {
  const productName = cartItem.productName;

  let matchingProduct;
  products.forEach((product) => {
    if (product.name === productName) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container  js-cart-item-container-${matchingProduct.name}">
          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">
            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">$${matchingProduct.price}</div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <button class="delete-btn delete-quantity-link link-primary js-delete-link" data-product-name="${matchingProduct.name}">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
    `;
});



document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const productName = link.dataset.productName;
    removeFromCart(productName);
    const container = document.querySelector(".cart-item-container"
    );
    container.remove();
    updateBill();
  });
});