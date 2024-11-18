const flags = [
    { country: "Indonesia", src: "indonesia.webp" },
    { country: "italy", src: "italy.webp" },
    { country: "japan", src: "japan.webp" },
    { country: "argentina", src: "argentina.webp"},
    { country: "africa", src: "africa.webp"},
    { country: "india", src: "india.webp"},
    { country: "france", src: "france.webp"},
    { country: "mexico", src: "mexico.webp"},
    { country: "sweden", src: "sweden.webp"},
    { country: "turkey", src: "turkey.webp"},
];
let score = 0;
let timeLeft = 60;
let currentFlagIndex = 0;
let timer;

document.getElementById("start-btn").addEventListener("click", startGame);

function startGame() {
    score = 0;
    timeLeft = 60;
    currentFlagIndex = 0;
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
    document.getElementById("start-btn").style.display = "none";
    loadFlag();
    startTimer();
}

function loadFlag() {
    if (currentFlagIndex < flags.length) {
        const flagData = flags[currentFlagIndex];
        document.getElementById("flag-image").src = flagData.src;
        generateOptions(flagData.country);
    } else {
        endGame();
    }
}

function generateOptions(correctAnswer) {
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomCountry = flags[Math.floor(Math.random() * flags.length)].country;
        if (!options.includes(randomCountry)) {
            options.push(randomCountry);
        }
    }
    options.sort(() => Math.random() - 0.5);
    options.forEach(option => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option, correctAnswer));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score += 10;
        document.getElementById("score").textContent = `Score: ${score}`;
    }
    currentFlagIndex++;
    loadFlag();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    alert(`Game over! Your score is ${score}`);
    document.getElementById("start-btn").style.display = "block";
}

window.onload = function() {
    var music = document.getElementById('background-music');
    music.play();
};

document.getElementById('start-btn').addEventListener('click', function() {
    var clickSound = document.getElementById('button-sound');
    clickSound.play(); 
});

function gameOver() {
    document.getElementById("game-over-popup").style.display = "block";
    backgroundMusic.pause();
}

function gameWin() {
    document.getElementById("win-popup").style.display = "block";
    backgroundMusic.pause();
}

function restartGame() {
    document.getElementById("game-over-popup").style.display = "none";
    document.getElementById("win-popup").style.display = "none";
    backgroundMusic.play();
}

function goToHome() {
    window.location.href = "index.html";
}
