const backendURL = "http://localhost:3000"
const GetOrders = async () => {
    await fetch(`${backendURL}/users/me/orders`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token"),
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
            order.items.forEach((item) => {
                if (item.status === "completed") {
                    return;
                }
                const card = document.createElement("div");
                card.className = "card";

                const imgDiv = document.createElement("div");
                imgDiv.className = "text-center";

                const tableID = document.createElement("h3");
                tableID.textContent = "Table: " + order.tableId;
                tableID.className = "table-id";
                imgDiv.appendChild(tableID);

                const img = document.createElement("img");
                img.src = item.plate.Image; // Assuming `item.plate.img` holds the image URL
                img.alt = item.plate.PlateName;
                img.style = "margin-left: 38%"
                imgDiv.appendChild(img);

                const contentDiv = document.createElement("div");
                contentDiv.className = "content";
                const title = document.createElement("h2");
                title.textContent = item.plate.PlateName;
                const price = document.createElement("h3");
                price.textContent = item.plate.Price.toFixed(2) + " EGP" + " x " + item.quantity + " = " + (item.plate.Price * item.quantity).toFixed(2) + " EGP";
                const button = document.createElement("button");
                button.textContent = "Done";
                button.className = "btn btn-primary";
                button.onclick = async () => {
                    await fetch(`${backendURL}/users/me/orderItem/${item.id}`,{
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                        },
                    })
                    .then(async (res) => {
                        const response = await res.json();
                        console.log(response);
                        card.remove();
                        if (tableDiv.childElementCount === 0) {
                            tableDiv.remove();
                        }
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
                };

                contentDiv.appendChild(title);
                contentDiv.appendChild(price);
                card.appendChild(imgDiv);
                card.appendChild(contentDiv);
                contentDiv.appendChild(button);

                tableDiv.appendChild(card);
            });
        });
    })
    .catch((error) => {
        console.error("Error:", error);
    });
};

GetOrders();