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