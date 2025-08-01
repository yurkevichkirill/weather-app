import { getWeatherJSON } from "./recieve_api"

function getParams(){
    let promise = new Promise(function(resolve) {
        resolve(getWeatherJSON('minsk'));
    });

}