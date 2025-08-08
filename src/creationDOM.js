import { getHourTime, getMonthDay } from "./date";
import { getWeatherJSON } from "./recieve_api";

import sunriseURL from "./images/sunrise.svg";
import sunsetURL from "./images/sunset.svg";
import rainURL from "./images/rain.gif";
import humidityURL from "./images/humidity.gif";
import skyURL from "./images/sky.gif";
import cloudsURL from "./images/clouds.gif";
import sunliveURL from "./images/sun_live.jpeg";

export function createDOM(){
    const form = document.querySelector('form');
    submitHandler(form);
}

function submitHandler(form){
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = getInputValue();
        fillOutDOM(city);
    });
}

function getInputValue(){
    return document.querySelector('input').value;
}

export async function fillOutDOM(city){
    try {
        clearDOM();
        const weather = await getWeatherJSON(city);
        console.log(weather);
        fillMainTemp(weather);
        fillIcon(weather);
        fillDayDescription(weather);
        fillDayParams(weather);
        fillNextDays(weather);
        fillHours(weather);
        fillSunLive(weather);
    } catch(error) {
        console.log(error);
    }
}

function fillMainTemp(weather){
    const address = document.querySelector('.address');
    address.textContent = weather.address;
    const temp = document.querySelector('.temp');
    temp.textContent = `${weather.current.temp}°`;
    const conditions = document.querySelector('.conditions');    
    conditions.textContent = weather.current.conditions;
}

function fillIcon(weather){
    const iconDiv = document.querySelector('.icon-main-div');
    const icon = document.createElement('img');
    icon.className = 'weather-icon';
    icon.src = weather.days[0].icon;
    iconDiv.appendChild(icon);
}

function fillDayDescription(weather){
    const day = document.querySelector('.cur-day-description');
    day.textContent = `${weather.days[0].tempmax}° / ${weather.days[0].tempmin}° Feels like ${weather.current.feelslike}°`
}

function fillDayParams(weather){
    const dewName = document.querySelector('.dew-name');
    dewName.textContent = 'Dew';
    const dewVal = document.querySelector('.dew-val');
    dewVal.textContent = weather.current.dew;
    const dewUnit = document.createElement('span');
    dewUnit.className = 'unit';
    dewUnit.textContent = '°';
    dewVal.append(dewUnit);

    const humidityName = document.querySelector('.humidity-name');
    humidityName.textContent = 'Humidity';
    const humidityVal = document.querySelector('.humidity-val');
    humidityVal.textContent = weather.current.humidity;
    const humidityUnit = document.createElement('span');
    humidityUnit.className = 'unit';
    humidityUnit.textContent = '%';
    humidityVal.append(humidityUnit);

    const pressureName = document.querySelector('.pressure-name');
    pressureName.textContent = 'Pressure';
    const pressureVal = document.querySelector('.pressure-val');
    pressureVal.textContent = weather.current.pressure;
    const pressureUnit = document.createElement('span');
    pressureUnit.className = 'unit';
    pressureUnit.textContent = 'mbar';
    pressureVal.append(pressureUnit);

    const cloudcoverName = document.querySelector('.cloudcover-name');
    cloudcoverName.textContent = 'Cloudcover';
    const cloudcoverVal = document.querySelector('.cloudcover-val');
    cloudcoverVal.textContent = weather.current.cloudcover;
    const cloudcoverUnit = document.createElement('span');
    cloudcoverUnit.className = 'unit';
    cloudcoverUnit.textContent = '%';
    cloudcoverVal.append(cloudcoverUnit);
}

function fillNextDays(weather){
    const nextDays = document.querySelector('.next-days');
    weather.days.forEach(day => {
        const dayDiv = createDayDOM(day);
        nextDays.append(dayDiv);
    });
}

