const backendURL = "http://localhost:3000"
const findPlateById = (id) => {
  fetch(`${backendURL}/admin/plate/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then(async (response) => {
      const data = await response.json();
      console.log(data);
      if (data.error) {
        return;
      }
      document.getElementById("PlateName").value = data.plate.PlateName;
      document.getElementById("Category").value = data.plate.Category;
      document.getElementById("Price").value = data.plate.Price;
      document.getElementById("Discount").value = data.plate.Discount;
      document.getElementById("Description").value = data.plate.Description;
      // document.getElementById('PlateId').value = data.plate.id;
      document.getElementById("Image").src = data.plate.Image;

      document.getElementById("PlateName").placeholder = data.plate.PlateName;
      document.getElementById("Category").placeholder = data.plate.Category;
      document.getElementById("Price").placeholder = data.plate.Price;
      document.getElementById("Discount").placeholder = data.plate.Discount;
      document.getElementById("Description").placeholder =
        data.plate.Description;
      // document.getElementById('PlateId').placeholder = data.plate.id;
      document.getElementById("Image").src = data.plate.Image;
    })
    .catch((error) => {
      console.error(error);
    });
};

const id = localStorage.getItem("plateID");
findPlateById(id);

function updatePlate() {
  const plateId = localStorage.getItem("plateID");
  const PlateName = document.getElementById("PlateName").value;
  const Category = document.getElementById("Category").value;
  const Price = document.getElementById("Price").value;
  const Discount = document.getElementById("Discount").value;
  const Description = document.getElementById("Description").value;
  const Image = document.getElementById("Image").value[0];
  const data = {
    PlateName,
    Category,
    Price,
    Discount,
    Description,
    Image,
  };
  console.log(data);

  // Function to remove empty properties
  function removeEmptyProperties(obj) {
    for (let key in obj) {
      if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    }
  }

  removeEmptyProperties(data);
  console.log(data)

  fetch(`${backendURL}/admin/plate/${plateId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const data = await response.json();
      console.log(data);
      if (data.error) {
        alert(data.error);
        return;
      }
      alert(data.message);
      location.reload();
    })
    .catch((error) => {
      console.error(error);
    });
}
