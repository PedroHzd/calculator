const arithmetic = document.querySelector(".arithmetic");
const btns = Array.from(document.querySelectorAll("button"));

let numberOfUser = "";

window.addEventListener('keydown', (e) => {
    const button = document.querySelector(`button[data-key="${e.key}"]`);
    if(button === null) return;
    button.classList.add("activate"); // attribute to be added data-key="."
    if(e.key === "Backspace") {
        let removedCharacter = numberOfUser.slice(0, numberOfUser.length - 1);
        numberOfUser = removedCharacter;
        return arithmetic.textContent = numberOfUser;
    }
    if(e.key === "Enter") {
        if(typeof calculation(numberOfUser) === "number") {
            let finalNumber = calculation(numberOfUser);
            numberOfUser = `${finalNumber}`;
            return arithmetic.textContent = numberOfUser;
        } else {
            alert("Something is wrong...")
        }
    }
    numberOfUser += `${e.key}`;
    arithmetic.textContent = numberOfUser;
});

window.addEventListener('keyup', (e) => {
    const button = document.querySelector(`button[data-key="${e.key}"]`);
    if(button === null) return;
    button.classList.remove("activate");
});

btns.forEach((button) => {
    button.addEventListener("click", (e) => {
        let number = button.textContent;
        if(number === ".") return;
        if(number === "Delete") {
            let removedCharacter = numberOfUser.slice(0, numberOfUser.length - 1);
            numberOfUser = removedCharacter;
            return arithmetic.textContent = numberOfUser;
        }
        if(number === "Equals") {
            if(typeof calculation(numberOfUser) === "number") {
                let finalNumber = calculation(numberOfUser);
                numberOfUser = `${finalNumber}`;
                return arithmetic.textContent = numberOfUser;
            } else {
                alert("Something is wrong...")
            }
        }
        numberOfUser += `${number}`;
        arithmetic.textContent = numberOfUser;
    })
});

//returns false if a string has 2 or more operators (/, *, -, +)
//otherwise returns the completed operation in the form of a Number
function calculation(string) {
    if(stringCheckOperation(string)) {
        let operator = stringCheckOperation(string);
        let array = string.split(`${operator}`);
        
        switch(operator) {
         case "+":
            return addition(+array[0], +array[1]);
         case "-":
            return subtraction(array[0], array[1]);
         case "*":
            return multiplication(array[0], array[1]);
         case "/":
            return division(array[0], array[1]);
        }
    } else {
        return false
    }
}

//returns false if a string has 2 or more operators (/, *, -, +)
//otherwise returns the operator in a string ("/", "*", "-", "+")
function stringCheckOperation(string) {
    let arrayOfNumbers = string.split("");
    let counter = 0;

    arrayOfNumbers.forEach(char => {
        if(char === "+" || char === "-" || char === "*" || char === "/") {
            counter++;
        } 
    })
    
    if(counter === 1) {
        let result = arrayOfNumbers.find(char => {
            return char === "+" || char === "-" || char === "*" || char === "/"
        })
        return result;
    } else {
        return false;
    }
}

function addition(a, b) {
    return a + b;
}
function subtraction(a, b) {
    return a - b;
}
function division(a, b) {
    return a / b;
}
function multiplication(a, b) {
    return a * b;
}