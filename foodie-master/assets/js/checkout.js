
// cart
let cart = JSON.parse(localStorage.getItem("cart"));
let cartQyt = JSON.parse(localStorage.getItem("cartQyt"));
let cartSummaryHTML = "";

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
  document.querySelectorAll(".total-items")[0].innerHTML =
    "Items (" + totalItems + ") ";
  document.querySelectorAll(".payment-summary-money")[0].innerHTML =
    "$" + totalPrice.toFixed(2);
  document.querySelectorAll(".payment-summary-money-beforeTax")[0].innerHTML =
    "$" + (totalPrice + 50).toFixed(2);
  document.querySelectorAll(".payment-summary-money-tax")[0].innerHTML =
    "$" + tax.toFixed(2);
  document.querySelectorAll(".payment-summary-money-total")[0].innerHTML =
    "$" + total.toFixed(2);
}


function displayCart(){
  cart.forEach((cartItem) => {
    cartSummaryHTML += `
      <div class="cart-item-container  js-cart-item-container-${cartItem.plate.PlateName}">
            <div class="cart-item-details-grid">
              <img class="product-image" src="${cartItem.plate.Image}">
              <div class="cart-item-details">
  
                <button class="deleteBtn js-delete-link" data_product="${cartItem.plate.PlateName}" onclick="deleteItem()">X</button>
                <h3>${cartItem.plate.PlateName}</h3>
                <p> Qty: ${cartItem.Quantity}</p>
                <p> Price: $${cartItem.plate.Price}</p>
                <p> Total: $${cartItem.plate.Price * cartItem.Quantity}</p>
               
              </div>
            </div>
          </div>
      `;
  });
  
  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
}

displayCart()
function deleteItem(event){
  
  const productName = event.getAttribute("data_product");
    
  console.log('Product Name:', productName);
  
  removeFromCart(productName);
  
  const container = event.closest(".cart-item-container");
  console.log('Container:', container);
  
  if (container) {
    container.remove();
  } else {
    console.error('Container not found for:', productName);
  }
  
  updateBill();

}
document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    deleteItem(link)
  });
});

function confirmOrder() {
  cart = JSON.parse(localStorage.getItem("cart"));
  const body = {
    cart: cart,
    tableId: localStorage.getItem("tableId"),
  };

  fetch("http://192.168.1.7:3000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (response.status === 200) {
      alert("Order placed successfully!");
      localStorage.removeItem("cart");
      localStorage.removeItem("cartQyt");
      localStorage.removeItem("tableId");
      window.location.href = "index.html";
    } else {
      alert("An error occurred. Please try again later.");
    }
  });
}

window.onload = () => {
  updateBill();
};