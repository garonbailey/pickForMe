"use strict";

//elements
let containerDiv, inputArea, submitBtn, aboutBtn, modal, loadingDiv, resultDiv;
let currentDate = new Date();
let currentYear = currentDate.getFullYear();

//functions
const splitChoices = () => {
	return inputArea.value.split(',');
}

const selectOption = (choices) => {
	let optionCount = choices.length;
	let choiceIndex = Math.floor(Math.random() * optionCount);
	return choices[choiceIndex];
}

const validateInput = () => {
	let inputVal = inputArea.value;
	let inputCount = splitChoices().length;
	let validationRes;
	if (inputVal.length < 1) {
		validationRes = {
			valid: false,
			message: "Please enter some choices!"
		}
	} else {
		validationRes = {
			valid: true,
			message: (inputCount === 1)?", but you only gave us one option! You could've chosen that!":"!"
		}
	}
	return validationRes;
}

const makeChoice = () => {
	resultDiv.innerText = "";
	const displayResult = (fromInvalid) => {
		if (!fromInvalid) {
			loadingDiv.innerText = "";
			loadingDiv.classList.add("invisible");
		}
		resultDiv.innerText = resultDisplay;
	}

	const updateLoadingDiv = dispNum => {
		if (dispNum === "Go!") {
			loadingDiv.innerText = dispNum;
			setTimeout(displayResult, 1000);
		} else if (dispNum === 1) {
			loadingDiv.innerText = dispNum;
			setTimeout(function () {
				updateLoadingDiv("Go!")
			}, 1000);
		} else {
			loadingDiv.innerText = dispNum;
			setTimeout(function () {
				updateLoadingDiv(dispNum - 1)
			}, 1000);
		}
	}

	let validationResult = validateInput();
	let resultDisplay;
	if (validationResult.valid) {
		loadingDiv.classList.remove("invisible");
		let choiceArray = splitChoices();
		let selection = selectOption(choiceArray);
		resultDisplay = "Your choice is " + selection + validationResult.message;
		updateLoadingDiv(3);
	} else {
		resultDisplay = validationResult.message;
		displayResult(true);
	}
}

const showAbout = () => {
	modal.style.display = "block";
	containerDiv.classList.add("dim");
}

const closeAbout = () => {
	modal.style.display = "none";
	containerDiv.classList.remove("dim");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//get elements and set variables after page load
window.onload = () => {
	containerDiv = document.querySelector('#container');
	inputArea = document.querySelector('#choices-input');
	submitBtn = document.querySelector('#choice-submit');
	aboutBtn = document.querySelector('#about-button');
	modal = document.querySelector('#about-info');
	loadingDiv = document.querySelector('#loading');
	resultDiv = document.querySelector('#your-guidance');
}