import './styles.css';

document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar');
    const bgColor = window.getComputedStyle(navbar).backgroundColor;
    const rgb = bgColor.match(/\d+/g);
    const brightness = Math.round(((parseInt(rgb[0]) * 299) +
                                  (parseInt(rgb[1]) * 587) +
                                  (parseInt(rgb[2]) * 114)) / 1000);
    const textColor = (brightness > 125) ? 'black' : 'white';
    document.documentElement.style.setProperty('--text-color', textColor);
});



async function getWeather() {
    try{
        const locationName = document.getElementById('locationName').value.toLowerCase();
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=metric&key=HVYUN4KRD4DB253H2P34LKNF4&contentType=json`);
        const data = await response.json();
        console.log(data);
        const currentConditions = document.getElementById('currentConditions');
        const currentTemperature = document.getElementById('currentTemperature');
        const currentAirPressure = document.getElementById('currentAir');

        currentConditions.innerHTML = `Conditions: ` + data.currentConditions.conditions;
        currentTemperature.innerHTML = `Temperature: ` + data.currentConditions.temp + `°C`;
        currentAirPressure.innerHTML = `Wind: ` + data.currentConditions.windspeed + ` kh/h`;

         // Update forecast weather
         const forecastCards = document.querySelectorAll('.forecast-weather-cards .weather-card');

         data.days.slice(1, 7).forEach((day, index) => {
             const forecastCard = forecastCards[index];
             forecastCard.querySelector('h2').innerText = new Date(day.datetime).toLocaleDateString('en-US', { weekday: 'long' });
             forecastCard.querySelector('p:nth-child(2)').innerText = `${day.temp}°C`;
             forecastCard.querySelector('p:nth-child(3)').innerText = `Conditions: ${day.description}`;
         });

    }
    catch(error){
        console.error(error);
    }
}

window.getWeather = getWeather;