const backendURL = "http://localhost:3000";
const loginForm = document.getElementById("login-form");


const loginAPI = async () =>{
    // e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const data = {
        email,
        password
    };
    console.log(data)
    const response = await fetch(`${backendURL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log(responseData);
    if (response.status === 200) {
        localStorage.setItem("token", responseData.user.token);
        if (responseData.user.user.role === "admin") {
            window.location.href = "./adminpage.html";
        }
        if (responseData.user.user.role === "user") {
          window.location.href = "/userpage.html";
      }
      // window.location.href = "/index.html";
    } else {
        alert(responseData.error);
    }
};