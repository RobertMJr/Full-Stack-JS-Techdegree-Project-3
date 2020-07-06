document.addEventListener('DOMContentLoaded', () => {
    // Set focus on the first text field - select it via its id.
    document.querySelector('#name').focus();
});

// Select the "Other" element by id and hide it by setting its display value to none.
const roleOther = document.querySelector('#other-title');
roleOther.style.display = 'none';
const roleSelect = document.querySelector('#title');
// Add an event listner that displays the 'Other' input element when the option element with the value 'other' is selected and hides it when it is not selected.
roleSelect.addEventListener('change', (event) => {
if (event.target.value === 'other') {
    roleOther.style.display = '';
} else {
    roleOther.style.display = 'none';
}
}); 

// Hide the options under the "Color" drop down by selecting the select element with the id 'color', hidding it, then selecting the label and changing it's text content.
const colorSelect = document.querySelectorAll('#color');
colorSelect[0].hidden = true;
const colorLabel = document.querySelector('#colors-js-puns label');
colorLabel.textContent = "Please select a T-shirt theme";
  
// The hideColor function, takes in a parameter and based on it hides / shows colors.
function hideColor(design){
    if (design === "js puns") {
        colorSelect[0][0].selected = true; 
    } else {
        colorSelect[0][3].selected = true; 
    }
    for (let i = 0; i < colorSelect[0].children.length; i += 1){
        if (design === "js puns"){
            if (i < 3){
                colorSelect[0][i].hidden = false;
            } else{
                colorSelect[0][i].hidden = true;
            }   
        } else {
            if (i < 3){
                colorSelect[0][i].hidden = true;
            } else{
                colorSelect[0][i].hidden = false;
            }
        }
    }
};

const designSelect = document.querySelector('#design');
// Add an event listener to check when a T-shirt theme has been selected.
designSelect.addEventListener('change', (event) =>{
    /* If the selected theme is 'js puns' change the color label's text, unhide the select element and call the hideColor function on the selected theme's value
        Else if the selected theme is 'heart js' change the color label's text, unhide the select element and call the hideColor function on the selected theme's value
        Otherwise change the color label's text and hide the select element. */
    if (event.target.value === "js puns"){
        colorLabel.textContent = "Color:";
        colorSelect[0].hidden = false;
        hideColor(event.target.value);
    } else if (event.target.value === "heart js") {
        colorLabel.textContent = "Color:";
        colorSelect[0].hidden = false;
        hideColor(event.target.value);
    } else {
        colorLabel.textContent = "Please select a T-shirt theme";
        colorSelect[0].hidden = true; 
    }
});

// Select the 'activities' fieldset and all its input elements
const fieldsetActivities = document.querySelector('.activities');
const inputsActivities = document.querySelectorAll('.activities input');
const activitiesErrParagraph = createErrorElement('p');
// Create an element to display the total activity cost.
const totalCostParagraph = document.createElement('p');
// Add the element that will display the total activity cost to the 'activities fieldset'.
fieldsetActivities.appendChild(totalCostParagraph);
// Create a variable to store the total cost.
let totalActivityCost = 0;

// Create an eventlistener on the fieldset containing the checkboxes
fieldsetActivities.addEventListener('change', (event) => {
/*  Create a variable to hold the 'input' element that was clicked
    Get the 'data-cost' attribute of the input element that was clicked and store it in a variable . 
*/  
const clickedActivity = event.target;
const cost = +clickedActivity.getAttribute('data-cost');
// If the checkbox has been checked add the cost of the activity to the total, otherwise subtract the cost.
if (clickedActivity.checked) {
    totalActivityCost += cost;
} else {
    totalActivityCost -= cost;
}
// If the total cost is 0 then don't show anything - no cost, otherwise change the paragraph's text to show the total cost.
if (totalActivityCost === 0) {
    totalCostParagraph.textContent = '';
} else {
    totalCostParagraph.textContent = `Total: $${totalActivityCost}`;
}
// Store the day and time details of the 'changed' activity in a variable for further use.
const clickedDateAndTime = clickedActivity.getAttribute('data-day-and-time');
// Loop over the activities and for each get their date and time 
for (let i = 0; i < inputsActivities.length; i += 1){
    let currentActivityDate = inputsActivities[i].getAttribute('data-day-and-time');
    /* Check if the activity in the loop occurs at the same time as the activity that has been clicked and if the current activity in the loop is different from the activity that was just clicked. If this is true check if the activity has been checkmarked and if it has been  disable the current activity, if it hans't been checkmarked re-enable the current activity. */
    if (clickedDateAndTime === currentActivityDate && clickedActivity !== inputsActivities[i]) {
        if (clickedActivity.checked){
            inputsActivities[i].disabled = true;
            inputsActivities[i].parentElement.style.color = 'gray';
        } else {
            inputsActivities[i].disabled = false;
            inputsActivities[i].parentElement.style.color = '';
        }
    }
}
});

