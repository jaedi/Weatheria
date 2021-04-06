const api = {
    key: "80ab4c674d8fabb69cacfacad9d246f6",
    base: "http://api.openweathermap.org/data/2.5/",
    units: "metric"
}

const getCssValuePrefix = async () => {
    let prefix = '';
    let prefixList = ['-o-', '-ms-', '-moz-', '-webkit-'];

    let dom = document.createElement('div');

    for(let i = 0; i < prefixList.length; i++) {
        dom.style.background = prefixList[i] + ' linear-gradient(#000000, #ffffff)';
        if (dom.style.background)
        {
            prefix = prefixList[i];
        }
    }
    dom = null;
    delete dom;
    console.log(prefix)
};


let background = document.querySelector('#background');
//sunny day
background.style.backgroundImage = `linear-gradient(rgba(114, 113, 81, 0.5),rgba(0, 0, 0, 0.5)),url("background.jpg")`;
// bgbg.style.backgroundImage = `${getCssValuePrefix()} linear-gradient(rgba(114, 113, 81, 0.5),rgba(0, 0, 0, 0.5)),url("background.jpg")`;




const getLocation = async () => {
    if(navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        console.log("Geolocation is not supported.");
        // document.querySelector(".container").style.display="none";

    }


    document.querySelector("#loading").style.display="none";

};


const getWeather = async (position) => {
    // console.log(`Latitude: ${position.coords.latitude}`);
    // console.log(`Longitude: ${position.coords.longitude}`);
    
    let latitude = position.coords.latitude || 14.5995;
    let longitude = position.coords.longitude || 120.9842;
    console.log(position.coords.latitude);
    



    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${api.units}&appid=${api.key}`
    const response = await fetch(url);
    const weather = await response.json();

    let city = document.querySelector('#location');
    let date = document.querySelector('#date');
    let icon = document.querySelector('#icon');
    let weatherCondition = document.querySelector('#weatherCondition');
    let tempRange = document.querySelector('#tempRange');
    let temperature = document.querySelector('#temperature');
    let temperatureSection = document.querySelector('#temperatureSection');
    let temperatureScale = document.querySelector('#temperatureSection #scale');

    city.innerText = `${weather.name}, ${weather.sys.country}`;
    date.innerText = await getDate();
    icon.src = `https://openweathermap.org/img/w/${ weather.weather[0].icon}.png`;
    weatherCondition.innerText = weather.weather[0].main;
    tempRange.innerText = `${ weather.main.temp_min}°C / ${ weather.main.temp_max}°C`;

    temperatureScale.innerText="°C";
    temperatureSection.addEventListener("click", async () => {  
        if(temperatureScale.textContent ==="°F"){
            temperatureScale.textContent="°C";
            temperature.innerText = `${Math.round(weather.main.temp)}`;
        }else {
            temperatureScale.textContent="°F";
            temperature.innerText = await convertToFahrenheit(weather.main.temp);
        }
    });

    temperature.innerText = `${Math.round(weather.main.temp)}`;

    

};


convertToFahrenheit = (value) => Math.round((value * 9/5) + 32); 



const getDate = () => {
    let today = new Date();
    let monthNames = [
        "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"
    ];
    let dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    let month = monthNames[today.getMonth()];
    let date = today.getDate(); 
    let year = today.getFullYear();
    let day = dayNames[today.getDay()];

    return `${day} ${month} ${date}, ${year}`;
};






// const changeWeatherTheme = (background) => {
//     background.style.backgroundImage = `${getCssValuePrefix()} linear-gradient(rgba(114, 113, 81, 0.5),rgba(0, 0, 0, 0.5)),url("background.jpg")`;
// };















window.addEventListener("load", getLocation);



/*

Test

https://openweathermap.org/find
*/