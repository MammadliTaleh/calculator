const calculatorDisplay=document.querySelectorAll('h1')[0]
const inputBtns = document.querySelectorAll('button')
const clearBtn = document.querySelector('.clear')

let firstValue=0
let awaitingNextValue= false
let operatorValue = ''

const calculate = {
    '/' : (firstNumber,secondNumber)=> firstNumber / secondNumber,
    '+' : (firstNumber,secondNumber)=> firstNumber + secondNumber ,
    '-' : (firstNumber,secondNumber)=> firstNumber - secondNumber ,
    '*' : (firstNumber,secondNumber)=> firstNumber * secondNumber ,
    '=' : (firstNumber,secondNumber)=> secondNumber 
}



function sendNumberValue(number) {
    if(awaitingNextValue) {
        calculatorDisplay.textContent=number
        awaitingNextValue=false
    }
    else {
        const displayValue =calculatorDisplay.textContent
        calculatorDisplay.textContent=displayValue=== '0' ? number : displayValue + number
    }
}

function addDecimal() {
    if(awaitingNextValue) return
    if(calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent =`${calculatorDisplay.textContent}.`
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent)
     if (operatorValue && awaitingNextValue) {
        operatorValue = operator
        return
     }

    if(!firstValue) {
         firstValue = currentValue
    }
     else {
        const calculation = calculate[operatorValue](firstValue,currentValue)
        calculatorDisplay.textContent = calculation 
        firstValue=calculation
     }

     awaitingNextValue= true
     operatorValue=operator
}

inputBtns.forEach(inputBtns=> {
    if(inputBtns.classList.length ===0 ) {
        inputBtns.addEventListener ('click',()=>sendNumberValue(inputBtns.value))
    }
    else if(inputBtns.classList.contains('decimal')) {
        inputBtns.addEventListener('click',()=>addDecimal())
    }
    else if(inputBtns.classList.contains('operator')) {
        inputBtns.addEventListener('click',()=> useOperator(inputBtns.value))

    }
})


function resetAll() {
    firstValue =0
    operatorValue = ''
    awaitingNextValue =false
    calculatorDisplay.textContent='0'
}

clearBtn.addEventListener('click',resetAll)
