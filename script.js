const billInput = document.querySelector(".bill-input");
const billErrorElement = document.getElementById("error-bill");
const pplErrorElement = document.getElementById("error-ppl");
const tipErrorElement = document.getElementById("error-tip")
const tipButtons = document.querySelectorAll(".tip-btn");
const pplNum = document.querySelector(".ppl-input");
const tipFive = document.getElementById("five-btn");
const tipTen = document.getElementById("ten-btn");
const tipFifteen = document.getElementById("fifteen-btn");
const tipTwentyFive = document.getElementById("twentyfive-btn");
const tipFifty = document.getElementById("fifty-btn");
const customTipBtn = document.getElementById("custom-btn");
const customTipInput = document.querySelector(".custom-input");
let isValid = true;

//validate numbers and error elements
function validateBill () {
    const billAmount = parseFloat(billInput.value);
    if (isNaN(billAmount) || billAmount <= 0) {
        billErrorElement.style.display = "inline";
        billInput.style.border = "2px solid red";
        isValid = false;
    } else {
    billErrorElement.style.display = "none";
    billInput.style.border = "1px solid #ccc";
    isValid = true;
}
}

function validateInput () {
    const pplAmount = parseFloat(pplNum.value);
    if (isNaN(pplAmount) || pplAmount <= 0) {
        pplErrorElement.style.display = "inline";
        pplNum.style.border = "2px solid red";
        isValid = false;
    } else {
    pplErrorElement.style.display = "none";
    pplNum.style.border = "1px solid #ccc";
    isValid = true;
}
}

//tip buttons
function validateTip() {
    let isTipSelected = false;
    tipButtons.forEach((button) => {
        if (button.classList.contains("active")) {
            isTipSelected = true
        }
});

if (!isTipSelected && !customTipInput.value === "") {
    tipErrorElement.style.display = "inline";
    isValid = false;
} else {
    tipErrorElement.style.display = "none";
    isValid = true;
}
};

tipButtons.forEach((button) => {
    button.addEventListener("click", () => {
        tipButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        customTipInput.value = "";
        tipButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        customTipInput.style.display = "none";
        customTipBtn.style.display = "inline";
        validateTip();
    });
});

customTipBtn.addEventListener("click", () => {
    customTipInput.style.display = "inline";
    customTipBtn.style.display = "none";
    customTipInput.focus();
    validateTip();
});

//calculate
function calculate () {
    validateBill();
    validateInput();
    validateTip();

    if (isValid) {
        const billAmount = parseFloat(billInput.value);
        const numOfPeople = parseFloat(pplNum.value);
        let tipPercentage;
        if (tipFive.classList.contains("active")) {
            tipPercentage = 5;
        } else if(tipTen.classList.contains("active")) {
            tipPercentage = 10;
        } else if (tipFifteen.classList.contains("active")) {
            tipPercentage = 15;
        } else if (tipTwentyFive.classList.contains("active")) {
            tipPercentage = 25;
        } else if (tipFifty.classList.contains("active")) {
            tipPercentage = 50;
        } else if (customTipBtn.classList.contains("active")) {
            tipPercentage = parseFloat(customTipInput.value);
        } else {
            return;
        }
        const tipAmount = (billAmount * tipPercentage) / 100;
        const totalPerPerson = (billAmount + tipAmount);
        document.getElementById("amount-output").textContent = `$${tipAmount.toFixed(2)}`;
        document.getElementById("total-output").textContent = `$${totalPerPerson.toFixed(2)}`;
        document.getElementById("amount-output").style.display = "inline";
        document.getElementById("total-output").style.display = "inline";
    }else {
        // If any of the required inputs are invalid, hide the output elements
        document.getElementById("amount-output").style.display = "none";
        document.getElementById("total-output").style.display = "none";
      }
}

billInput.addEventListener("input", calculate);
pplNum.addEventListener("input", calculate);
tipButtons.forEach((button) => {
  button.addEventListener("click", calculate);
});

billInput.addEventListener("input", validateBill);
pplNum.addEventListener("input", validateInput);