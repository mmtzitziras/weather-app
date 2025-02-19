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