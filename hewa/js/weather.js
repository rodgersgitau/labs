// Custom Title
function titleBar(city) {
  document.title = city;
}

// Query Selectors
const cardRow = document.querySelector(".row");
const form = document.querySelector(".form");

// Event Handlers
form.addEventListener("submit", obj => {
  obj.preventDefault();
  // let cards = document.querySelectorAll(".card");
  // cards.innerHTML = "";
  const city = form.querySelector(".input").value;
  getWeather(city);
  form.reset();
});

// Query weather by city
const getWeather = async city => {
  const api = "http://api.openweathermap.org/data/2.5/forecast";
  const key = "076edd5af057e8fcf6ec915f9f4e66cf";

  try {
    const response = await fetch(`${api}?q=${city}&appid=${key}`);

    // Check for response
    if (response != "") {
      const json = await response.json();

      // Check if city weather information exists
      if (json["list"]) {
        filterWeather(json);
      } else {
        throw "Invalid City";
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// Filter weather results
function filterWeather(weather) {
  const weatherList = weather["list"].map(item => {
    return [
      item.dt_txt.split(" ")[0],
      item.weather[0].main,
      item.weather[0].description,
      item.weather[0].icon
    ];
  });

  // Get only one result per day
  const dailyWeather = weatherList.filter(value => {
    let day = value[0];
    return !this[day] && (this[day] = true);
  }, Object.create(null));

  console.log(dailyWeather);
  displayWeather(dailyWeather);

  // send city & country to titleBar
  let searchedCity = `${weather.city.name} , ${weather.city.country}`;
  titleBar(searchedCity);
}

//  Days Array
const daysofWeek = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat"
};

// Months Array {
const monthsofYear = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sept",
  10: "Oct",
  11: "Nov",
  12: "Dec"
};

// display weather results
function displayWeather(weather) {
  weather.map(card => {
    // Date formarting
    let day = new Date(card[0]).getDay();
    let month = new Date(card[0]).getMonth();
    let year = new Date(card[0]).getFullYear();

    // Daily Weather Card HTML
    let cardHtml = `<div class="card">
      <div class="card-header">
        <img src="http://openweathermap.org/img/w/${card[3]}.png">    
      </div>
      <div class="card-main">
        <div class="main-title">
          <strong>${daysofWeek[day]} ${monthsofYear[month]} ${year}</strong> 
        </div>                            
        <div class="main-description">
          <p>
            <span>${card[1]}</span>
            - 
            <span>${card[2]}</span> 
          </p>
        </div>
      </div>
    </div>`;

    // Append generated cards to page
    cardRow.innerHTML += cardHtml;
  });
}
