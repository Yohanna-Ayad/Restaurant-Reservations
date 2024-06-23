
// script.js

const searchInput = document.getElementById('user-search-input');
const userSearchBtn = document.getElementById('user-search-btn');
const userTableBody = document.getElementById('user-table-body');

let users = [
    { id: 1, name: 'john Doe', email: 'johndoe@example.com',password:"johndoe123" },
    { id: 2, name: 'jane Doe', email: 'janedoe@example.com' ,password:"janedoe123"},
    { id: 3, name: 'bob Smith', email: 'bobsmith@example.com' ,password:"bobsmith123"},
    // add more users here
];

userSearchBtn.addEventListener('click', searchUsers);

function searchUsers() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
    });
    renderUserList(filteredUsers);
}

function renderUserList(users) {
    userTableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
             <td>${user.password}</td>
            <td>
                <button class="btn cancle-btn delete-btn" data-user-id="${user.id}">Delete</button>
            </td>
            
        `;
        userTableBody.appendChild(row);
    });
}

renderUserList(users);

userTableBody.addEventListener('click', deleteUser);

function deleteUser(event) {
    if (event.target.classList.contains('delete-btn')) {
        const userId = event.target.dataset.userId;
        const index = users.findIndex(user => user.id === parseInt(userId));
        if (index !== -1) {
            users.splice(index, 1);
            renderUserList(users);
        }
    }
}