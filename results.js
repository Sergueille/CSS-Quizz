const url = window.location.search;
const urlParams = new URLSearchParams(url);

const scoreText = document.getElementById("score-num");
const ansCount = document.getElementById("ans-count");
const ansTimeText = document.getElementById("ans-time");

const correct = urlParams.get("correct")
const total = urlParams.get("total")
let percent = Math.round((correct / total) * 100);
let score = Math.round(correct * correct * percent / 10);
let ansTime = Math.round((urlParams.get("maxtime") / total) * 10) / 10

if (total == 0) {
    percent = 0;
    score = 0;
    ansTime = 0;
}

scoreText.innerHTML = score;
ansCount.innerHTML = `Réponses correctes : ${correct} / ${total} (${percent}%)`;
ansTimeText.innerHTML = `Temps de réponse moyen: ${ansTime} secondes`;

