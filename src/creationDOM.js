import { getWeatherJSON } from "./recieve_api";

export function createDOM(){
    const main = document.querySelector('.main');

    const form = document.createElement('form');
    main.append(form);

    const label = document.createElement('label');
    label.textContent = 'City';
    label.for = 'city';

    const input = document.createElement('input');
    input.id = 'city';
    input.name = 'city';

    const submit = document.createElement('button');
    submit.textContent = 'Submit';
    submit.class = 'submit';

    submitHandler(form);

    form.append(label, input, submit);
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

function printWeather(city){
    console.log(getWeatherJSON(city));
}
