const calculatorDisplay = document.querySelector('h1')
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.getElementById('clear-btn')

let firstValue = 0
let operatorValue = ''
let nextValue = false

function numberValue(number) {
  if (nextValue) {
    calculatorDisplay.textContent = number
    nextValue = false
  } else {
    const displayValue = calculatorDisplay.textContent
    calculatorDisplay.textContent =
      displayValue === '0' ? number : displayValue + number
  }
}

const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent)
  if (operatorValue && nextValue) {
    operatorValue = operator
    return
  }
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue)
    calculatorDisplay.textContent = calculation
    firstValue = calculation
  }
  nextValue = true
  operatorValue = operator
}

inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => numberValue(inputBtn.value))
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value))
  } else if (inputBtn.classList.contains('clear')) {
    inputBtn.addEventListener('click', () => numberValue(0))
  }
})