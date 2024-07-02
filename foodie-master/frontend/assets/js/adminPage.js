const backendURL = "http://localhost:3000"
// const GetOrders = async () => {
//     await fetch(`${backendURL}/users/me/orders`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + localStorage.getItem("token"),
//         },
//     })
//     .then(async (res) => {
//         const response = await res.json();
//         console.log(response);
//         const selection = document.getElementById("orders-list");

//         const tableDiv = document.createElement("div");
//         tableDiv.id = "order-items-container";
//         selection.appendChild(tableDiv);

//         response.forEach((order) => {
//             order.items.forEach((item) => {
//                 if (item.status === "completed") {
//                     return;
//                 }
//                 const card = document.createElement("div");
//                 card.className = "card";

//                 const imgDiv = document.createElement("div");
//                 imgDiv.className = "text-center";

//                 const tableID = document.createElement("h3");
//                 tableID.textContent = "Table: " + order.tableId;
//                 tableID.className = "table-id";
//                 imgDiv.appendChild(tableID);

//                 const img = document.createElement("img");
//                 img.src = item.plate.Image; // Assuming `item.plate.img` holds the image URL
//                 img.alt = item.plate.PlateName;
//                 img.style = "margin-left: 38%"
//                 imgDiv.appendChild(img);

//                 const contentDiv = document.createElement("div");
//                 contentDiv.className = "content";
//                 const title = document.createElement("h2");
//                 title.textContent = item.plate.PlateName;
//                 const price = document.createElement("h3");
//                 price.textContent = item.plate.Price.toFixed(2) + " EGP" + " x " + item.quantity + " = " + (item.plate.Price * item.quantity).toFixed(2) + " EGP";
//                 // const button = document.createElement("button");
//                 // button.textContent = "Done";
//                 // button.className = "btn btn-primary";
//                 // button.onclick = async () => {
//                     // await fetch(`${backendURL}/users/me/orderItem/${item.id}`,{
//                         // method: "PATCH",
//                         // headers: {
//                             // "Content-Type": "application/json",
//                             // "Authorization": "Bearer " + localStorage.getItem("token"),
//                 //         },
//                 //     })
//                 //     .then(async (res) => {
//                 //         const response = await res.json();
//                 //         console.log(response);
//                 //         card.remove();
//                 //         if (tableDiv.childElementCount === 0) {
//                 //             tableDiv.remove();
//                 //         }
//                 //     })
//                 //     .catch((error) => {
//                 //         console.error("Error:", error);
//                 //     });
//                 // };

//                 contentDiv.appendChild(title);
//                 contentDiv.appendChild(price);
//                 card.appendChild(imgDiv);
//                 card.appendChild(contentDiv);
//                 // contentDiv.appendChild(button);

//                 tableDiv.appendChild(card);
//             });
//         });
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     });
// };

// GetOrders();


function GetOrdersHistory() {
    fetch(`${backendURL}/admin/orders`, {
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
        
        response.orders.forEach((order) => {
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

            const orderStatus = document.createElement("h3");
            orderStatus.textContent = "Order Status: " + order.status;
            orderStatus.style = "text-align: center; margin-top: 20px; font-size: 20px; color: #000; margin-bottom: 20px;";
            
            parent.appendChild(orderStatus);

        });
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

GetOrdersHistory();