//create variables of each input for bill, tip, and number of people
const bill = document.querySelector('.bill-input').value;
const tipPercent = 0;
const people = document.querySelector('.nop-input').value;

//create onclick function to determine which tip percentage was selected
function tipPercentSelection() {
	tipPercent = document.querySelector('.tip-item').value;
	return tipPercent;
}
//calculate tipAmount based on tipPercent divided by 100 times the bill and divide that total by people.
function tipAmount() {
	let tipAmountEach = ((tipPercent / 100) * bill) / people;
	return tipAmountEach;
}
//only allow 2 decimal places for bill input
function setTwoNumberDecimal(event) {
	this.value = parseFloat(this.value).toFixed(2);
}

//calculate total bill amount per person as bill times tipPercent/100 + 1 then divide that total by people
