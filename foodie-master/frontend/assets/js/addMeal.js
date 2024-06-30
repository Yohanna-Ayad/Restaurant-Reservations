const addMeal = async () => {
    const token = localStorage.getItem("token");
    const PlateName = document.getElementById("PlateName").value;
    const Category = document.getElementById("Category").value;
    const Price = document.getElementById("Price").value;
    const Discount = document.getElementById("Discount").value;
    const Description = document.getElementById("Description").value;
    const Image = document.getElementById("Image").files[0]; // get the file

    // Create a FormData object and append the fields
    const formData = new FormData();
    formData.append("PlateName", PlateName);
    formData.append("Category", Category);
    formData.append("Price", Price);
    formData.append("Discount", Discount);
    formData.append("Description", Description);
    formData.append("Image", Image);

    console.log(...formData); // log formData content

    const response = await fetch("http://localhost:3000/admin/Plate", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData // send the FormData object
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.ok) {
        alert("Plate added successfully");
        document.getElementById("PlateName").value = "";
        document.getElementById("Category").value = "";
        document.getElementById("Price").value = "";
        document.getElementById("Discount").value = "";
        document.getElementById("Description").value = "";
        document.getElementById("Image").value = "";
    } else {
        alert(responseData.error);
    }
}
