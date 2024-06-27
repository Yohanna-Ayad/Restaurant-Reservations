// Order Now Button 

noOfItemsBtn = document.querySelectorAll("#noOfItemsBtn")
CartQyt = document.querySelector(".js-cart-quantity")
var x = 0

noOfItemsBtn.forEach(function (item) {
  item.onclick = function () {

      CartQyt.innerHTML = " "
      CartQyt.innerHTML = ++x
      console.log(x)
    
  }
})