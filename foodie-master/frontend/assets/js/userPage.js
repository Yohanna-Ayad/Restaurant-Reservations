const backendURL = "http://localhost:3000";
const GetOrders = async () => {
  await fetch(`${backendURL}/users/me/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then(async (res) => {
      const response = await res.json();
      console.log(response);
      const selection = document.getElementById("orders-list");

      const tableDiv = document.createElement("div");
      tableDiv.id = "order-items-container";
      selection.appendChild(tableDiv);

      response.forEach((order) => {
        const parent = document.createElement("div");
        parent.className = "parent-container";
        parent.style ="display: flex; align-items: center; justify-content: center; flex-direction: column; margin-top: 20px; text-align: center;";
        parent.id = order.orderId;
        tableDiv.appendChild(parent);

        const tableId = document.createElement("p");
        tableId.style = " margin-top: 20px; font-size: 18px;";
        tableId.textContent = "Table# " + order.tableId;
        parent.appendChild(tableId);

        const parentContainer = document.createElement("div");
        parentContainer.className = "order-container";
        // parentContainer.style ="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;";
        parent.appendChild(parentContainer);

        order.items.forEach((item) => {
          if (item.status === "completed") {
            return;
          }

          const card = document.createElement("div");
          card.className = "card";
          // card.style ="background-color: #fff; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 10px; margin: 10px; display: flex; flex-direction: column; align-items: center; max-width: 200px; hover: transform: scale(1.05); transition: transform 0.3s;";

          const imgDiv = document.createElement("div");
          imgDiv.className = "text-center";

          const img = document.createElement("img");
          img.src = item.plate.Image; // Assuming `item.plate.img` holds the image URL
          img.alt = item.plate.PlateName;
          img.style = " width: 100px; height: 100px; border-radius: 50%; margin-left: auto; margin-right: auto;"
          imgDiv.appendChild(img);

          const contentDiv = document.createElement("div");
          contentDiv.className = "content";
          const title = document.createElement("span");
          title.id="plateName"
          title.textContent = item.plate.PlateName;
          const price = document.createElement("span");
          price.id = "price"
          price.textContent = " $"+ item.plate.Price.toFixed(2);
          const qyt = document.createElement("span");
          qyt.textContent = "Qyt: " + item.quantity;
          const totalPrice = document.createElement("div")
          totalPrice.className="totalPrice"
          totalPrice.textContent = "Total Price: $" + (item.plate.Price * item.quantity).toFixed(2)
          contentDiv.appendChild(title);
          contentDiv.appendChild(price);
          contentDiv.appendChild(qyt);
          contentDiv.appendChild(totalPrice);
          // contentDiv.appendChild(button);
          card.appendChild(imgDiv);
          card.appendChild(contentDiv);
          parentContainer.appendChild(card);
      });

        const buttonDiv = document.createElement("div");
        buttonDiv.style = "display: flex; justify-content: space; align-items: center; ";

        const button = document.createElement("button");
        button.className = "btn complete-btn";
        button.textContent = "Complete Order";
        // button.style = "margin-top: 20px; margin-right: 20px;";
        button.onclick = async () => {
          await fetch(`${backendURL}/users/me/orders/${order.orderId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ status: "completed" }),
          })
            .then(async (res) => {
              const response = await res.json();
              console.log(response);
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        };

        const button2 = document.createElement("button");
        button2.className = "btn cancle-btn";
        button2.textContent = "Cancel Order";
        // button2.style = "margin-top: 20px; margin-left: 20px;";
        button2.onclick = async () => {
          try {
            const res = await fetch(
              `${backendURL}/users/me/orders/${order.orderId}`,
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({ status: "cancelled" }),
              }
            );

            // Check if the response is OK
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const response = await res.json();
            console.log(response);
            window.location.reload();
          } catch (error) {
            console.error("Error:", error);
          }
        };

        buttonDiv.appendChild(button);
        buttonDiv.appendChild(button2);
        parent.appendChild(buttonDiv);

        // parent.appendChild(button);
        // parent.appendChild(button2);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

GetOrders();


function refreshPage() {
  window.location.reload();
}

function refreshPageAfter1min() {
  setTimeout(refreshPage, 30000);
}

refreshPageAfter1min();