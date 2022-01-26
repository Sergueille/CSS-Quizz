// Texte pour afficher le score
const scoreText = document.querySelector("#score > span");
// Texte pour afficher la question
const question = document.querySelector("#question > span");
// boutons de réponse
const ans = [
	document.querySelector("#btn1"),
	document.querySelector("#btn2"),
	document.querySelector("#btn3"),
	document.querySelector("#btn4")
]

// Timer à l'arrière plan
const timers = [
    document.querySelector("#timer1"),
    document.querySelector("#timer2"),
]

// Liste des questions
// La bonne réponse est toujours la 1ere
const questions = [
	{
		question: "Quel mode de positionnement permet de placer l'élement par rapport sa position dans le flux normal?",
		ans: ["position: relative;", "position: static;", "position: fixed;", "position: absolute;"],
		used: false,
	},
	{
		question: "Lequel de ces éléments est par défaut inline-block",
		ans: ["button", "img", "p", "div"],
		used: false,
	},
	{
		question: "Avec quel attribut faut-il importer un fichier CSS?",
		ans: ["href", "src", "source", "name"],
		used: false,
	},
    {
		question: "Quelle propriété permet d'aligner les élement d'une flexbox sur l'axe pricipal?",
		ans: ["justify-content", "align-content", "justify-items", "align-items"],
		used: false,
	},
    {
		question: "Quelle propriété permet d'aligner les élement d'une flexbox sur l'axe scondaire?",
		ans: ["align-items", "align-content", "justify-items", "justify-content"],
		used: false,
	},
    {
		question: "Comment faire pour qu'un élement ait 10px de marge sur la droite?",
		ans: ["margin: 0 10px;", "margin: 0 0 0 10px;", "margin: 10px 0;", "margin: 0 0 10px 0;"],
		used: false,
	},
    {
		question: "Comment marquer une propriété comme importante?",
		ans: ["color: red !important;", "color: red important!;", "color: red !override;", "color: red override!;"],
		used: false,
	},
    {
		question: "Comment cacher une scrollbar alors que le contenu dépasse?",
		ans: ["overflow: hidden;", "scrollbar: none;", "scrollbar-style: hidden;", "overflow: none;"],
		used: false,
	},
    {
		question: "Quelle couleur est du vert?",
		ans: ["#191", "#3fe", "#ff0000", "#111b55"],
		used: false,
	},
    {
		question: "Comment souligner du texte?",
		ans: ["text-decoration: underline;", "font-decoration: underline;", "font-style: underline;", "text-style: underline;"],
		used: false,
	},
    {
		question: "Comment mettre du texte en gras?",
		ans: ["font-weight: 1000;", "text-weight: bold;", "font-style: bold;", "text-decoration: bold;"],
		used: false,
	},
    {
		question: "Comment sélectionner le 1er enfant d'un div?",
		ans: ["div > *:first-child", "div:first-child", "div > *::first-child", "div::first-child"],
		used: false,
	},
    {
		question: "Quelle couleur CSS est proche du rouge?",
		ans: ["Crimson", "Chartreuse", "PapayaWhip", "Sienna"],
		used: false,
	},
    {
		question: "Si une ombre a des décalages X et Y négatifs, elle sera:",
		ans: ["En haut à gauche de l'élément", "En haut à droite de l'élément", "En bas à gauche de l'élément", "En bas à droite de l'élément"],
		used: false,
	},
    {
		question: "Pour que l'image d'arrière-plan couvre entièrement l'élément, on utilise:",
		ans: ["background-size: cover;", "background-type: contain;", "background-type: contain;", "background: cover;"],
		used: false,
	},
    {
		question: "A quoi correspond le sélecteur 'nav:hover > span'",
		ans: ["Aux span DANS un nav survolé par la souris", "Aux nav DANS un span survolé par la souris", 
        "Aux span survolés par la souris ET un nav", "Aux span ET un nav survolé par la souris"],
		used: false,
	},
    {
		question: "A quoi correspond l'unité vw",
		ans: ["A la largeur de la fenêtre", "A la hauteur de la fenêtre", 
        "A la hauteur de la police de caractère", "A la distance entre l'élément et le haut de l'écran"],
		used: false,
	},
	{
		question: "Quelle propriété permet de changer la police?",
		ans: ["font-family", "font", "font-style", "font-name"],
		used: false,
	}
]

// Couleurs
const btnColor = "#333";
const correctColor = "#090";
const wrongColor = "#900";

// Temps maximum
const maxTime = 30;

let canAnswer = true;
let currentQuestion = null; // Question actuellement utilisée
let time = 0; // Temps restant, utiliser SetTime() au lieu d'assigner
let answerId = 0; // Id de la réponse dans la liste de réponse mélangée
let totalCorrect = 0; // nobre de réponses justes
let total = 0; // nobre de questions terminées, juste ou fausses

Setup();
StartTime()
NewQuestion();

// Mise en place au début du jeu
function Setup(){
	scoreText.innerHTML = "0"
	for (let i = 0; i < 4; i++){
		ans[i].addEventListener("click", (event) => SubmitAnswer(i));
	}
}

// Afficher une nouvelle question
function NewQuestion(){
	let j = 0;
	do {
		let id = Math.floor(Math.random() * questions.length)
		currentQuestion = questions[id];
		j++;
	}
	while (currentQuestion.used && j < 50);
	
	let correctAns = currentQuestion.ans[0];
	currentQuestion.ans.sort((a, b) => 0.5 - Math.random());
	
	question.innerHTML = currentQuestion.question;
	for (let i = 0; i < 4; i++){
		ans[i].style.backgroundColor = btnColor;
		ans[i].innerHTML = currentQuestion.ans[i];
		
		if (correctAns === currentQuestion.ans[i])
			answerId = i;
	}

	canAnswer = true;
}

// Enevnt: le joueur a choidi une réponse
function SubmitAnswer(id) {
	if (canAnswer)
	{
		total++;
		currentQuestion.used = true;
		
		if (id === answerId){
			totalCorrect++;
		}
		else{
			ans[id].style.backgroundColor = wrongColor;
		}
		
		ans[answerId].style.backgroundColor = correctColor;
		scoreText.innerHTML = Math.round(totalCorrect * totalCorrect * (totalCorrect / total) * 10);
		
		canAnswer = false;
		setTimeout(NewQuestion, 1000);
	}
}

// Affiche le temps
function SetTime(newTime) {
    time = newTime;
    let relative = newTime / maxTime;
    relative = Math.max(Math.min(relative, 1), 0);
    let angle = relative * 360;
    timers[0].style.transform = `rotate(${Math.min(angle - 180, 0)}deg)`
    timers[1].style.transform = `rotate(${Math.max(angle - 360, -180)}deg)`
}

// Animation du timer au début
function StartTime() {
    if (time < maxTime) {
        SetTime(time + 1);
        setTimeout(StartTime, 30);
    }
    else {
        timers[0].style.transitionDuration = "900ms";
        timers[1].style.transitionDuration = "900ms";
        DecreaseTime()
    }
}

// Enlève 1 sec et se rapelle 1 sec plus tard
function DecreaseTime() {
    if (time > 0) {
        SetTime(time - 1);
        setTimeout(DecreaseTime, 1000);
    }
    else {
        EndGame()
    }
}

// Termine le jeu
function EndGame() {
    document.location.href = `results.html?correct=${totalCorrect}&total=${total}&maxtime=${maxTime}`;
}
