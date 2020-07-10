"use strict";

//elements
let containerDiv, inputArea, submitBtn, aboutBtn, modal, loadingDiv, resultDiv;
let currentDate = new Date();
let currentYear = currentDate.getFullYear();

//functions
const splitChoices = () => {
	return inputArea.value.split(',');
}

const shuffleChoices = (choices) => {
	//implementation using a Fisher-Yates shuffle algorithm
	let array = [...choices];
	let m = array.length,
		t,
		i;

	// While there remain elements to shuffle
	while (m) {
		// Pick a remaining element
		i = Math.floor(Math.random() * m--);

		// Swap it with the current element.
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	return array;
}

const validateInput = () => {
	let inputVal = inputArea.value;
	let inputCount = splitChoices().length;
	let validationRes;
	if (inputVal.length < 1) {
		validationRes = {
			valid: false,
			message: "Gimme something to work with here!"
		}
	} else {
		validationRes = {
			valid: true,
			message: (inputCount === 1)?", but you only gave us one option! You didn't need us!":"!"
		}
	}
	return validationRes;
}

const makeChoice = () => {
	resultDiv.innerHTML = "";
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
			loadingDiv.innerText = `Your selection in ${dispNum}...`;
			setTimeout(function () {
				updateLoadingDiv("Go!")
			}, 1000);
		} else {
			loadingDiv.innerText = `Your selection in ${dispNum}...`;
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
		let selection;
		if (choiceArray.length === 1) {
			selection = choiceArray[0];
		} else {
			selection = shuffleChoices(choiceArray)[Math.floor(Math.random() * choiceArray.length)];
		}
		resultDisplay = "Your choice is " + selection + validationResult.message;
		updateLoadingDiv(3);
	} else {
		resultDisplay = validationResult.message;
		displayResult(true);
	}
}

const rankChoices = () => {
	resultDiv.innerHTML = "";
	let rankingDisplay = document.createElement('ol');
	rankingDisplay.setAttribute('type', '1');
	let resultDisplay;
	let numberOfChoices;
	const displayResult = (fromInvalid) => {
		if (!fromInvalid) {
			if (numberOfChoices === 1) {
				let comeOn = document.createElement('p');
				let comeOnText = document.createTextNode("One option isn't difficult to rank, but . . . ");
				comeOn.append(comeOnText);
				resultDiv.append(comeOn);
			}
			loadingDiv.innerText = "";
			loadingDiv.classList.add("invisible");
			resultDiv.append(rankingDisplay);
		} else {
			resultDiv.innerText = resultDisplay;
			
		}
	}

	const updateLoadingDiv = dispNum => {
		if (dispNum === "Go!") {
			loadingDiv.innerText = dispNum;
			setTimeout(displayResult, 1000);
		} else if (dispNum === 1) {
			loadingDiv.innerText = `Your choice ranking in ${dispNum}...`;
			setTimeout(function () {
				updateLoadingDiv("Go!")
			}, 1000);
		} else {
			loadingDiv.innerText = `Your choice ranking in ${dispNum}...`;
			setTimeout(function () {
				updateLoadingDiv(dispNum - 1)
			}, 1000);
		}
	}

	let validationResult = validateInput();
	if (validationResult.valid) {
		loadingDiv.classList.remove("invisible");
		let choiceArray = splitChoices();
		numberOfChoices = (choiceArray.length >= 3)?3:choiceArray.length;
		let rankings = shuffleChoices(choiceArray);
		for (let i = 0; i < numberOfChoices; i++) {
			let listItem = document.createElement('li');
			let itemText = document.createTextNode(rankings[i]);
			listItem.appendChild(itemText);
			rankingDisplay.append(listItem);
		}
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