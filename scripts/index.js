class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = '0'
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        if (this.currentOperand === '0') return
        if (this.currentOperand.toString().trim().length === 1) {
            this.currentOperand = '0'
            return
        }

        if (this.currentOperand.toString().includes('-') && this.currentOperand.toString().length === 2) {
            this.currentOperand = '0'
            return
        }

        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = '0'
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (this.operation === '÷' && current === 0) return

        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '^':
                computation = prev ** current
                break
            default:
                return
        }
        if (computation.toString().length > 16)
            computation = Number(computation.toFixed(15))
        this.currentOperand = String(computation).trim()
        this.operation = undefined
        this.previousOperand = ''
    }

    computeSqrt() {
        if (parseFloat(this.currentOperand) < 0) return
        let computation = Math.sqrt(parseFloat(this.currentOperand))
        this.currentOperand = computation
    }

    changeSign() {
        let computation
        
        if (this.currentOperand === '0') return

        if (this.currentOperand.toString().includes('-')) {
            computation = this.currentOperand.slice(1, this.currentOperand.length)
        } else {
            computation = `-${this.currentOperand}`
        }
        this.currentOperand = computation
        
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]

        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''

        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const sqrtButton = document.querySelector('[data-sqrt]')
const plusMinusButton = document.querySelector('[data-plus-minus]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

sqrtButton.addEventListener('click', button => {
    calculator.computeSqrt()
    calculator.updateDisplay()
})

plusMinusButton.addEventListener('click', button => {
    calculator.changeSign()
    calculator.updateDisplay()
})
