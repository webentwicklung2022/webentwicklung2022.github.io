function ausführen(){
    weatherContainer.style.opacity = "0";
    weatherContainer.style.transform = "translateY(300px)";
    var locationInput = document.getElementById("locationInput");
    var location = locationInput.value;
    getWeather(location);
    sessionStorage.setItem("location", location);
    locationInput.value = "";
    console.log(sessionStorage.getItem("location"));
}


var input1 = document.body;
input1.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    ausführen();
  }
});




function getWeather(location) {
    
    var standort;
    if (location === "") {
      alert("Bitte geben Sie einen Standort ein.");
      return;
    }
  
    var geocodingApiKey = "8773dd5c6da2ff83479db56b258dcbb4";
    var weatherApiKey = "8773dd5c6da2ff83479db56b258dcbb4";
  
    // Geocoding API URL
    var geocodingUrl =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      location +
      "&appid=" +
      geocodingApiKey;
  
    fetch(geocodingUrl)
      .then(function (response) {
        
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var coordinates = data[0];
        getWeatherByCoordinates(coordinates.lat, coordinates.lon ,coordinates.local_names.de);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function getWeatherByCoordinates(latitude, longitude, Standort) {
    var weatherApiKey = "8773dd5c6da2ff83479db56b258dcbb4";
     standort = Standort
    var weatherUrl =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      weatherApiKey;
  
    fetch(weatherUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        displayWeather(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function displayWeather(data) {
    var weatherContainer = document.getElementById("weatherContainer");
    weatherContainer.innerHTML = "";
  
    var cityName = data.name;
    var temperature = data.main.temp - 273.15;
    var gefühl = data.main.feels_like;
    var feuchtigkeit = data.main.humidity;
    var description = data.weather[0].description;
    var maxTemp= data.main.temp_max;
    var minTemp= data.main.temp_min;
    var cityElement = document.createElement("h2");
    cityElement.textContent = standort;
    var windGes = data.wind.speed;
     var zeichen = "";

    if(temperature >= 18  && temperature < 25){
     zeichen=`<svg style="margin-left:5px" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-thermometer-half" viewBox="0 0 16 16">
      <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415z"/>
      <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>
    </svg>`;
    }else if(temperature  < 18 &&  temperature > 10){
      zeichen=`<svg style="margin-left:5px" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-thermometer-low" viewBox="0 0 16 16">
      <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585a1.5 1.5 0 0 1 1 1.415z"/>
      <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1z"/>
    </svg>`;
    }else if(temperature < 10){
      zeichen=`<svg style="margin-left:5px" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-thermometer-snow" viewBox="0 0 16 16">
      <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5z"/>
      <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5z"/>
    </svg>`;
    }else if (temperature > 25){
      zeichen=`<svg style="margin-left:5px" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-thermometer-sun" viewBox="0 0 16 16">
      <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5z"/>
      <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0V2.5zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1zm5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5zm4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0zM8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5zM12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5zm-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708zM8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5z"/>
    </svg>`;
    }else{zeichen = "";}




  
    var wetterElement = document.createElement("p");
    wetterElement.innerHTML =
      "Temperatur: " + Math.round(temperature) + "°C " + zeichen;
      var wetterElement1 = document.createElement("p");
      wetterElement1.innerHTML =
        "Gefühl: " + Math.round(gefühl - 273.15) + "°C";
         var wetterElement2 = document.createElement("p");
      wetterElement2.innerHTML =
        "Feuchtigkeit: " + feuchtigkeit+"%" + `<svg style="margin-left:5px" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-droplet-half" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"/>
        <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z"/>
      </svg>`;
        var wetterElement3 = document.createElement("p");
        wetterElement3.innerHTML =
          "Max-Temperatur: " + Math.round(maxTemp - 273.15) + "°C";
          var wetterElement4 = document.createElement("p");
        wetterElement4.innerHTML =
          "Min-Temperatur: " + Math.round(minTemp - 273.15) + "°C";
          var wetterElement5 = document.createElement("p");
          wetterElement5.innerHTML =
            "Wind-Geschwindigkeit: " + Math.round(windGes) + " km/h" + `<svg style="margin-left:5px" xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
            <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"/>
          </svg>`;
          
    
    var descriptionElement = document.createElement("p");
    descriptionElement.textContent = "Wetter: " + description;
  
    weatherContainer.appendChild(cityElement);
    weatherContainer.appendChild(wetterElement);
    weatherContainer.appendChild(wetterElement1);
    weatherContainer.appendChild(wetterElement2);
    weatherContainer.appendChild(wetterElement3);
    weatherContainer.appendChild(wetterElement4);
    weatherContainer.appendChild(wetterElement5);
    weatherContainer.appendChild(descriptionElement);
    weatherContainer.style.opacity = "1";
    weatherContainer.style.transform = "translateY(0px)";
  }

  

              