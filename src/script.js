// Get DOM elements
const statementForm = document.getElementsByClassName('statement-form');
const customerNameInput = document.querySelector('#customer-name-input');
const waterConsumptionInput = document.querySelector('#water-consumption-input');
const customerTypeSelect = document.querySelector('#customer-type-select');
const calculateBtn = document.getElementById('calculate-btn');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const outputText = document.getElementById('output-text');

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

let triggerSpanError = (command='removeError', spanError) => {
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
    const customerSpanError = document.getElementById('customer-name-error')
    
    let inputIsEmpty = inputValue === '';
    if (inputIsEmpty) {
        spanError.innerText = 'Customer Input is a required field';
        triggerSpanError('setError', customerSpanError);
    } else {
        triggerSpanError('removeError', customerSpanError);
    }
}

const validateWaterConsumption = (inputValue) => {
    const waterSpanError = document.getElementById('water-consumption-error');
    
    let negativeInput = inputValue < 1;
    if (negativeInput) {
        spanError.innerText = 'Must be a value greater than 0';
        triggerSpanError('setError', waterSpanError);
    }

    const rate = calculateRate(inputValue);
}

const calculateRate = (cubicMeter) => {
    if (cubicMeter >= 1 && cubicMeter <= 20) {
        return 25.00;
    } else if (cubicMeter >= 21 && cubicMeter <= 40) {
        return 35.00;
    } else if (cubicMeter >= 41 && cubicMeter <= 60) {
        return 45;
    } else {
        return 60.00;
    }
}

const calculateAmount = (waterUsage, rate) => {
    return waterUsage * rate;
}

const getDiscountRate = () => {
    const customerTypeValue = customerTypeSelect.value;
    let discountRate;

    switch (customerTypeValue) {
        case 'regular':
            discountRate = 0;
            break;
        case 'senior-citizen':
            discountRate = 0.25;
            break;
        case 'solo-parent':
            discountRate = 0.15;
            break;
    }

    return discountRate;
}

const calculateDiscount = (amount) => {
    const discountRate = getDiscountRate();

    // Assume has discount
    if (discountRate > 0) {
        return amount * discountRate;
    }

    // No discount case (value of 0)
    return 0;
}

const calculateTotal = (amount, discount) => {  
    return amount - discount;
}

const displayoutputText = (customerName, customerType, waterUsage, rate, amount, discount, total) => {
    outputText.innerHTML = `
    ================================================== <br>
    WATER BILLING <br>
    ================================================== <br>

    Customer Name: ${customerName} <br>
    Customer Type: ${customerType} <br>
    Water Usage: ${waterUsage} <br>
    Rate: ${rate} <br>
    ______________________________ <br>
    Amount: ${amount} <br>
    Discount: ${discount} <br>
    ______________________________ <br>
    TOTAL BILL: ${total} <br>
    `;
}

const calculateValues = () => {
    // Get values
    const customerName = customerNameInput.value;
    const customerType = customerTypeSelect.value;
    const waterUsage = waterConsumptionInput.value;
    const rate = calculateRate(waterUsage);
    const amount = calculateAmount(waterUsage, rate);
    const discount = calculateDiscount(amount);
    const total = calculateTotal(amount, discount);

    // Show on output box
    displayoutputText(customerName, customerType, waterUsage, rate, amount, discount, total);
}

// Attach event listeners to input elements
customerNameInput.addEventListener('blur', validateFormField);
waterConsumptionInput.addEventListener('blur', validateFormField)

// Attach event listener to calculate button
calculateBtn.addEventListener('click', calculateValues);