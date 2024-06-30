const backendURL = "http://localhost:3000"
const logoutAPI = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${backendURL}/logout`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (response.status === 200) {
        localStorage.removeItem("token");
        // window.location.href = "/index.html";
    } else {
        alert("Something went wrong");
    }
}

if (!localStorage.getItem("token")) {
    localStorage.removeItem("token");
    window.location.href = "./login.html";
}

const addMember = async () => {
    const token = localStorage.getItem("token");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const data = {
        name,
        email,
        password,
        role
    };
    console.log(data)
    const response = await fetch(`${backendURL}/admin/members`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
        alert("Member added successfully");
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("role").value = "";
    } else {
        alert(responseData.error);
    }
}