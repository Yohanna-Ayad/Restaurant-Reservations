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
  let newCart = cart.filter((cartItem)=> cartItem.PlateName != productName)
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

  cart.forEach((cartItem) => {
    totalItems++;
    beforeTax +=  cartItem.Price;
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
  cartSummaryHTML += `
    <div class="cart-item-container  js-cart-item-container-${cartItem.PlateName}">
          <div class="cart-item-details-grid">
            <img class="product-image" src="${cartItem.Image}">
            <div class="cart-item-details">
              <div class="product-name">${cartItem.PlateName}</div>
              <div class="product-price">$${cartItem.Price}</div>
              <div class="product-quantity">
                <button class="delete-btn delete-quantity-link link-primary js-delete-link" data_product="${cartItem.PlateName}">
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
    const container = document.querySelector(".cart-item-container" );
    container.remove();
    updateBill();
   
  });
});




