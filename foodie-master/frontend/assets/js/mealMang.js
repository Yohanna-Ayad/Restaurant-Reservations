
// script.js

const searchInput = document.getElementById('user-search-input');
const userSearchBtn = document.getElementById('user-search-btn');
const mealTableBody = document.getElementById('user-table-body');

const token = localStorage.getItem('token');
// const meals = await fetch('http://localhost:3000/admin/Plate', {

let meals = [
    { id:1, img: "https://johan22.sirv.com/ca779719-6931-444a-bb90-c0a5c93b480c", plateName: 'Spaghetti Carbonara', Category: 'Pasta',price:"12.99" ,description:"Classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper."},
    { id:2, img:"https://johan22.sirv.com/7e01933d-31ca-4e66-91ff-d939251c2079", plateName: 'Chicken Tikka Masala', Category: 'Curry' ,price:"14.99",description:"Creamy and flavorful Indian curry dish made with marinated chicken, tomatoes, and spices."},
    { id:3, img: "https://johan22.sirv.com/7b3c8e5a-928b-4d28-a8ea-c9a29c1d8a75", plateName: 'Caesar Salad', Category: 'Salad' ,price:" 8.99" ,description:"Classic salad made with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing."},
    // add more users here
];

userSearchBtn.addEventListener('click', searchUsers);

function searchUsers() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredMeals = meals.filter(meal => {
        return meal.plateName.toLowerCase().includes(searchTerm) || meal.Category.toLowerCase().includes(searchTerm);
    });
    renderUserList(filteredMeals);
}

function renderUserList(meals) {
    mealTableBody.innerHTML = '';
    meals.forEach(meal => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${meal.id}</td>
            <td><img src=${meal.img} class="product-image"></td>
            <td>${meal.plateName}</td>
            <td>${meal.Category}</td>
            <td>${meal.price}</td>
            <td>${meal.description}</td>
            <td>
                <button class="btn cancle-btn delete-btn" data-user-id="${meal.id}">Delete</button>
                <button class="btn complete-btn update-btn" data-user-id="${meal.id}">Update</button>

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