const API_KEY = '3W7DYE4QXB8Z87WMY2SA5973G';
const HOURS_IN_DAY = 24;
const FIRST_TIME_COUNT = 2;
const TIME_COUNT = 8;

export async function getWeatherJSON(city = 'brest', unit = 'metric'){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=${unit}&key=${API_KEY}&contentType=json`, {mode: 'cors'});
    const responseJSON = await response.json();

    return processJSON(responseJSON);
}

function processJSON(json){
    const address = json.resolvedAddress;
    const current = getCurrentData(json);
    const hours = getHoursData(json);
    const days = getDaysData(json);
    const sun = getSunData(json);

    return {
        address,
        current,
        hours,
        days,
        sun,
    }
}

function getCurrentData(json){
    const currentData = json.currentConditions;
    const temp = currentData.temp;
    const feelslike = currentData.feelslike;
    const dew = currentData.dew;
    const humidity = currentData.humidity;
    const pressure = currentData.pressure;
    const cloudcover = currentData.cloudcover;
    const currentTime = currentData.datetime;
    const conditions = currentData.conditions;

    return {
        temp,
        feelslike,
        dew,
        humidity,
        pressure,
        cloudcover,
        currentTime,
        conditions,
    }
}

function getHoursData(json){
    const currentTime = getCurrentData(json).currentTime;
    const days = getDaysData(json);
    let processedHours = [];
    let daysCount = 0;
    let afterCurrent = false;
    while(daysCount < HOURS_IN_DAY){
        days.forEach((day) => {
            day.hours.forEach((hour) => {
                if(compareDate(hour.datetime, currentTime)){
                    afterCurrent = true;
                }
                if(afterCurrent && daysCount < HOURS_IN_DAY){
                    const datetime = hour.datetime;
                    const icon = getIconURL(hour.icon);
                    const temp = hour.temp;
                    processedHours.push({
                        datetime,
                        icon,
                        temp,
                    });
                    daysCount++;
                }
            })
        });
    }

    return processedHours;
}

function compareDate(date1, date2){
    const date1Arr = date1.split('');
    date1Arr.splice(FIRST_TIME_COUNT, TIME_COUNT - FIRST_TIME_COUNT);
    const date2Arr = date2.split('');
    date2Arr.splice(FIRST_TIME_COUNT, TIME_COUNT - FIRST_TIME_COUNT);

    return date1Arr.join('') === date2Arr.join('');
}

function getDaysData(json){
    const daysData = json.days;
    let processedDays = [];
    daysData.forEach(day => {
        const datetime = day.datetime;
        const icon = getIconURL(day.icon);
        const tempmax = day.tempmax;
        const tempmin = day.tempmin;
        const hours = day.hours;

        processedDays.push({
            datetime,
            icon,
            tempmax,
            tempmin,
            hours,
        });
    });

    return processedDays;
}

function getSunData(json){
    const sunrise = json.currentConditions.sunrise;
    const sunset = json.currentConditions.sunset;
    return {
        sunrise,
        sunset,
    }
}

function getIconURL(icon){
    return `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/SVG/3rd%20Set%20-%20Color/${icon}.svg`
}