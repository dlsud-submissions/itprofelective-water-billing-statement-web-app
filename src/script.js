// Get DOM elements
const statementForm = document.getElementsByClassName('statement-form');
const customerNameInput = document.querySelector('#customer-name-input');
const waterConsumptionInput = document.getElementsByName('water-consumption-input');
const customerTypeSelect = document.getElementsByName('customer-type-select');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const outputBox = document.getElementsByClassName('output-box');

let validateFormField = (e) => {
    // Check for content
    const inputValue = e.target.value;

    // Determine input field
    const inputFieldName = e.target.name;

    switch(inputFieldName) {
        case 'customer-name-input':
            validateCustomerName(inputValue);
            break;
        default:
            console.log('default');
    }
}

const validateCustomerName = (inputValue) => {
    // Validate input value
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
customerNameInput.addEventListener('blur', validateFormField);

// Attach event listener to submit button