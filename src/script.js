// Get DOM elements
const statementForm = document.getElementsByClassName('statement-form');
const customerNameInput = document.querySelector('#customer-name-input');
const waterConsumptionInput = document.getElementsByName('water-consumption-input');
const customerTypeSelect = document.getElementsByName('customer-type-select');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const outputBox = document.getElementsByClassName('output-box');

let validateCustomerName = (e) => {

    // Check for content
    const inputValue = customerNameInput.value;

    // Validate input  value
    let inputIsValid = inputValue !== '';

    const spanError = document.getElementById('customer-name-error')
    if (!inputIsValid) {
        spanError.innerText = 'Customer Input is a required field';
        spanError.classList.add('error-span');

        submitBtn.setAttribute('disabled', 'true');
    } else {
        spanError.innerText = '';
        spanError.classList.remove('error-span');

        submitBtn.setAttribute('disabled', 'false');
    }
}

// Attach event listeners to input elements
submitBtn.addEventListener('click', validateCustomerName);

// Attach event listener to submit button