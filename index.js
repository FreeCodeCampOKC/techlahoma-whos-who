loadRemainingPeople();

var person;
getPerson();
updateScore();

document.getElementById("check").addEventListener("click", check);
document.getElementById("skip").addEventListener("click", skip);

/**
 * Gets list of people from people.js, if user runs out of possibilities
 * then win() is called
 *
 * @method getPerson
 */
function getPerson() {
	var possibilities = people.filter((x) => x.picture && !x.done && !x.skip);

	if (possibilities.length === 0) {
		possibilities = people.filter((x) => x.picture && !x.done);
		people.forEach((x) => (x.skip = null));
	}

	if (possibilities.length > 0) {
		if (possibilities.length > 1 && person) {
			possibilities = possibilities.filter((x) => x.firstName != person.firstName || x.lastName != person.lastName);
		}

		person = possibilities[Math.floor(Math.random() * possibilities.length)];
		document.getElementById("img").src = person.picture;
		document.getElementById("img").title = person.firstName[0] + person.lastName[0];
		document.getElementById("link").href = "https://github.com/" + person.githubUsername;
	} else {
		win();
	}
}

/**
 * Method for displaying results of winning the game
 *
 * @method win
 */
function win() {
	var pictured = people
		.sort((x, y) => x.firstName.localeCompare(y.firstName))
		.filter((x) => x.picture)
		.map((x) => x.firstName + " " + x.lastName)
		.join("<br>");
	var notpictured = people
		.filter((x) => !x.picture)
		.map((x) => x.firstName + " " + x.lastName)
		.join("<br>");
	var resultElement = document.getElementById("result");

	resultElement.innerHTML = "You got them all!<br><br>" + pictured;

	if (notpictured) {
		resultElement.innerHTML += "<br><br>Not Pictured:<br>" + notpictured;
	}

	resultElement.classList.remove("alert-success");
	resultElement.classList.remove("alert-warning");
	resultElement.classList.remove("alert-danger");

	document.getElementById("play").style.display = "none";
	document.getElementById("score").style.display = "none";
}

/**
 * Method used to load options for the user to choose from
 * when they are selecting names
 *
 * @method loadOptions
 * @param {Array} list is an array of people
 * @param {Method} select is return value from the method
 * document.getElementById(), which is used to fetch people
 * by their 'firstName' and 'lastName'
 */
function loadOptions(list, select) {
	//clear the list first
	var length = select.options.length;
	for (i = length - 1; i >= 0; i--) {
		select.options[i] = null;
	}

	for (i = 0; i < list.length; i++) {
		var opt = document.createElement("option");
		opt.text = list[i];
		opt.value = list[i];
		select.add(opt, null);
	}
}

/**
 * Array method used to return unique values in array filter
 *
 * @param value is the value stored in the array, so if filtering by firstName,
 * then the value would be 'Bob'
 * @param index is the current index value on the filter array
 * @param self is the array of values we are filtering
 * @returns {boolean}
 */
function unique(value, index, self) {
	return self.indexOf(value) === index;
}

var successMessages = ["You got it!", "Great job!"];
var halfRightMessages = ["So close!", "You're half right!"];
var failureMessages = ["Try again!", "Not even close!", "Did you even try?"];

/**
 * This method is used to the check answer given by the user
 *
 * @method check
 */
function check() {
	var firstNameSelected = document.getElementById("firstName").value;
	var lastNameSelected = document.getElementById("lastName").value;
	var resultElement = document.getElementById("result");
	removeResultStyles();

	if (firstNameSelected === person.firstName && lastNameSelected === person.lastName) {
		resultElement.innerHTML = successMessages[Math.floor(Math.random() * successMessages.length)];
		resultElement.classList.add("alert-success");

		people.find(({ firstName, lastName }) => firstName === person.firstName && lastName === person.lastName).done = "1";
		loadRemainingPeople();
		getPerson();
		updateScore();
	} else if (firstNameSelected === person.firstName || lastNameSelected === person.lastName) {
		resultElement.innerHTML = halfRightMessages[Math.floor(Math.random() * halfRightMessages.length)];
		resultElement.classList.add("alert-warning");
	} else {
		resultElement.innerHTML = failureMessages[Math.floor(Math.random() * failureMessages.length)];
		resultElement.classList.add("alert-danger");
	}
}

/**
 * This allows the user to skip the current person they're trying
 * to guess in the game
 *
 * @method skip
 */
function skip() {
	people.find(({ firstName, lastName }) => firstName === person.firstName && lastName === person.lastName).skip = "1";
	var resultElement = document.getElementById("result");
	resultElement.innerHTML = "";
	removeResultStyles(resultElement);
	getPerson();
}

/**
 * This removes any alert styling whenever relevant
 *
 * @method removeResultStyles
 */
function removeResultStyles() {
	var resultElement = document.getElementById("result");
	resultElement.classList.remove("alert-success");
	resultElement.classList.remove("alert-warning");
	resultElement.classList.remove("alert-danger");
}

/**
 * This updates the users current score
 *
 * @method updateScore
 */
function updateScore() {
	document.getElementById("done").innerHTML = people.filter((x) => x.done).length;
	document.getElementById("left").innerHTML = people.filter((x) => x.picture && !x.done).length;
}

/**
 * A method used for CHEATING
 *
 * @param {Any} advance is a param that is needed for CHEATING
 * @returns {string}
 */
function cheat(advance) {
	document.getElementById("firstName").value = person.firstName;
	document.getElementById("lastName").value = person.lastName;

	if (advance) {
		check();
	}

	return person.firstName + " " + person.lastName;
}

/**
 * This method loads the remaining people that the user
 * has not yet guessed
 *
 * @method loadRemainingPeople
 */
function loadRemainingPeople() {
	var modeSelection = getModeSelection();

	//if mode is set to Hard, remainingPeople will include everyone
	//otherwise, it will only include people who are not yet marked as done.
	var remainingPeople = people.filter((x) => modeSelection == "Hard" || !x.done);

	loadOptions(
		remainingPeople
			.map((x) => x.firstName)
			.filter(unique)
			.sort(),
		document.getElementById("firstName")
	);
	loadOptions(
		remainingPeople
			.map((x) => x.lastName)
			.filter(unique)
			.sort(),
		document.getElementById("lastName")
	);
}

/**
 * This allows the user to switch between easy and hard more
 *
 * @method getModeSelection
 * @returns {string} - The mode that the user selects
 */
function getModeSelection() {
	var modeRadios = document.getElementsByName("mode");
	var modeSelection = "Easy";

	for (let index = 0; index < modeRadios.length; index++) {
		const radio = modeRadios[index];

		if (radio.checked) {
			modeSelection = radio.value;
		}
	}

	return modeSelection;
}
