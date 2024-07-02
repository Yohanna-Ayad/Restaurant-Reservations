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
            parent.style = "display: flex; align-items: center; justify-content: center; flex-direction: column; margin-top: 20px; text-align: center;";
            parent.id = order.orderId;
            tableDiv.appendChild(parent);
        
            const tableId = document.createElement("h1");
            tableId.style = "text-align: center; margin-top: 20px; font-size: 30px; color: #000;";
            tableId.textContent = "Table " + order.tableId;
            parent.appendChild(tableId);
        
            const parentContainer = document.createElement("div");
            parentContainer.className = "order-container";
            parentContainer.style = "display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;";
            parent.appendChild(parentContainer);
        
            order.items.forEach((item) => {
                if (item.status === "completed") {
                    return;
                }
        
                const card = document.createElement("div");
                card.className = "card";
                card.style = "background-color: #fff; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); padding: 10px; margin: 10px; display: flex; flex-direction: column; align-items: center; max-width: 200px; hover: transform: scale(1.05); transition: transform 0.3s;";
        
                const imgDiv = document.createElement("div");
                imgDiv.className = "text-center";
        
                const img = document.createElement("img");
                img.src = item.plate.Image; // Assuming `item.plate.img` holds the image URL
                img.alt = item.plate.PlateName;
                img.style = "width: 100px; height: 100px; margin: 0 auto;";
                imgDiv.appendChild(img);
        
                const contentDiv = document.createElement("div");
                contentDiv.className = "content";
                const title = document.createElement("h2");
                title.textContent = item.plate.PlateName;
                const price = document.createElement("h3");
                price.textContent = item.plate.Price.toFixed(2) + " EGP" + " x " + item.quantity + " = " + (item.plate.Price * item.quantity).toFixed(2) + " EGP";
                
        
                contentDiv.appendChild(title);
                contentDiv.appendChild(price);
                // contentDiv.appendChild(button);
                card.appendChild(imgDiv);
                card.appendChild(contentDiv);
                parentContainer.appendChild(card);
            });

            const button = document.createElement("button");
            button.className = "btn btn-primary";
            button.textContent = "Complete Order";
            button.style = "margin-top: 20px;";
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
            parent.appendChild(button);

        });
        
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

GetOrders();
