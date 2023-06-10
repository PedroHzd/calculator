const arithmetic = document.querySelector(".arithmetic");
const result = document.querySelector(".result");
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
        let product = calculation(numberOfUser);
        if(typeof product === "number") {
            result.textContent = `${numberOfUser} = ${product}`;
            numberOfUser = `${product}`;
            return arithmetic.textContent = numberOfUser;
        } else {
            alert("Something is wrong...")
            return arithmetic.textContent;
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
            let product = calculation(numberOfUser);
            if(typeof product === "number") {
                result.textContent = `${numberOfUser} = ${product}`;
                numberOfUser = `${product}`;
                return arithmetic.textContent = numberOfUser;
            } else {
                alert("Something is wrong...")
                return arithmetic.textContent;
            }
        }

        numberOfUser += `${number}`;
        arithmetic.textContent = numberOfUser;
    })
});

//returns false if a string has wrong operators in order 
//Ex. "-*123*123" "-123*-*123" "123-*123" "123--" "/123-1" "132/123+"

//otherwise returns the completed operation in a data type of Number
function calculation(string) {
    let length = stringCheckOperation(string).length;
    let finalArrayOfOperators = stringCheckOperation(string);

    if(length === 1) {
        let stringArray = string.split(`${finalArrayOfOperators[0]}`);
       switch(finalArrayOfOperators[0]) {
        case "+":
            return addition(+stringArray[0], +stringArray[1]);
        case "-":
            return subtraction(+stringArray[0], +stringArray[1])
        case "*":
            return multiplication(+stringArray[0], +stringArray[1]);
        case "/":
            return division(+stringArray[0], +stringArray[1]);
       }
    } else if (length === 2) {
        if (finalArrayOfOperators[0] === "-" && finalArrayOfOperators[1] != "-") {
            let stringArray = string.split(`${finalArrayOfOperators[1]}`);
            switch(finalArrayOfOperators[1]) {
                case "+":
                    return addition(+stringArray[0], +stringArray[1]);
                case "*":
                    return multiplication(+stringArray[0], +stringArray[1]);
                case "/":
                    return division(+stringArray[0], +stringArray[1]);
            }
        } else if (finalArrayOfOperators[0] != "-") {
            let stringArray = string.split(`${finalArrayOfOperators[0]}`);
            switch(finalArrayOfOperators[0]) {
                case "+":
                    return addition(+stringArray[0], +stringArray[1]);
                case "*":
                    return multiplication(+stringArray[0], +stringArray[1]);
                case "/":
                    return division(+stringArray[0], +stringArray[1]);
               }
        } else {
            let stringArray = string.split(`-`);
            if(string[0] === "-") {
                return subtraction(+`-${stringArray[1]}`, +stringArray[2]);
            } else {
                return addition(+stringArray[0], +stringArray[2]);
            }
        }
    } else if (length === 3) {
        if(finalArrayOfOperators[1] != "-") {
            let stringArray = string.split(`${finalArrayOfOperators[1]}`);
            switch(finalArrayOfOperators[1]) {
                case "+":
                    return addition(+stringArray[0], +stringArray[1]);
                case "*":
                    return multiplication(+stringArray[0], +stringArray[1]);
                case "/":
                    return division(+stringArray[0], +stringArray[1]);
            } 
        } else {
            let stringArray = string.split(`-`);
            return subtraction(+`-${stringArray[1]}`, +`-${stringArray[3]}`);
        }
    } else {
        return false;
    }
}

//returns false if the string has 4 or more operators 
//returns false if the string has incoherent operators
//Ex. "--123-123" "123*123-" "123-*123" "/123123" "123123*" "/*123123" "123123/*" "123*12*3"

//otherwise returns the operators from the string inside an array ("/", "*", "-", "+")
function stringCheckOperation(string) {
    let arrayOfNumbers = string.split(""); // split the string on every character
    let amountOfOperators = []; // this array has operators in the string Ex. ["-", "+", "/",]
    let indexOfOperators = []; // this array has the indexes (the location of the operators)

    arrayOfNumbers.forEach((char, index) => {
        if(char === "+" || char === "-" || char === "*" || char === "/") {
            amountOfOperators.push(char);
            indexOfOperators.push(index);
        }
    })

    if(errorForMultipleOperators(amountOfOperators)) {
        return false;
    }

    if(amountOfOperators.length === 1 && indexOfOperators[0] > 0 && indexOfOperators[0] < (arrayOfNumbers.length - 1)) {
        // ["*"] ["/"] ["+"] ["-"]
        return amountOfOperators;
    } else if (amountOfOperators.length === 2) {
        // ["*", "-"] ["/", "-"] ["+", "-"] ["-", "-"] and the reverse
        // ["-", "*"] ["-", "/"] ["-", "+"] ["-", "-"]
        if(arrayOfNumbers[0] === "-" && indexOfOperators[1] < (arrayOfNumbers.length - 1)
            && indexOfOperators[1] != (indexOfOperators[0] + 1)) {
            return amountOfOperators;
        } else if (indexOfOperators[0] > 0 && indexOfOperators[1] < (arrayOfNumbers.length - 1)
                    && indexOfOperators[1] === (indexOfOperators[0] + 1)) {
            return amountOfOperators;
        } else {
            return false;
        }
    } else if (amountOfOperators.length === 3 && string[0] === "-" && indexOfOperators[2] === (indexOfOperators[1] + 1)
                && indexOfOperators[2] < (arrayOfNumbers.length - 1) && string[2] != "-") {
        //only returns the array if the operators are in this format
        //-Number*-Number
        //-Number/-Number
        //-Number+-Number
        //-Number--Number
        return amountOfOperators;
    } else {
        return false;
    }
}

//returns false for acceptable operators
//Example ["*", "*"] this return false
function errorForMultipleOperators(array) {
    if(array.length === 1) {
        return false;
    } else if(array.length === 2) {
//["*", "*"] ["/", "/"] ["+", "+"] ["-", "-"]
        if(array[0] === array[1]) {
            if(array[0] === "*") {
                return true;
            } else if(array[0] === "/") {
                return true;
            } else if (array[0] === "+") {
                return true;
            } else {
                return false; // for double negative
            }
        } else if (array[0] === "-" || array[1] === "-") {
            return false; // one of the two operators must be a negative
        } else {
            return true; 
        }
    } else if(array.length === 3 && array[0] === "-" && array[2] === "-") {
        return false;
    } else {
        return true;
    }
}

function addition(a, b) {
    if(isNaN(a + b)) {
        return false;
    }
    return a + b;
}
function subtraction(a, b) {
    if(isNaN(a - b)) {
        return false;
    }
    return a - b;
}
function division(a, b) {
    if (b === 0 || isNaN(a / b)) {
        return false;
    }
    return a / b;
}
function multiplication(a, b) {
    if(isNaN(a * b)) {
        return false;
    }
    return a * b;
}