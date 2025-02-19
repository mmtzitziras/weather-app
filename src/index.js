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

getWeather();

async function getWeather() {
    try{
        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Thessaloniki?unitGroup=metric&key=HVYUN4KRD4DB253H2P34LKNF4&contentType=json');
        const data = await response.json();
        console.log(data);
    }
    catch(error){
        console.error(error);
    }
}