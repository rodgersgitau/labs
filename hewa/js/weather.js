// Query Selectors
const day1 = document.querySelector(".day1");
const day2 = document.querySelector(".day2");
const day3 = document.querySelector(".day3");
const day4 = document.querySelector(".day4");
const day5 = document.querySelector(".day5");
const form = document.querySelector(".form");

// Event Handlers
form.addEventListener("submit", obj => {
  obj.preventDefault();
  const city = form.querySelector(".input").value;
  getWeather(city);
});

//  Days Array
const daysofWeek = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday"
};

// Get the next 5 days
function get5Days() {
  let date = new Date();
  let date1, date2, date3, date4, date5;

  date1 = daysofWeek[date.getDay()];
  date2 = get7Days(date.getDay() + 1);
  date3 = get7Days(date.getDay() + 2);
  date4 = get7Days(date.getDay() + 3);
  date5 = get7Days(date.getDay() + 4);

  day1.querySelector(".card-header").innerHTML = date1;
  day2.querySelector(".card-header").innerHTML = date2;
  day3.querySelector(".card-header").innerHTML = date3;
  day4.querySelector(".card-header").innerHTML = date4;
  day5.querySelector(".card-header").innerHTML = date5;
}

// Ensure 7 days limit
function get7Days(date) {
  return date > 7 ? daysofWeek[date - 7] : daysofWeek[date];
}

// Query weather by city
const getWeather = async city => {
  const api = "http://api.openweathermap.org/data/2.5/forecast";
  const key = "076edd5af057e8fcf6ec915f9f4e66cf";

  const response = await fetch(`${api}?q=${city}&appid=${key}`).catch(err => {
    console.log(err);
  });
  const json = await response.json();

  // Check if city weather information exists
  try {
    if (json["list"]) {
      displayWeather(json);
    }
    throw "Invalid City";
  } catch (err) {
    console.log(err);
  }
};

// Display weather results
function displayWeather(weather) {
  let dayWeather;
  console.log(weather);
  const weatherList = weather["list"].map(item => {
    return [
      item["dt_txt"],
      item["weather"][0]["main"],
      item["weather"][0]["description"],
      item["weather"][0]["icon"]
    ];
  });

  console.log(weatherList.filter(word => word[0].includes("12:00:00")));

  // console.log(dayWeather);
}
get5Days();
