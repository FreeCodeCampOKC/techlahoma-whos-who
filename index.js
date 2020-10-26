loadRemainingPeople();

var person;
getPerson();
updateScore();

document.getElementById("check").addEventListener("click", check);
document.getElementById("skip").addEventListener("click", skip);

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

function unique(value, index, self) {
	return self.indexOf(value) === index;
}

var successMessages = ["You got it!", "Great job!"];
var halfRightMessages = ["So close!", "You're half right!"];
var failureMessages = ["Try again!", "Not even close!", "Did you even try?"];

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

function skip() {
	people.find(({ firstName, lastName }) => firstName === person.firstName && lastName === person.lastName).skip = "1";
	var resultElement = document.getElementById("result");
	resultElement.innerHTML = "";
	removeResultStyles(resultElement);
	getPerson();
}

function removeResultStyles() {
	var resultElement = document.getElementById("result");
	resultElement.classList.remove("alert-success");
	resultElement.classList.remove("alert-warning");
	resultElement.classList.remove("alert-danger");
}

function updateScore() {
	document.getElementById("done").innerHTML = people.filter((x) => x.done).length;
	document.getElementById("left").innerHTML = people.filter((x) => x.picture && !x.done).length;
}

function cheat(advance) {
	document.getElementById("firstName").value = person.firstName;
	document.getElementById("lastName").value = person.lastName;

	if (advance) {
		check();
	}

	return person.firstName + " " + person.lastName;
}

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
