import { fillOutDOM, getInputValue } from "./creationDOM";

export function handleInput(){
    const form  = document.querySelector('form');
    const cityInp = document.querySelector('#city');
    const cityError = document.querySelector('#city + span.error');

    cityInp.addEventListener("input", (event) => {
        if(cityInp.validity.valid){
            cityError.textContent = "";
            cityError.className = "error";
            event.preventDefault();
        } else{
            showCityError();
        }
    });

    form.addEventListener("submit", (event) => {
        // prevent form submission
        event.preventDefault();

    // if the city field is invalid
        if (!city.validity.valid) {
            // display an appropriate error message
            showCityError();
        }
        if(form.checkValidity()){
            const city = getInputValue()
            fillOutDOM(city);
        }
    });

    function showCityError() {
        if (city.validity.valueMissing) {
            // If empty
            cityError.textContent = "You need to enter a City.";
        }
        // Add the `active` class
        cityError.className = "error active";
    }
}

export function showServerError(message) {    
    const cityError = document.querySelector('#city + span.error');
    cityError.className = "error active";
    cityError.textContent = message;
}