function createDayDOM(day){
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day-div';

    const date = document.createElement('p');
    date.className = 'day-date';
    date.textContent = getMonthDay(day.datetime);

    const icon = document.createElement('img');
    icon.className = 'day-icon';
    icon.src = day.icon;

    const maxmin = document.createElement('p');
    maxmin.className = 'day-maxmin';
    maxmin.textContent = `${day.tempmax}° / ${day.tempmin}°`;

    dayDiv.append(date, icon, maxmin);

    return dayDiv;
}

function fillHours(weather){
    const hours = document.querySelector('.day-info');
    weather.hours.forEach((hour) => {
        const hourDiv = createHourDOM(hour);
        hours.append(hourDiv);
    })
}

function createHourDOM(hour){
    const hourDiv = document.createElement('div');
    hourDiv.className = 'hour-div';

    const time = document.createElement('p');
    time.className = 'hour-time';
    time.textContent = getHourTime(hour.datetime);

    const icon = document.createElement('img');
    icon.className = 'hour-icon';
    icon.src = hour.icon;

    const temp = document.createElement('p');
    temp.className = 'hour-temp';
    temp.textContent = hour.temp + '°';

    hourDiv.append(time, icon, temp);

    return hourDiv;
}

function fillSunLive(weather){
    const sunriseTitle = document.querySelector('.sunrise .title');
    sunriseTitle.textContent = 'Sunrise';
    const sunriseTime = document.querySelector('.sunrise .time');
    sunriseTime.textContent = weather.sun.sunrise;
    const sunrise = document.createElement('img');
    sunrise.className = 'sunrise-img';
    sunrise.src = sunriseURL;
    sunriseTitle.parentNode.append(sunrise);


    const sunsetTitle = document.querySelector('.sunset .title');
    sunsetTitle.textContent = 'Sunset';
    const sunsetTime = document.querySelector('.sunset .time');
    sunsetTime.textContent = weather.sun.sunset;
    const sunset = document.createElement('img');
    sunset.className = 'sunset-img';
    sunset.src = sunsetURL;
    sunsetTitle.parentNode.append(sunset);
}

function clearDOM(){
    document.querySelector('.main').innerHTML = `
    <div class="header"></div>
        <div class="left-sidebar"></div>
        <div class="right-sidebar"></div>
        <div class="search-head">
            <form action="">
                <input type="text" id="city" name="city">
                <button class="submit">Submit</button>
            </form>
        </div>
        <div class="temp-main-div">
            <p class="address"></p>
            <p class="temp"></p>
            <p class="conditions"></0>
        </div>
        <div class="icon-main-div"></div>
        <div class="cur-day-description"></div>
        <div class="day-info"></div>
        <div class="day-params">
            <div class="dew-full">
                <div class="dew">
                    <p class="dew-name"></p>
                    <p class="dew-val"></p>
                </div>
                <img src=${rainURL} alt="Dew" class="dew-img">
            </div>
            <div class="humidity-full">
                <div class="humidity">
                    <p class="humidity-name"></p>
                    <p class="humidity-val"></p>
                </div>
                <img src=${humidityURL} alt="Humidity" class="humidity-img">
            </div>
            <div class="pressure-full">
                <div class="pressure">
                    <p class="pressure-name"></p>
                    <p class="pressure-val"></p>
                </div>
                <img src=${skyURL} alt="Pressure" class="pressure-img">
            </div>
            <div class="cloudcover-full">
                <div class="cloudcover">
                    <p class="cloudcover-name"></p>
                    <p class="cloudcover-val"></p>
                </div>
                <img src=${cloudsURL} alt="Cloudcover" class="cloudcover-img">
            </div>
        </div>
        <div class="next-days"></div>
        <div class="sun-live">
            <div class="sun">
                <div class="sunrise">
                    <p class="title"></p>
                    <p class="time"></p>
                </div>
                <div class="sunset">
                    <p class="title"></p>
                    <p class="time"></p>
                </div>
            </div>
            <img src=${sunliveURL} alt="Sun Live" class="sun-live-img">
        </div>
        <div class="footer"></div>
    `;
}

async function printWeather(city){
    const requiredObj = await getWeatherJSON(city);
    console.log(requiredObj);
}
