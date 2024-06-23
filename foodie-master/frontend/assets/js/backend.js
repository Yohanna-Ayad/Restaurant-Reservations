const backendURL = "localhost:3000"
const getCategories = async () => {
  const response = await fetch( `http://${backendURL}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch Categories");
      }
    })
    .then((data) => {
      console.log(data);
      const categorySelection = document.getElementById("fiter-list");
      categorySelection.innerHTML = "";
      const list1 = document.createElement("li");
      list1.style =
        "display: flex; flex-wrap: wrap; width:100px justify-content: center; gap: 10px;";
      const button1 = document.createElement("button");
      button1.style =
        "background-color: var(--white); color: var(--color, var(--rich-black-fogra-29)); font-family: var(--ff-rubik); font-weight: var(--fw-500); padding: 5px 20px; border: 1px solid var(--border-color, var(--cultured));background-color: var(--deep-saffron);"
      button1.onclick = function() {
        
        const buttons = document.querySelectorAll("button");
        buttons.forEach((btn) => {
          btn.style.backgroundColor = "var(--white)";
          btn.style.color = "var(--color, var(--rich-black-fogra-29))";
          btn.style.borderColor = "var(--border-color, var(--cultured))";
        });
        button1.style.backgroundColor = "var(--deep-saffron)";
        button1.style.color = "var(--white)";
        button1.style.borderColor = "var(--deep-saffron)";
      };
      
      button1.id = "all";
      button1.textContent = "All";

      list1.appendChild(button1);
      categorySelection.appendChild(list1);

      data.forEach((element) => {
        const list = document.createElement("li");
        list.style =
          "display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;";
        const button = document.createElement("button");
        button.style =
          "background-color: var(--white); color: var(--color, var(--rich-black-fogra-29)); font-family: var(--ff-rubik); font-weight: var(--fw-500); padding: 5px 20px; border: 1px solid var(--border-color, var(--cultured));";
        button.onclick = function() {
          const buttons = document.querySelectorAll("button");
          buttons.forEach((btn) => {
            btn.style.backgroundColor = "var(--white)";
            btn.style.color = "var(--color, var(--rich-black-fogra-29))";
            btn.style.borderColor = "var(--border-color, var(--cultured))";
          });
          button.style.backgroundColor = "var(--deep-saffron)";
          button.style.color = "var(--white)";
          button.style.borderColor = "var(--deep-saffron)";
        };
        button.id = element;
        button.textContent = element;
        console.log(button);
        // button.onclick()
        list.appendChild(button);
        categorySelection.appendChild(list);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

window.onclick = function (event) {
  const category = event.target.id;
  console.log(category);
  if (category) {
    getFilteredRestaurants(category);
  }
};

const getFilteredRestaurants = async (category) => {
  console.log(category);
  const data = {
    offset: 0,
    limit: 10,
    Category: category,
  };

  const response = await fetch(`http://${backendURL}/category`, {
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
    .then((data) => {
      console.log(data);
      document.getElementById("food-menu-list").innerHTML = "";

      data.forEach((element) => {
        const list = document.createElement("li");
        const card = document.createElement("div");
        card.className = "food-menu-card";
        const cardBanner = document.createElement("div");
        cardBanner.className = "card-banner";
        const img = document.createElement("img");
        img.src = element.Image;
        img.width = 300;
        img.height = 300;
        img.loading = "lazy";
        img.alt = element.PlateName;
        img.className = "w-100";
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = element.Discount * 100 + "%";
        const button = document.createElement("button");
        button.className = "btn food-menu-btn";
        button.textContent = "Order Now";
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        const category = document.createElement("p");
        category.className = "category";
        category.textContent = element.Category;
        const ratingWrapper = document.createElement("div");
        ratingWrapper.className = "rating-wrapper";
        // const rating = document.createElement("ion-icon");
        // rating.name = "star";
        const h3 = document.createElement("h3");
        h3.className = "h3 card-title";
        h3.textContent = element.PlateName;
        const priceWrapper = document.createElement("div");
        priceWrapper.className = "price-wrapper";
        const priceText = document.createElement("p");
        priceText.className = "price-text";
        priceText.textContent = "Price:";
        const price = document.createElement("data");
        price.className = "price";
        price.textContent = "$" + element.Price;
        const del = document.createElement("del");
        del.className = "del";
        del.value = "$" + element.Price;
        if (element.Discount > 0) {
          del.textContent = "$" + element.Price * (1 + element.Discount); // 100 - 20 = 80
        }
        cardBanner.appendChild(img);
        cardBanner.appendChild(badge);
        cardBanner.appendChild(button);
        wrapper.appendChild(category);
        // ratingWrapper.appendChild(rating);
        // ratingWrapper.appendChild(rating);
        // ratingWrapper.appendChild(rating);
        // ratingWrapper.appendChild(rating);
        // ratingWrapper.appendChild(rating);
        wrapper.appendChild(ratingWrapper);
        card.appendChild(cardBanner);
        card.appendChild(wrapper);
        card.appendChild(h3);
        priceWrapper.appendChild(priceText);
        priceWrapper.appendChild(price);
        priceWrapper.appendChild(del);
        card.appendChild(priceWrapper);
        list.appendChild(card);
        document.getElementById("food-menu-list").appendChild(list);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

var count = 0;
const cart = [];

const getPlates = async () => {
  const data = {
    offset: 0,
    limit: 10,
  };

  const response = await fetch(`http://${backendURL}/plates`, {
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
    .then((data) => {
      console.log(data);
      document.getElementById("food-menu-list").innerHTML = "";

      data.forEach((element) => {
        const list = document.createElement("li");
        const card = document.createElement("div");
        card.className = "food-menu-card";
        const cardBanner = document.createElement("div");
        cardBanner.className = "card-banner";
        const img = document.createElement("img");
        img.src = element.Image;
        img.width = 300;
        img.height = 300;
        img.loading = "lazy";
        img.alt = element.PlateName;
        img.className = "w-100";
        const badge = document.createElement("div");
        badge.className = "badge";
        badge.textContent = element.Discount * 100 + "%";
        const button = document.createElement("button");
        button.className = "btn food-menu-btn";
        button.textContent = "Order Now";
        button.onclick = function() {
          cart.push(element);
          console.log(cart)
          localStorage.setItem("cart", JSON.stringify(cart));
          count++;
          console.log(count)
          localStorage.setItem("count", count);
        };
        const wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        const category = document.createElement("p");
        category.className = "category";
        category.textContent = element.Category;
        const ratingWrapper = document.createElement("div");
        ratingWrapper.className = "rating-wrapper";
        // const rating = document.createElement("ion-icon");
        // rating.name = "star";
        const h3 = document.createElement("h3");
        h3.className = "h3 card-title";
        h3.textContent = element.PlateName;
        const priceWrapper = document.createElement("div");
        priceWrapper.className = "price-wrapper";
        const priceText = document.createElement("p");
        priceText.className = "price-text";
        priceText.textContent = "Price:";
        const price = document.createElement("data");
        price.className = "price";
        price.textContent = "$" + element.Price;
        const del = document.createElement("del");
        del.className = "del";
        del.value = "$" + element.Price;
        if (element.Discount > 0) {
          del.textContent = "$" + element.Price * (1 + element.Discount); // 100 - 20 = 80
        }
        cardBanner.appendChild(img);
        cardBanner.appendChild(badge);
        cardBanner.appendChild(button);
        wrapper.appendChild(category);
        // ratingWrapper.appendChild(rating);
        // ratingWrapper.appendChild(rating);
        // ratingWrapper.appendChild(rating);
        // ratingWrapper.appendChild(rating);
        // ratingWrapper.appendChild(rating);
        wrapper.appendChild(ratingWrapper);
        card.appendChild(cardBanner);
        card.appendChild(wrapper);
        card.appendChild(h3);
        priceWrapper.appendChild(priceText);
        priceWrapper.appendChild(price);
        priceWrapper.appendChild(del);
        card.appendChild(priceWrapper);
        list.appendChild(card);
        document.getElementById("food-menu-list").appendChild(list);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};


getPlates();