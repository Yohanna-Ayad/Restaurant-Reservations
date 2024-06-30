const backendURL = "http://localhost:3000"
const searchInput = document.getElementById("user-search-input");
const userSearchBtn = document.getElementById("user-search-btn");
const userTableBody = document.getElementById("user-table-body");

const token = localStorage.getItem("token");

const users = [];

const fetchUsers = async () => {
  const response = await fetch(`${backendURL}/admin/members`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  if (response.ok) {
    users.push(...responseData.members);
    renderUserList(users);
  } else {
    alert(responseData.error);
  }
};

fetchUsers();

userSearchBtn.addEventListener("click", searchUsers);

function searchUsers() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
  });
  renderUserList(filteredUsers);
}

function renderUserList(users) {
  userTableBody.innerHTML = "";
  users.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            
            <td>
                <button class="btn cancle-btn delete-btn" data-user-id="${user.id}">Delete</button>
            </td>
            
        `;
    userTableBody.appendChild(row);
  });
}

renderUserList(users);

const deleteMember = async (id) => {
  const response = await fetch(`${backendURL}/admin/members${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  if (response.ok) {
    alert("Member deleted successfully");
  } else {
    alert(responseData.error);
  }
};

userTableBody.addEventListener("click", deleteUser);

function deleteUser(event) {
  if (event.target.classList.contains("delete-btn")) {
    const userId = event.target.dataset.userId;
    const index = users.findIndex((user) => user.id === parseInt(userId));

    deleteMember(userId);

    if (index !== -1) {
      users.splice(index, 1);
      renderUserList(users);
    }
  }
}
