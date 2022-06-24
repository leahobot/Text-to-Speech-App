const openModal = document.querySelector(".open-text");
const closeModal = document.querySelector(".close");
const textBox = document.querySelector(".text-container");
const selectVoice = document.getElementById("select-voice");
const textArea = document.getElementById("text-area");
const readText = document.querySelector(".read-text");
const deleteText = document.querySelector(".delete-text");
const mainContainer = document.querySelector(".main-container");

const images = [
	{
		image: "./images/angry.jpg",
		text: "I'm angry",
	},

	{
		image: "./images/bathe.jpg",
		text: "I want to take a bath",
	},

	{
		image: "./images/brush teeth.jpg",
		text: "I want to brush my teeth",
	},

	{
		image: "./images/brush-hair.jpg",
		text: "I want to brush my hair",
	},

	{
		image: "./images/cat.jpg",
		text: "I want to see my cat",
	},

	{
		image: "./images/dog.jpg",
		text: "I want my dog",
	},

	{
		image: "./images/drink.jpg",
		text: "I want to drink water",
	},

	{
		image: "./images/food.jpg",
		text: "I'm hungry",
	},

	{
		image: "./images/grandma.jpg",
		text: "I want to visit Grand-Ma",
	},

	{
		image: "./images/home.jpg",
		text: "I want to go home",
	},

	{
		image: "./images/working.jpg",
		text: "I'm working now",
	},

	{
		image: "./images/snow.jpg",
		text: "It's snowing outside",
	},

	{
		image: "./images/sunny.jpg",
		text: "It's sunny outside",
	},

	{
		image: "./images/hurt.jpg",
		text: "I'm hurt",
	},

	{
		image: "./images/money.jpg",
		text: "I need some money",
	},

	{
		image: "./images/play.jpg",
		text: "I want to play outside",
	},

	{
		image: "./images/rain.jpg",
		text: "It's raining outside",
	},

	{
		image: "./images/read.jpg",
		text: "I want to read",
	},

	{
		image: "./images/scared.jpg",
		text: "I'm scared",
	},

	{
		image: "./images/school.jpg",
		text: "I want to go to school",
	},

	{
		image: "./images/sleepy.jpg",
		text: "I'm feeling sleepy",
	},

	{
		image: "./images/tired.jpg",
		text: "I am tired",
	},

	{
		image: "./images/toilet.jpg",
		text: "I want to go to the bathroom",
	},

	{
		image: "./images/TV.jpg",
		text: "I want to watch TV",
	},

	{
		image: "./images/write.jpg",
		text: "I want to write my assignments",
	},
];

images.forEach(image);

function image(item) {
	const box = document.createElement("div");
	const {image, text} = item;

	box.classList.add("box");
	box.innerHTML = `
                        <img src="${image}" alt="${text}"/>
                        <p class="image-text">${text}</p>     
                         `;
	mainContainer.appendChild(box);

	box.addEventListener("click", () => {
		setTextMessage(text);
		box.classList.add("active");
		speakText();

		setTimeout(removeActive, 1000);
		function removeActive() {
			box.classList.remove("active");
		}
	});
}

let message = new SpeechSynthesisUtterance();

let voices = [];

openModal.addEventListener("click", openBox);
closeModal.addEventListener("click", closeBox);
speechSynthesis.addEventListener("voiceschanged", getVoice);
selectVoice.addEventListener("change", changeVoiceAccent);
readText.addEventListener("click", readMessage);
deleteText.addEventListener("click", deleteMessage);

function openBox(event) {
	textBox.style.transform = "translateY(0)";
	document.querySelector(".body-contrast").style.display = "block";
}

function closeBox(event) {
	textBox.style.transform = "translateY(-300%)";
	document.querySelector(".body-contrast").style.display = "none";
}

function getVoice() {
	voices = speechSynthesis.getVoices();

	voices.forEach((voice) => {
		const option = document.createElement("option");

		option.value = voice.name;
		option.innerText = `
                              ${voice.name} ${voice.lang}
            `;

		selectVoice.appendChild(option);
	});
}

function setTextMessage(text) {
	message.text = text;
}

function speakText() {
	speechSynthesis.speak(message);
}

function changeVoiceAccent(event) {
	message.voice = voices.find((voice) => voice.name === event.target.value);
}

function readMessage(event) {
	setTextMessage(textArea.value);
	speakText();
}

function deleteMessage(event) {
	textArea.value = "";
}
