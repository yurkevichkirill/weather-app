import { getWeatherJSON } from "./recieve_api";

export function createDOM(){
    const form = document.querySelector('form');
    submitHandler(form);
}

function submitHandler(form){
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        printWeather(getInputValue());
    });
}

function getInputValue(){
    return document.querySelector('input').value;
}

async function printWeather(city){
    const requiredObj = await getWeatherJSON();
    console.log(requiredObj);
}
