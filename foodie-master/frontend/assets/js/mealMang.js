
// script.js
const searchInput = document.getElementById('user-search-input');
const userSearchBtn = document.getElementById('user-search-btn');
const mealTableBody = document.getElementById('user-table-body');

const token = localStorage.getItem('token');
// 
// var offset = 0;


var offset = 0;
const meals = fetch('http://localhost:3000/plates', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        limit: 10,
        offset: offset
    })  
}).then(async(response) =>{
    const data = await response.json();
    console.log(data);
    renderUserList(data);
}).catch(error => {
    console.error(error);
});


// let meals = [
//     { id:1, img: "https://johan22.sirv.com/ca779719-6931-444a-bb90-c0a5c93b480c", plateName: 'Spaghetti Carbonara', Category: 'Pasta',price:"12.99" ,description:"Classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper."},
//     { id:2, img:"https://johan22.sirv.com/7e01933d-31ca-4e66-91ff-d939251c2079", plateName: 'Chicken Tikka Masala', Category: 'Curry' ,price:"14.99",description:"Creamy and flavorful Indian curry dish made with marinated chicken, tomatoes, and spices."},
//     { id:3, img: "https://johan22.sirv.com/7b3c8e5a-928b-4d28-a8ea-c9a29c1d8a75", plateName: 'Caesar Salad', Category: 'Salad' ,price:" 8.99" ,description:"Classic salad made with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing."},
//     // add more users here
// ];

userSearchBtn.addEventListener('click', searchUsers);

function searchUsers() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredMeals = meals.filter(meal => {
        return meal.PlateName.toLowerCase().includes(searchTerm) || meal.Category.toLowerCase().includes(searchTerm);
    });
    renderUserList(filteredMeals);
}

function renderUserList(meals) {
    mealTableBody.innerHTML = '';
    meals.forEach(meal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${meal.id}</td>
            <td><img src=${meal.Image} class="product-image"></td>
            <td>${meal.PlateName}</td>
            <td>${meal.Category}</td>
            <td>${meal.Price}</td>
            <td>${meal.Discount *100} %</td>
            <td>${meal.Description}</td>    
            <td>
                <button class="btn cancle-btn delete-btn" onclick="deletePlate(${meal.id})">Delete</button>
                <button class="btn complete-btn update-btn" onclick="updatePlate(${meal.id})">Update</button>

            </td>
            
        `;
        mealTableBody.appendChild(row);
    });
}

renderUserList(meals);

mealTableBody.addEventListener('click', deleteUser);

function deleteUser(event) {
    if (event.target.classList.contains('delete-btn')) {
        const userId = event.target.dataset.userId;
        const index = meals.findIndex(meal => meal.id === parseInt(userId));
        if (index !== -1) {
            meals.splice(index, 1);
            renderUserList(meals);
        }
    }
}

function getPrevoiusPage() {
    offset -= 10;
    if (offset < 0) {
        offset = 0;
        return;
    }
    fetch('http://localhost:3000/plates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            limit: 10,
            offset: offset
        })  
    }).then(async(response) =>{
        const data = await response.json();
        console.log(data);
        if (data.length === 0) {
            offset += 10;
            return;
        }
        document.getElementById('pageCount').innerHTML = document.getElementById('pageCount').innerHTML - 1;
        renderUserList(data);
    }).catch(error => {
        console.error(error);
    });
}

function getNextPage() {
    offset += 10;
    fetch('http://localhost:3000/plates', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            limit: 10,
            offset: offset
        })  
    }).then(async(response) =>{
        const data = await response.json();
        console.log(data);
        if (data.length === 0) {
            offset -= 10;
            return;
        }
        document.getElementById('pageCount').innerHTML = offset/10 + 1;

        renderUserList(data);
    }).catch(error => {
        console.error(error);
    });
}

function deletePlate(id) {
    fetch(`http://localhost:3000/admin/plate/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(async(response) =>{
        const data = await response.json();
        console.log(data);
        if (data.error) {
            alert(data.error);
            return;
        }
        alert(data.message);
        location.reload();
    }).catch(error => {
        console.error(error);
    });
}

