// Get DOM elements
const statementForm = document.getElementsByClassName('statement-form');
const customerNameInput = document.querySelector('#customer-name-input');
const waterConsumptionInput = document.querySelector('#water-consumption-input');
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
        case 'water-consumption-input':
            validateWaterConsumption(inputValue);
            break;
        default:
            console.log('default');
    }
}

let triggerSpanError = (command='removeError') => {
    if (command === 'setError') {
        spanError.classList.add('error-span');

        submitBtn.setAttribute('disabled', 'true');
    } 
    
    if (command === 'removeError') {
        spanError.innerText = '';
        spanError.classList.remove('error-span');

        submitBtn.setAttribute('disabled', 'false');
    }
}

const validateCustomerName = (inputValue) => {
    // Validate input value
    let inputIsEmpty = inputValue === '';

    const spanError = document.getElementById('customer-name-error')
    if (inputIsEmpty) {
        spanError.innerText = 'Customer Input is a required field';
        triggerSpanError('setError');
    } else {
        triggerSpanError('removeError');
    }
}

const validateWaterConsumption = (inputValue) => {
    const spanError = document.getElementById('water-consumption-error');
    
    
    let negativeInput = inputValue < 1;
    if (negativeInput) {
        spanError.innerText = 'Must be a value greater than 0';
        triggerSpanError('setError');
    }

    const rate = calculateRate(inputValue);
}

// Attach event listeners to input elements
customerNameInput.addEventListener('blur', validateFormField);
waterConsumptionInput.addEventListener('blur', validateFormField)

// Attach event listener to submit button