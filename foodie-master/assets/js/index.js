window.onload = ()=>{
    let cartQyt =JSON.parse(localStorage.getItem("cartQyt"));
    let cartQtyElement = document.querySelector(".js-cart-quantity")
    cartQtyElement.innerHTML = cartQyt;
}