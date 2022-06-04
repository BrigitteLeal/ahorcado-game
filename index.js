const keyboard = document.querySelector('#keyboard');
const keyboardLetters = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ñ"],
    ["z", "x", "c", "v", "b", "n", "m"]
];
const listElements = [];
const secretWordAhorcado = document.querySelector("#secretWordAhorcado");
const myRightAnswer = [];
const myWrongAnswer = [];
const myAnswer = [];
let secretWord = ["h", "o", "l", "a"];
let secretArray = [" _ ", " _ ", " _ ", " _ "];
let button;

secretWordAhorcado.innerHTML = secretArray.join("");

keyboardLetters.map(letter => {
    const list = document.createElement("ul");
    letter.map(letter => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <button onclick="pressLetter()" id=${letter}>${letter}</button>
        `;
        list.appendChild(listItem);
    });
    listElements.push(list);
});
keyboard.append(...listElements);

const pressLetter = () => {
    button = event.target;
    validateWord(button.id);
    console.log(button.id);
}
const validateWord = (letter) => { d
    console.log(secretWord);
    myAnswer.push(button.id);
    console.log(myAnswer);
    const includedLetter = secretWord.includes(letter);
    if(includedLetter){
        // myRightAnswer.push(button.id);
        button.style.setProperty("background-color", "green");
        for (let i = 0 ; i < secretWord.length; i ++){
            if (letter === secretWord[i]){
                secretArray[i] = letter; 
                secretWordAhorcado.textContent = secretArray.join("");
            }
        }
    }else{
        // myWrongAnswer.push(button.id);
        button.style.setProperty("background-color", "red");
    }
    attempts();
}
const attempts = () => {
    if(myAnswer.length > 10){
        alert("Ahorcado. Se acabaron los intentos");
    }
}
//crear teclado
//función presionar letra
//funcion validar letra e imprimirla
//manipular el DOM para que se forme los espacios de la palabra secreta