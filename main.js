x = 0;
y = 0;

draw_apple = "";

screenWidth = 0;
screenHeight = 0;

apple = "";
toNumber = "";

var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function preload() {
    apple = loadImage('apple.png');
}

function start() {
    document.getElementById("status").innerHTML = "System is listening please speak";
    recognition.start();
}

recognition.onresult = function(event) {

    console.log(event);
    content = event.results[0][0].transcript;

    document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
    toNumber = Number(content);

    if (Number.isInteger(toNumber)) {
        document.getElementById("status").innerHTML = "Started drawing apple";
        draw_apple = "set";
    } else {
        document.getElementById("status").innerHTML = "The speech has not recognized a number";
    }
}

function setup() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas = createCanvas(screenWidth, screenHeight - 150);
    canvas.position(0, 150);
}

function draw() {
    if (draw_apple == "set") {
        document.getElementById("status").innerHTML = toNumber + " Apples drawn";

        var synth = window.speechSynthesis;
        speakData = toNumber + " Apples Drawn";
        var utterThis = new SpeechSynthesisUtterance(speakData);
        synth.speak(utterThis);

        draw_apple = "";

        for (var i = 1; i <= toNumber; i++) {
            x = Math.floor(Math.random() * 700);
            y = Math.floor(Math.random() * 400);
            image(apple, x, y, 50, 50);
        }
    }
}

function speak() {
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}