const API_URL = [
    `https://palabras-aleatorias-public-api.herokuapp.com/random-by-length`,
    `?length=8`
].join(``);
let keyboard = document.querySelector('#keyboard');
let keyboardLetters = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
    ["Z", "X", "C", "V", "B", "N", "M"]
];
const secretWordAhorcado = document.querySelector("#secretWordAhorcado");
const attempCounter = document.querySelector('#attempCounter');
let hangmanImg = document.querySelector('#hangman');
let myRightAnswer = [];
let myWrongAnswer = [];
let myAnswer = [];
let listElements = [];
let secretWord = [];
let secretArray = [" _ ", " _ ", " _ ", " _ ", " _ ", " _ ", " _ "];
let secretArray1 = [" _ ", " _ ", " _ ", " _ ", " _ ", " _ ", " _ "];
let button;
let list;
let listItem;
// let message;
secretWordAhorcado.innerHTML = secretArray.join("");
const getRandomWord = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data);
    if (res.status !== 200){
        spanError.innerHTML= `Hubo un error: ` + res.status + data.message;
    }else{
        const word = data.body.Word;
        console.log(word);
        const array = word.toUpperCase().split("");
        console.log(array);
        secretWord = array;
        
    }
}
getRandomWord();
const startGame = () => {
    keyboardLetters.map(letter => {
    list = document.createElement("ul");
    letter.map(letter => {
        listItem = document.createElement("li");
        listItem.innerHTML = `
            <button onclick="pressLetter()" id=${letter}>${letter}</button>
        `;
        list.appendChild(listItem);
    });
    listElements.push(list);
});
keyboard.append(...listElements);
console.log(keyboard);
}
// const randomMsg = () => {
//     message = secretWord[Math.floor(Math.random() * secretWord.length)];
//     console.log(message);
//     return message;
// };
const pressLetter = () => {
    button = event.target;
    validateWord(button.id);
    console.log(button.id);
}
const validateWord = (letter) => {
    console.log(secretWord, letter);
    myAnswer.push(button.id);
    console.log(myAnswer);
    const includedLetter = secretWord.includes(letter);
    console.log(includedLetter);
    if(includedLetter){
        myRightAnswer.push(button);
        button.style.background = "#77e03a";
        for (let i = 0 ; i < secretWord.length; i ++){
            if (letter === secretWord[i]){
                secretArray[i] = letter;
                console.log(secretArray, myAnswer);
                secretWordAhorcado.textContent = secretArray.join("");
                console.log(secretArray[i], secretWord[i]);
                const winner = secretArray.every((letter) => letter != " _ ");
                console.log(winner);
                if (winner){
                    setTimeout(() => {
                        let rta = confirm("Usted ha ganado. ¿Quiere volver a jugar?");
                        if(rta){
                            resetWord();
                        }
                    },100);
                }
            }
        }
    }else{
        myWrongAnswer.push(button);
        button.style.background = "#f8002f";
        switch (myWrongAnswer.length) {
                case 1:
                    hangmanImg.src = '../assets/1.png'
                    break;
                case 2:
                    hangmanImg.src = '../assets/2.png'
                    break;
                case 3:
                    hangmanImg.src = '../assets/3.png'
                    break;
                case 4:
                    hangmanImg.src = '../assets/4.png'
                    break;
                case 5:
                    hangmanImg.src = '../assets/5.png'
                    break;
                case 6:
                    hangmanImg.src = '../assets/6.png'
                    break;
                case 7:
                    hangmanImg.src = '../assets/7.png'
                    break;
                case 8:
                    hangmanImg.src = '../assets/8.png'
                    break;
                case 9:
                    hangmanImg.src = '../assets/9.png'
                        break;
                case 10:
                    hangmanImg.src = '../assets/10.png'
                        break;
                default:
                    break;
        }
        console.log(myWrongAnswer.length);
    }
    console.log(myRightAnswer, myWrongAnswer);
    attempts();
}
const attempts = () => {
    myWrongAnswer.map((lap, i) => {
        console.log(lap);
        if(lap )
        attempCounter.innerHTML = `<span>${i+1}</span>`;
    })
    if(myWrongAnswer.length >= 10){
        setTimeout(() => {
            let rta1 = confirm("Se acabaron los intentos. ¿Quiere volver a intentarlo?");
            if(rta1){
                resetWord();
            }
        },500);
        
    }
}
const resetWord = () => {
    secretWordAhorcado.textContent = secretArray1.join("");
    attempCounter.innerHTML = 0;
    myRightAnswer.forEach(button => {
        button.style.removeProperty('background-color');
    });
    myWrongAnswer.forEach(button => {
        button.style.removeProperty('background-color');
    })
    myAnswer = [];
    myRightAnswer = [];
    myWrongAnswer = [];
    secretArray = [...secretArray1];
    hangmanImg.src = '../assets/0.png'
    getRandomWord();
    console.log(myAnswer, myRightAnswer, myWrongAnswer, secretArray, secretArray1);
}
startGame();
// randomMsg();



//resetear 





// Pulsa con el ratón o el dedo las letras del abecedario para adivina la palabra escondida.
// Tienes 10 intentos.


// const greeting = document.querySelector('#greeting');
// let doYouNeedADeveloper = true;
// const greet = () => {
//     greeting.innerHTML = 'Welcome to my linkedIn';
//     if("doYouNeedADeveloper"){
//         const me = {
//             fistName: "Brigitte",
//             lastName: "Leal",
//             rol: "Frontend Developer Junior",
//             availability: "Full time",
//             work: "Remote"
//             contact: true;
//         }
//         me.contact;
//     } else {
//         greeting.innerHTML = 'Thank you for comming';
//     }
// }

