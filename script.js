const inputs = {
	bill: 0,
	tip: 0,
	people: 0,
};

const inputBill = document.querySelector('#amount');
const inputBillInvalidInput = document.querySelector('#amount-invalid');

function handleInputBill(event) {
	const inputStr = parseFloat(event.currentTarget.value);

	if (Number.isNaN(inputStr) && event.currentTarget.value !== '') {
		inputBill.classList.add('input--invalid');
		inputBillInvalidInput.innerText = 'Enter a number';
		inputBillInvalidInput.style.display = 'inline';
		return;
	} else {
		clearBillInvalidInput();
	}
	if (inputStr) {
		inputs.bill = inputStr;
		canCompute(inputs);
	}
}
function clearBillInvalidInput() {
	inputBill.classList.remove('input--invalid');
	inputBillInvalidInput.style.display = 'none';
}

function clearBill() {
	inputBill.value = '';
	clearBillInvalidInput();
}

inputBill.addEventListener('keyup', handleInputBill);

const tipButtons = document.querySelectorAll('button.tip-item');

function clearTipActive(buttons) {
	buttons.forEach((button) => {
		button.classList.remove('tip-item--active');
	});
	clearTipBtn();
}

function handleToggleTipActive(event) {
	clearTipActive(tipButtons);
	event.currentTarget.classList.add('tip-item--active');
}

function handleBtnTip(event) {
	const percentStr = parseInt(event.currentTarget.innerText);
	const percent = percentStr / 100;
	inputs.tip = percent;
	canCompute(inputs);
}

tipButtons.forEach((button) => {
	button.addEventListener('click', handleToggleTipActive);
	button.addEventListener('click', handleBtnTip);
});

const tipBtnCustom = document.querySelector('#pCustom');
const tipBtnCustomInvalidInput = document.querySelector(
	'.cal-input-label--invalid'
);

function handleBtnTipCustom(event) {
	tipButtons.forEach((button) => {
		button.classList.remove('cal-input-label--active');
	});

	const percentStr = parseFloat(event.currentTarget.value);

	// Remove error message otherwise
	// This is here to ensure that when user clears the input, any pre-existing error message is removed
	if (Number.isNaN(percentStr) && event.currentTarget.value !== '') {
		tipBtnCustom.classList.add('input-label--invalid');
		tipBtnCustomInvalidInput.innerText = 'Enter a number';
		tipBtnCustomInvalidInput.style.display = 'inline';
		return;
	}
	// Remove error message otherwise
	// This removes the error message if a use clears the input after entering an invalid input
	else {
		clearTipBtnInvalidInput();
	}

	// Convert percentStr to percent if it is a number
	if (percentStr) {
		const percent = percentStr / 100;

		// Update the value of the inputs object tip with percent
		inputs.tip = percent;

		// Determine if output can be computed
		canCompute(inputs);
	}
}

// Add function to clear error message on custom tip input
function clearTipBtnInvalidInput() {
	tipBtnCustom.classList.remove('input--invalid');
	tipBtnCustomInvalidInput.style.display = 'none';
}

// Add function to clear the custom tip input
function clearTipBtn() {
	tipBtnCustom.value = '';
	clearTipBtnInvalidInput();
}

// Add event listener to the custom tip button
tipBtnCustom.addEventListener('keyup', handleBtnTipCustom);

// ======================
// NUMBER OF PEOPLE INPUT
// ======================
// Store the number of people input in a variable
const inputPeople = document.querySelector('#nop');

// Store the span element containing error message for 0
const inputPeopleInvalidInput = document.querySelector('#input__nop--invalid');

function handleInputPeople(event) {
	const inputStr = parseInt(event.currentTarget.value);

	// Show error message if input is 0
	if (inputStr === 0) {
		inputPeople.classList.add('input--invalid');
		inputPeopleInvalidInput.innerText = "Can't be zero";
		inputPeopleInvalidInput.style.display = 'inline';
		return;
	}
	// Show error message if input is not a number
	else if (Number.isNaN(inputStr) && event.currentTarget.value !== '') {
		inputPeople.classList.add('input--invalid');
		inputPeopleInvalidInput.innerText = 'Enter a number';
		inputPeopleInvalidInput.style.display = 'inline';
		return;
	}
	// Remove error message otherwise
	// This removes the error message if a use clears the input after entering an invalid input
	else {
		clearNumPeopleInvalidInput();
	}

	// If input is valid,
	// update the global object people value and
	// determine if we can compute the tip
	if (inputStr) {
		inputs.people = inputStr;

		// Determine if output can be computed
		canCompute(inputs);
	}
}

// Add function to clear error message from input
function clearNumPeopleInvalidInput() {
	inputPeople.classList.remove('input--invalid');
	inputPeopleInvalidInput.style.display = 'none';
}

// Add function to clear the custom tip input
function clearNumPeople() {
	inputPeople.value = '';
	clearNumPeopleInvalidInput();
}

// Add event listener to the bill input
inputPeople.addEventListener('keyup', handleInputPeople);

// ====================================
// TIP AMOUNT / PERSON + TOTAL / PERSON
// ====================================
// Store the tip amount / person output in a variable
const amountTip = document.querySelector('#tip-amount');

// Store the total amount / person output in a variable
const amountTotal = document.querySelector('#total-amount');

// Add event handler function to clear outputs
function clearOutputs() {
	// Reset value of the Tip Amount
	amountTip.innerText = '$0.00';

	// Reset value of the Total Amount
	amountTotal.innerText = '$0.00';
}

// =======
// OUTPUTS
// =======
// Create function that will check if the outputs can be computed
function canCompute(inputs) {
	// Exit function if any value in inputs is 0
	for (const key in inputs) {
		if (inputs[key] === 0) {
			return;
		}
	}

	// Run the computeTip function
	computeTip(inputs);
}

// Create function that will compute the tip
function computeTip(inputs) {
	amountTip.innerText = `${
		Math.round(((inputs.bill * inputs.tip) / inputs.people) * 100) / 100
	}`;

	amountTotal.innerText = `${
		Math.round(((inputs.bill * (1 + inputs.tip)) / inputs.people) * 100) / 100
	}`;
}

// =====
// RESET
// =====
// Store the reset button in a variable
const resetBtn = document.querySelector('.reset-button');

// Create event handler to reset the tip calculator values
function handleReset() {
	// Reset values of inputs object
	for (const key in inputs) {
		inputs[key] = 0;
	}

	// Reset value of the Bill Input
	clearBill();

	// Remove active state of tip buttons
	clearTipActive(tipButtons);

	// Reset value of the custom tip field
	clearTipBtn();

	// Reset value of the Number of People
	clearNumPeople();

	// Reset Outputs
	clearOutputs();
}

// Add event listener to the resetBtn using the reset() event handler
resetBtn.addEventListener('click', handleReset);

// Run handleReset on page reload to clear the inputs if user reloads the page
window.onload = function () {
	handleReset();
};
