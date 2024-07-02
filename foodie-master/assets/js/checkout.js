
// cart
let cart = JSON.parse(localStorage.getItem("cart"));
let cartQyt = JSON.parse(localStorage.getItem("cartQyt"));
// if (!cart) {
//   cart = [];
// }

function saveToStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(productName) {
  cart = JSON.parse(localStorage.getItem("cart"));
  let newCart = cart.filter(
    (cartItem) => cartItem.plate.PlateName != productName
  );
  cartQyt = newCart.length;

  localStorage.setItem("cart", JSON.stringify(newCart));
  localStorage.setItem("cartQyt", JSON.stringify(cartQyt));
}

let cartSummaryHTML = "";

function updateBill() {
  cart = JSON.parse(localStorage.getItem("cart"));
  let totalItems = 0;
  let beforeTax = 0,
    tax,
    total;

    var totalPrice = 0;
  cart.forEach((cartItem) => {
    var platePrice = cartItem.plate.Price * cartItem.Quantity
    totalPrice += platePrice;
    totalItems = totalItems + cartItem.Quantity;
    // beforeTax += cartItem.plate.Price;
  });

  tax = 0.1 * totalPrice;
  total = totalPrice + 50 + tax;
  document.querySelectorAll(".qty")[0].innerHTML = totalItems;
  document.querySelectorAll(".total-items")[0].innerHTML =
    "Items (" + totalItems + ") ";
  document.querySelectorAll(".payment-summary-money")[0].innerHTML =
    "$" + totalPrice;
  document.querySelectorAll(".payment-summary-money-beforeTax")[0].innerHTML =
    "$" + (totalPrice + 50);
  document.querySelectorAll(".payment-summary-money-tax")[0].innerHTML =
    "$" + tax;
  document.querySelectorAll(".payment-summary-money-total")[0].innerHTML =
    "$" + total;
}
window.onload = () => {
  updateBill();
};

cart.forEach((cartItem) => {
  cartSummaryHTML += `
    <div class="cart-item-container  js-cart-item-container-${cartItem.plate.PlateName}">
          <div class="cart-item-details-grid">
            <img class="product-image" src="${cartItem.plate.Image}">
            <div class="cart-item-details">
              <div class="product-name">${cartItem.plate.PlateName}</div>
              <div class="product-quantity">Qty: ${cartItem.Quantity}</div>
              <div class="product-price-value">$${cartItem.plate.Price}</div>
              <div class="product-quantity">
                <p>
                  Total: $${cartItem.plate.Price * cartItem.Quantity}
                </p>
              </div>


              <div class="product-quantity">
                <button class="delete-btn delete-quantity-link link-primary js-delete-link" data_product="${cartItem.plate.PlateName}">
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
    const productName = link.attributes.data_product.value;
    removeFromCart(productName);
    const container = document.querySelector(".cart-item-container");
    container.remove();
    updateBill();
  });
});

