const inputSlider = document.querySelector("[data-lengthSlider]");
// we already made an custom attribute for input slider syntax contains []
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
// custom attribute selected again syntax contains []
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
// this selects all the checkboxes 
// similary we have fetched all the classes and id names into variables to use them below 
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
// we use this as an array of characters or symbols


//initially
let password = "";
let passwordLength = 10;
// as default value of slider is 10
let checkCount = 0;
handleSlider();
//ste strength circle color to grey
setIndicator("#ccc");


//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLength;
    // initially it would be 10
    lengthDisplay.innerText = passwordLength;
    // sets slider length to initial value
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
    // generates a random number then we multiply the difference and we take floor which gives the rounded off value 
    // we added min so that the answer is between max and min
    // max random gives a value between 0 and 1 always , maybe upto 6 decimals 
}

function generateRandomNumber() {
    return getRndInteger(0,9);
    // we have given min and max values 
}

function generateLowerCase() {  
       return String.fromCharCode(getRndInteger(97,123))
       // 97 is the ascii value of a and 123 is the ascii value of z
       // therefore this gives a random ascii number and we change it to character using the above function
       // similarly we use for uppercase
}

function generateUpperCase() {  
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    // we find a random number between 0 and lenght of the above declare symbol const 
    // so that we can use this as min and max values to genrate a random number 
    // we point this random number to the const value by using charAt 
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    // generally all are set to be false 
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
    // update those values true if present in password by checking values of checkboxes
  

    // this is the condition that if it hass all of these values and password length is greater than 8 
    // set it as strong
    // or else other rules for other strength 
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}

async function copyContent() {
    // we use an async function to use await keyword 
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        // we want the process to stall here untill this is not complete so use await 
        // returns a promise 
        copyMsg.innerText = "copied";
        // copymsg is id of a span 
        // this displays on successful copying
    }
    catch(e) {
        // we use try and catch block to throw error 
        // we do this as if we dont use error then in case method throws error then we will wait till eternity 
        // as we have used await function so in error too we will wait 
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");
    // adds a class active to class list in css
    // active class makes the span copied visible  

    setTimeout( () => {
        // after a time of 2s the class would be removed from the css so span wont be visible
        copyMsg.classList.remove("active");
    },1000);

}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    // we already have a variable which tags all the checkboxes 
    checkCount = 0;
    // we applied event listners to all checkboxes using foreach loop
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
        // update this variable by no of checked boxes 
    });

    //special condition
    if(passwordLength < checkCount ) {
        // when we have selected all 4 check boxes or 3 check boxes or 2 check boxes 
        // but password length is 1 then the output password should be equal to the no of checked boxes 
        // general thing will happen in each particular case
        passwordLength = checkCount;
        handleSlider();
        // to update the ui value 
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    // e refers to the  value that the silder is currently pointing to 
    handleSlider();
    // reflects the value at ui
})


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
    // we say that only if the value is non empty then call copy content or dont 
    //or we can say if password length is >0 then copy or dont 
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected
    // atleast one checkbox should be selected
    // therefore theres a need to count the number of selected check boxes
    if(checkCount == 0) 
        return;
    // if  we did  not click any check box then no pass

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
          // when we have selected all 4 check boxes or 3 check boxes or 2 check boxes 
        // but password length is 1 then the output password should be equal to the no of checked boxes 
        // general thing will happen in each particular case
    }

    // let's start the jouney to find new password
    console.log("Starting the Journey");
    //remove old password
    password = "";

    //let's put the stuff mentioned by checkboxes
    // we will look at the checkboxes and make sure that atleast the checked box value should be in password
    // remaining we can add any value 

    // if(uppercaseCheck.checked) {
        // if uppercase is checked add atleast one uppercase value then rest anything
        // similarly all checked boxes
    //     password += generateUpperCase();
    // }

    // if(lowercaseCheck.checked) {
    //     password += generateLowerCase();
    // }

    // if(numbersCheck.checked) {
    //     password += generateRandomNumber();
    // }

    // if(symbolsCheck.checked) {
    //     password += generateSymbol();
    // }


    // to randomly generate values , we have a particular function for each type 
    // we put all functions into an array and then randomly call any array index 
    // the function at called index will execute 
    // this method is better then the prev



    let funcArr = [];

    if(uppercaseCheck.checked)
        // if uppercase is check push this fun into array 
    // later when we visit the array we would have this function to execute
    // similarly all functions would be added to the array of functions if checked 
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
        // compulsory addition refers to all those values which are checked and func in array
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    // in remaining space we randomly generate an index for func array 
    // we call the func at array index generated
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    // to shuffle the password which is generated as it wont be random
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});