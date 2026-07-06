const form=document.querySelector(".statement-form");

const customerName=document.getElementById("customer-name-input");
const waterConsumption=document.getElementById("water-consumption-input");
const customerType=document.getElementById("customer-type-select");

const calculateBtn=document.getElementById("calculate-btn");

const output=document.getElementById("output-text");

const customerError=document.getElementById("customer-name-error");
const waterError=document.getElementById("water-consumption-error");

function validateName(){

    if(customerName.value.trim()==""){

        customerError.textContent="Customer name is required.";

        return false;
    }

    customerError.textContent="";
    return true;
}

function validateWater(){

    let value=Number(waterConsumption.value);

    if(value<=0 || isNaN(value)){

        waterError.textContent="Must be greater than zero.";

        return false;
    }

    waterError.textContent="";
    return true;
}

function calculateRate(usage){

    if(usage<=20) return 25;

    if(usage<=40) return 35;

    if(usage<=60) return 45;

    return 60;
}

function discountRate(){

    switch(customerType.value){

        case "senior-citizen":
            return .25;

        case "solo-parent":
            return .15;

        default:
            return 0;
    }
}

function calculateBill(){

    if(!validateName()) return;

    if(!validateWater()) return;

    let usage=Number(waterConsumption.value);

    let rate=calculateRate(usage);

    let amount=usage*rate;

    let discount=amount*discountRate();

    let total=amount-discount;

    output.innerHTML=`
<b>WATER BILL</b><br><br>

Customer Name: ${customerName.value}<br>

Customer Type: ${customerType.options[customerType.selectedIndex].text}<br>

Water Usage: ${usage} m³<br>

Rate: ₱${rate.toFixed(2)}<br>

Amount: ₱${amount.toFixed(2)}<br>

Discount: ₱${discount.toFixed(2)}<br>

<hr>

<b>Total Bill: ₱${total.toFixed(2)}</b>
`;
}

calculateBtn.addEventListener("click",calculateBill);

customerName.addEventListener("blur",validateName);

waterConsumption.addEventListener("blur",validateWater);

form.addEventListener("submit",function(e){

    if(!validateName() || !validateWater()){

        e.preventDefault();

        return;
    }

    calculateBill();
});