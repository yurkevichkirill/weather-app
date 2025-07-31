export async function getWeatherJSON(city){
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=3W7DYE4QXB8Z87WMY2SA5973G`, {mode: 'cors'});
    const responseJSON = await response.json();

    return processJSON(responseJSON);
}

function processJSON(json){
    const address = json.resolvedAddress;
    const temp = json.currentConditions.temp;
    const feelslike = json.currentConditions.feelslike;
    const windspeed = json.currentConditions.windspeed;
    const humidity = json.currentConditions.humidity;
    const pressure = json.currentConditions.pressure;

    return {
        address,
        temp,
        feelslike,
        windspeed,
        humidity,
        pressure,
    }
}