// Hide the 'Select Payment Method' option.
const paymentSelect = document.querySelector("#payment");
paymentSelect.firstElementChild.hidden = true;
// Select the Credit Card option.
paymentSelect.children[1].selected = true;
// Store the payment options into variables for later use.
const creditCardOption = document.querySelector('.credit-card');
const paypal = document.querySelector('.paypal');
const bitcoin = document.querySelector('.bitcoin');
// Hide the paypal and bitcoin details
paypal.hidden = true;
bitcoin.hidden = true;
// Add an event listener that ensures that when one payment method is selected the payment details for the other methods are hidden.
paymentSelect.addEventListener('change', (event) => {
if (event.target.value === 'credit card') {
    paypal.hidden = true;
    bitcoin.hidden = true;
    creditCardOption.hidden = false;
} else if (event.target.value === 'paypal') {
    paypal.hidden = false;
    bitcoin.hidden = true;
    creditCardOption.hidden = true;
} else {
    paypal.hidden = true;
    bitcoin.hidden = false;
    creditCardOption.hidden = true;
}
});

function createErrorElement(elem) {
    if (elem === 'span') {
        const spanElement = document.createElement('span');
        spanElement.style.color = 'red';
        spanElement.style.padding = "0px 2px";
        spanElement.style.marginBottom = "2px";
        spanElement.style.display = "inline-block";
        spanElement.style.border = "2px solid red";
        spanElement.style.borderRadius = "5px";
        spanElement.style.backgroundColor = "white";
        spanElement.style.textAlign = "center";
        return spanElement;
    } else {
        const errorP = document.createElement('p');
        errorP.textContent = "Please select at least one activity";
        errorP.style.color = "red";
        errorP.style.backgroundColor = "white";
        errorP.style.display = "inline-block";
        errorP.style.marginTop = "0px";
        errorP.style.padding = "0px 2px";
        errorP.style.border = "2px solid red";
        errorP.style.borderRadius = "5px";
        return errorP;
    }
};
  
// Select the elements that will be used for validation and assign them each of them to a variable
const form = document.querySelector('form');
const name =  document.querySelector('#name');
const nameLabel = name.previousElementSibling;
const email = document.querySelector('#mail');
const creditCard = document.querySelector('#cc-num')
const zipCode = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const fieldSet = document.querySelector('form').firstElementChild;
const nameSpan = createErrorElement('span');
const emailSpan = createErrorElement('span');
const creditSpan = createErrorElement('span');

/* Validation function for the name: 
    - Name field can't be blank
    - Allows a single name such as "John" and also a name in the format of "FirstName LastName"
*/
const validateName = () => {
    const nameValue = name.value;
    return /^[a-z]+ ?([a-z]+)?$/i.test(nameValue); 
};

/* Validation function for the email */
const validateEmail = () => {
    const emailValue = email.value;
    return /^[^@\s]+@[^@.\s]+\.[a-z]+$/i.test(emailValue);
};

/* Validation function for the activities */
const validateActivity = () => {
    for (let i = 0; i < inputsActivities.length; i += 1){
        if (inputsActivities[i].checked) {
            return true;
        }
    }
    return false;
};

/* Validation function for the credit card number */
const validateCCNumber = () => {
    const creditCardValue = creditCard.value;
    return /^\d{13,16}$/.test(creditCardValue);
};

/* Validation function for the Zip Code */

const validateZipCode = () => {
    const zipCodeValue = zipCode.value;
    return (/^\d{5}$/.test(zipCodeValue));
};

/* Validation function for the CVV */
const validateCVV = () => {
    const cardVerificationValue = cvv.value;
    return /^\d{3}$/.test(cardVerificationValue);
};

