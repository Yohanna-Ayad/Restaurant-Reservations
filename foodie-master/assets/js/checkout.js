const backendURL = "http://localhost:3000"

const orderSummary = document.querySelector(".js-order-summary")
let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [];
}

const data = {
  offset: 0,
  limit: 10,
};
orderSummary.innerHTML = "";
const response = await fetch(`${backendURL}/plates`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      console.error(response.json());
      throw new Error("Failed to fetch Plates");
    }
  })
   
        cart.forEach((cartItem) => {
          // if (cartItem.PlateName === element.PlateName) {
        
            orderSummary += `
            <div class="cart-item-container  js-cart-item-container-${cartItem.PlateName}">
                  <div class="cart-item-details-grid">
                    <img class="product-image" src="${cartItem.Image}">
                    <div class="cart-item-details">
                      <div class="product-name">${cartItem.PlateName}</div>
                      <div class="product-price">$${cartItem.Price}</div>
                      <div class="product-quantity">
                        <button class="delete-btn delete-quantity-link link-primary js-delete-link" data-product-name="${cartItem.PlateName}">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            `;}
        
      }); 
        document.querySelector(".js-order-summary").innerHTML = orderSummary;




// function addToCart(){
  
// cart.forEach((cartItem) => {
//   cartSummaryHTML += `
//     <div class="cart-item-container  js-cart-item-container-${cartItem.PlateName}">
//           <div class="cart-item-details-grid">
//             <img class="product-image" src="${cartItem.Image}">
//             <div class="cart-item-details">
//               <div class="product-name">${cartItem.PlateName}</div>
//               <div class="product-price">$${cartItem.Price}</div>
//               <div class="product-quantity">
//                 <button class="delete-btn delete-quantity-link link-primary js-delete-link" data-product-name="${cartItem.PlateName}">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//     `;

// });    
// document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// }
// // cart
// let cart = JSON.parse(localStorage.getItem("cart"));
// if (!cart) {
//   cart = [];
// }

// function saveToStorage() {
//   localStorage.setItem("cart", JSON.stringify(cart));
// }

// function removeFromCart(productName) {
//   const newCart = [];
//   cart.forEach((cartItem) => {
//     if (cartItem.productName !== productName) {
//       newCart.push(cartItem);
//     }
//   });
//     cart = newCart;
//     saveToStorage();
// }


// let cartSummaryHTML = "";

// function updateBill() {
//   let totalItems = 0;
//   let beforeTax = 0,
//     tax,
//     total;
//   cart.forEach((cartItem) => {
//     totalItems++;
//     beforeTax +=  cartItem.Price;
//   });

//   tax = 0.1 * beforeTax;
//   total = beforeTax + 50 + tax;
//   document.querySelectorAll(".qty")[0].innerHTML = totalItems;
//   document.querySelectorAll(".total-items")[0].innerHTML =
//     "Items (" +totalItems + ") ";
//   document.querySelectorAll(".payment-summary-money")[0].innerHTML = "$"+ beforeTax;
//   document.querySelectorAll(".payment-summary-money-beforeTax")[0].innerHTML = "$"+ (beforeTax + 50);
//   document.querySelectorAll(".payment-summary-money-tax")[0].innerHTML = "$"+ tax;
//   document.querySelectorAll(".payment-summary-money-total")[0].innerHTML = "$"+ total;
// }
// window.onload = () => {
//   updateBill();
// };


// cart.forEach((cartItem) => {
//   cartSummaryHTML += `
//     <div class="cart-item-container  js-cart-item-container-${cartItem.PlateName}">
//           <div class="cart-item-details-grid">
//             <img class="product-image" src="${cartItem.Image}">
//             <div class="cart-item-details">
//               <div class="product-name">${cartItem.PlateName}</div>
//               <div class="product-price">$${cartItem.Price}</div>
//               <div class="product-quantity">
//                 <button class="delete-btn delete-quantity-link link-primary js-delete-link" data-product-name="${cartItem.PlateName}">
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//     `;

// });

    
// document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

// document.querySelectorAll(".js-delete-link").forEach((link) => {
//   link.addEventListener("click", () => {
//     const productName = link.dataset.PlateName;
//     removeFromCart(productName);
//     const container = document.querySelector(".cart-item-container" );
//     container.remove();
//     updateBill();
   
//   });
// });




