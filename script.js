function getMenu() {
  fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const menuContainer = document.getElementById("menu");
      data.items.forEach((item) => {
        // Accessing the 'items' array in the JSON
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Price: $${item.price}</p>
          `;
        menuContainer.appendChild(menuItem);
      });
    })
    .catch((error) => console.log(error));
}

// TakeOrder function to simulate order taking process
function takeOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const burgers = [
        "Classic Burger",
        "Cheese Burger",
        "Bacon Burger",
        "Veggie Burger",
        "Mushroom Swiss Burger",
      ];
      const order = {
        burger1: burgers[Math.floor(Math.random() * burgers.length)],
        burger2: burgers[Math.floor(Math.random() * burgers.length)],
        burger3: burgers[Math.floor(Math.random() * burgers.length)],
      };
      resolve(order);
    }, 2500);
  });
}

// orderPrep function to simulate order preparation process
function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

// payOrder function to simulate payment process
function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

// thankyouFnc function to show a thank you message after payment
function thankyouFnc() {
  alert("Thank you for eating with us today!");
}

// getMenu() is called on page load to fetch the food items from API and show them to user
getMenu();

// Add event listener to 'Order' button to simulate order process
document.getElementById("order-btn").addEventListener("click", () => {
  takeOrder()
    .then((order) => {
      const orderContainer = document.getElementById("order");
      orderContainer.innerHTML = `
          <ul style="list-style-type: none; list-style-position: inside;">
            <li>${order.burger1}</li>
            <li>${order.burger2}</li>
            <li>${order.burger3}</li>
          </ul>
          <br>
        `;
      return orderPrep();
    })
    .then((status) => {
      const statusContainer = document.getElementById("status");
      statusContainer.innerHTML = `
          <br>
          <p>Order status: Preparing...</p>
        `;
      return payOrder();
    })
    .then((status) => {
      const statusContainer = document.getElementById("status");
      statusContainer.innerHTML = `
          <br>
          <p>Order status: Paid</p>
        `;
      thankyouFnc();
    })
    .catch((error) => console.log(error));
});
