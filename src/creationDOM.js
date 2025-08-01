import { getHourTime, getMonthDay } from "./date";
import { getWeatherJSON } from "./recieve_api";

export function createDOM(){
    const form = document.querySelector('form');
    submitHandler(form);
}

function submitHandler(form){
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const city = getInputValue();
        //printWeather(city);
        fillOutDOM(city);
    });
}

function getInputValue(){
    return document.querySelector('input').value;
}

async function fillOutDOM(city){
    const weather = await getWeatherJSON(city);
    console.log(weather);
    fillMainTemp(weather);
    fillIcon(weather);
    fillDayDescription(weather);
    fillDayParams(weather);
    fillNextDays(weather);
    fillHours(weather);
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
    const dew = document.querySelector('.dew');
    dew.textContent = `Dew ${weather.current.dew}°`;
    const humidity = document.querySelector('.humidity');
    humidity.textContent = `Humidity ${weather.current.humidity}%`;
    const pressure = document.querySelector('.pressure');
    pressure.textContent = `Pressure ${weather.current.pressure} mbar`;
    const cloudcover = document.querySelector('.cloudcover');
    cloudcover.textContent = `Cloudcover ${weather.current.cloudcover}%`;
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
    maxmin.textContent = `${day.tempmax} / ${day.tempmin}`;

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
    temp.textContent = hour.temp;

    hourDiv.append(time, icon, temp);

    return hourDiv;
}

async function printWeather(city){
    const requiredObj = await getWeatherJSON(city);
    console.log(requiredObj);
}