// Test event listener
form.addEventListener('submit', (event) => {
if (!validateName()) {
    event.preventDefault();
    name.style.borderColor = '#ee200ef6';
    name.placeholder = "Please enter your name";
} else {
    name.style.borderColor = 'rgb(111, 157, 220)';
}
if (!validateEmail()) {
    event.preventDefault();
    email.style.borderColor = '#ee200ef6';
    email.placeholder = "Please enter your email address";
} else {
    email.style.borderColor = 'rgb(111, 157, 220)';
} 
if (!validateActivity()) {
    event.preventDefault();
    fieldsetActivities.firstElementChild.style.color = 'red';
    fieldsetActivities.insertBefore(activitiesErrParagraph, fieldsetActivities.firstElementChild);
} else {
    if (activitiesErrParagraph){
        activitiesErrParagraph.remove();
    }
    fieldsetActivities.firstElementChild.style.color = 'whitesmoke';
} 
if (paymentSelect.children[1].selected){
    if (!validateCCNumber()){
        event.preventDefault();
        creditCard.style.borderColor = '#ee200ef6';
        creditCard.value = '';
        creditCard.placeholder = "Please enter your credit card number";
    } else {
        creditCard.style.borderColor = 'rgb(111, 157, 220)';
    }
    if (!validateZipCode()){
        event.preventDefault();
        zipCode.style.borderColor = '#ee200ef6';
        zipCode.value = '';
        zipCode.placeholder = "5 digits";
    } else {
        zipCode.style.borderColor = 'rgb(111, 157, 220)';
    }
    if (!validateCVV()) {
        event.preventDefault();
        cvv.style.borderColor = '#ee200ef6';
        cvv.value = '';
        cvv.placeholder = "3 digits";
    } else {
        cvv.style.borderColor = 'rgb(111, 157, 220)';
    }
}
});

function showError (elementId, resultType, element) {
    if (resultType === 'zeroLength' ) {
        element.style.borderColor = '#ee200ef6';
        switch(elementId) {
            case 'name':
                nameSpan.innerHTML = "Please Enter Your Name - the name field can't be empty";
                fieldSet.insertBefore(nameSpan, element);
                break;
            case 'mail':
                emailSpan.innerHTML = "Please Enter Your Email: email field can't be empty";
                fieldSet.insertBefore(emailSpan, element);
                break;
            case 'cc-num':
                creditSpan.innerHTML = "Please Enter a Credit Card Number <br> - Email field can't be empty -";
                creditCard.parentElement.appendChild(creditSpan);
                break;
        }
    } else if (resultType === 'invalid') {
        element.style.borderColor = '#ee200ef6';
        switch(elementId) {
            case 'name':
                if (nameSpan) {
                    nameSpan.remove();
                }
                nameSpan.innerHTML = "Please Enter Your Name - only letters and a space";
                fieldSet.insertBefore(nameSpan, element);
                break;
            case 'mail':
                if (emailSpan) {
                    emailSpan.remove();
                }
                emailSpan.innerHTML = 'Please Enter an Email Address: "name@example.com"';
                fieldSet.insertBefore(emailSpan, element);
                break;
            case 'cc-num':
                if (creditSpan){
                    creditSpan.remove();
                }
                creditSpan.innerHTML = "Please Enter a Credit Card Number <br> - Between 13 and 16 digits -"
                creditCard.parentElement.appendChild(creditSpan);
                break;
        }
    } else {
        element.style.borderColor = 'rgb(111, 157, 220)';
        switch(elementId) {
            case 'name':
                if (nameSpan) {
                    nameSpan.remove();
                }
                break;
            case 'mail':
                if (emailSpan) {
                    emailSpan.remove();
                }
                break;
            case 'cc-num':
                if (creditSpan) {
                    creditSpan.remove();
                }
                break;
        }
    }
}

function createListener(validator) {
    return e => {
        const val = e.target.value;
        const result = validator(val);
        const noResult = !result && val.length === 0;
        const invalidResult = !result;
        if (noResult) {
            showError(e.target.id, 'zeroLength', e.target);
        } else if (invalidResult) {
            showError(e.target.id, 'invalid', e.target);
        } else {
            showError(e.target.id, 'pass', e.target);
        }
    }
}

name.addEventListener('input', createListener(validateName));
email.addEventListener('input', createListener(validateEmail));
creditCard.addEventListener('input', createListener(validateCCNumber));
fieldsetActivities.addEventListener('change', () => {
    if(validateActivity() && activitiesErrParagraph) {
        activitiesErrParagraph.remove();
        fieldsetActivities.firstElementChild.style.color = 'whitesmoke';
    }
    else {
        activitiesErrParagraph.remove();
        fieldsetActivities.firstElementChild.style.color = 'red';
        fieldsetActivities.insertBefore(activitiesErrParagraph, fieldsetActivities.firstElementChild);
    }
});