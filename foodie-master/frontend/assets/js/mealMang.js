const backendURL = "http://localhost:3000"// script.js
const searchInput = document.getElementById('user-search-input');
const mealSearchBtn = document.getElementById('user-search-btn');
const mealTableBody = document.getElementById('user-table-body');

const token = localStorage.getItem('token');
// 
// var offset = 0;

const meals = [];
var offset = 0;
const fetchMeals  = async () => { 
    const response = await fetch(`${backendURL}/plates`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        limit: 10,
        offset: offset
    })  
})
const responseData = await response.json();
console.log(responseData);
if (response.ok) {
  meals.push(...responseData);
  renderMealList(meals);
} else {
  alert(responseData.error);
}
};

fetchMeals();


mealSearchBtn.addEventListener('click', searchMeals);

function searchMeals() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredMeals = meals.filter(meal => {
        return(
            meal.PlateName.toLowerCase().includes(searchTerm) || 
            meal.Category.toLowerCase().includes(searchTerm));
    });
    renderMealList(filteredMeals);
}

function renderMealList(meals) {
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

renderMealList(meals);


function getPrevoiusPage() {
    offset -= 10;
    if (offset < 0) {
        offset = 0;
        return;
    }
    fetch(`${backendURL}/plates`, {
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
        renderMealList(data);
    }).catch(error => {
        console.error(error);
    });
}

function getNextPage() {
    offset += 10;
    fetch(`${backendURL}/plates`, {
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

        renderMealList(data);
    }).catch(error => {
        console.error(error);
    });
}

function deletePlate(id) {
    fetch(`${backendURL}/admin/plate/${id}`, {
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

function updatePlate(id) {
    localStorage.setItem('plateID', id);
    window.location.href = 'updateMeal.html';  
}

function updateMeal(){
    window.location.href = 'mealsMang.html';

}