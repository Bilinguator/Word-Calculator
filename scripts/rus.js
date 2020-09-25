class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = '0'
        this.previousOperand = ''
        this.rusCurrentOperand = ''
        this.rusPreviousOperand = ''
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

    appendNumber(rusNumber) {
        let number;
        if(rusNumber === 'целых' && this.currentOperand.includes('.')) return
        switch (rusNumber) {
            case 'один':
                number = '1'
                break
            case 'два':
                number = '2'
                break
            case 'три':
                number = '3'
                break
            case 'четыре':
                number = '4'
                break
            case 'пять':
                number = '5'
                break
            case 'шесть':
                number = '6'
                break
            case 'семь':
                number = '7'
                break
            case 'восемь':
                number = '8'
                break
            case 'девять':
                number = '9'
                break
            case 'ноль':
                number = '0'
                break
            case 'целых':
                number = '.'
                break
        }
        
        this.currentOperand = Number(this.currentOperand).toString() + number.toString()
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

        if (this.operation === 'разделить' && current === 0) return

        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case 'плюс':
                computation = prev + current
                break
            case 'минус':
                computation = prev - current
                break
            case 'умножить':
                computation = prev * current
                break
            case 'разделить':
                computation = prev / current
                break
            case 'в степени':
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
    //Получение единиц
    getUnit (number) {
        switch (number) {
            case '1':
                return 'один'
            case '2':
                return 'два'
            case '3':
                return 'три'
            case '4':
                return 'четыре'
            case '5':
                return 'пять'
            case '6':
                return 'шесть'
            case '7':
                return 'семь'
            case '8':
                return 'восемь'
            case '9':
                return 'девять'
            default:
                return ''
        }
    }

    //Получение десятков
    getTens (number) {
        switch (number) {
            case '2':
                return 'двадцать'
            case '3':
                return 'тридцать'
            case '4':
                return 'сорок'
            case '5':
                return 'пятьдесят'
            case '6':
                return 'шестьдесят'
            case '7':
                return 'семьдесят'
            case '8':
                return 'восемьдесят'
            case '9':
                return 'девяносто'
            default:
                return ''
        }
    }

    //Получение 10-19
    getTeen (number) {
        switch (number) {
            case '10':
                return 'десять'
            case '11':
                return 'одиннадцать'
            case '12':
                return 'двенадцать'
            case '13':
                return 'тринадцать'
            case '14':
                return 'четырнадцать'
            case '15':
                return 'пятнадцать'
            case '16':
                return 'шеснадцать'
            case '17':
                return 'семнадцать'
            case '18':
                return 'восемнадцать'
            case '19':
                return 'девятнадцать'
            default:
                return ''
        }
    }

    //Получение сотен
    getHundreds (number) {
        switch (number) {
            case '1':
                return 'сто'
            case '2':
                return 'двести'
            case '3':
                return 'триста'
            case '4':
                return 'четыреста'
            case '5':
                return 'пятьсот'
            case '6':
                return 'шестьсот'
            case '7':
                return 'семьсот'
            case '8':
                return 'восемьсот'
            case '9':
                return 'девятьсот'
            default:
                return ''
        }
    }

    getRusCurrentOperand (number) {

        let stringNumber = String(Number(number))
        number = String(Number(number))

        let decimals = ''
        if (number.split('.')[1]) {
            decimals = number.split('.')[1]
        }
        number = number.split('.')[0]

        if (number === '0' && decimals === '') return 'ноль'

        let rusDisplayNumber        


        //Единицы и десятки
        let unit = ''
        let teen = ''
        let tens = ''

        if (number[number.length - 2] !== '1') {
            unit = this.getUnit(number[number.length - 1])
            tens = this.getTens(number[number.length - 2]) 
        } else {
            teen = this.getTeen(number.slice(number.length - 2, number.length)) 
        }

        
        //Сотни
        let hundred = ''
        
        if (number[number.length - 3]) {
            hundred = this.getHundreds(number[number.length - 3])
        }

        //Сборка единиц и десятков
        let number21

        if (teen !== '') {
            number21 = teen 
        } else {
            number21 = (`${tens} ${unit}`).trim()
        }


        //Тысячи
        let thousandUnit = ''
        let thousandTeen = ''
        let thousandTens = ''
        let thousandHundred = ''
        let thousandWord = ''

        //Единицы и десятки тысяч
        if (number[number.length - 5] !== '1') {
            let num = Number(number[number.length - 4])
            
            if(num === 0) {
                thousandUnit = ''
                thousandWord = 'тысяч'
            } else if (num === 1) {
                if (this.operation === 'разделить' || this.operation === 'умножить') {
                    thousandUnit = 'одну'
                    thousandWord = 'тысячу'
                }
                else {
                    thousandUnit = 'одна'
                    thousandWord = 'тысяча'
                }
            } else if (num === 2) {
                thousandUnit = 'две'
                thousandWord = 'тысячи'
            } else {
                thousandUnit = this.getUnit(number[number.length - 4])
                if(num > 2 && num < 5) {
                    thousandWord = 'тысячи'
                }
                if(num > 4 && num < 10) {
                    thousandWord = 'тысяч'
                }
            }

            thousandTens = this.getTens(number[number.length - 5])
        } else {
            thousandTeen = this.getTeen(number.slice(number.length - 5, number.length -3))
            thousandWord = 'тысяч'
        }

        if(number.slice(number.length - 6, number.length - 3) === '000') {
            thousandWord = ''
        }

        //Сотни тысяч
        if(number[number.length - 6]) {
            thousandHundred = this.getHundreds(number[number.length - 6])
        }

        //Сборка тысяч
        let number654

        if (thousandTeen !== '') {
            number654 = (`${thousandHundred} ${thousandTeen} ${thousandWord}`).trim()
        } else {
            number654 = (`${thousandHundred} ${thousandTens} ${thousandUnit} ${thousandWord}`).trim()
        }


        //Миллионы
        let millionUnit = ''
        let millionTeen = ''
        let millionTens = ''
        let millionHundred = ''
        let millionWord = ''

        //Единицы и десятки миллионов
        if (number[number.length - 8] !== '1') {
            let num = Number(number[number.length - 7])
            
            if(num === 0) {
                millionUnit = ''
                millionWord = 'миллионов'
            } else if (num === 1) {
                millionWord = 'миллион'
            } else {
                if(num > 1 && num < 5) {
                    millionWord = 'миллона'
                }
                if(num > 4 && num < 10) {
                    millionWord = 'миллионов'
                }
            }

            millionUnit = this.getUnit(number[number.length - 7])

            millionTens = this.getTens(number[number.length - 8])
        } else {
            millionTeen = this.getTeen(number.slice(number.length - 8, number.length -6))
            millionWord = 'миллионов'
        }

        if(number.slice(number.length - 9, number.length - 6) === '000') {
            millionWord = ''
        }

        //Сотни миллионов
        if(number[number.length - 9]) {
            millionHundred = this.getHundreds(number[number.length - 9])
        }

        //Сборка миллионов
        let number987
        if (millionTeen !== '') {
            number987 = (`${millionHundred} ${millionTeen} ${millionWord}`).trim()
        } else {
            number987 = (`${millionHundred} ${millionTens} ${millionUnit} ${millionWord}`).trim()
        }


        //Миллиарды
        let billionUnit = ''
        let billionTeen = ''
        let billionTens = ''
        let billionHundred = ''
        let billionWord = ''

        //Единицы и десятки миллиардов
        if (number[number.length - 11] !== '1') {
            let num = Number(number[number.length - 10])
            
            if(num === 0) {
                billionUnit = ''
                billionWord = 'миллиардов'
            } else if (num === 1) {
                billionWord = 'миллиард'
            } else {
                if(num > 1 && num < 5) {
                    billionWord = 'миллиарда'
                }
                if(num > 4 && num < 10) {
                    billionWord = 'миллиардов'
                }
            }

            billionUnit = this.getUnit(number[number.length - 10])

            billionTens = this.getTens(number[number.length - 11])
        } else {
            billionTeen = this.getTeen(number.slice(number.length - 11, number.length -9))
            billionWord = 'миллиардов'
        }

        if(number.slice(number.length - 12, number.length - 9) === '000') {
            billionWord = ''
        }

        //Сотни миллиардов
        if(number[number.length - 12]) {
            billionHundred = this.getHundreds(number[number.length - 12])
        }

        //Сборка миллиардов
        let numberBillions
        if (billionTeen !== '') {
            numberBillions = (`${billionHundred} ${billionTeen} ${billionWord}`).trim()
        } else {
            numberBillions = (`${billionHundred} ${billionTens} ${billionUnit} ${billionWord}`).trim()
        }


        //Триллионы
        let trillionUnit = ''
        let trillionTeen = ''
        let trillionTens = ''
        let trillionHundred = ''
        let trillionWord = ''

        //Единицы и десятки триллионов
        if (number[number.length - 14] !== '1') {
            let num = Number(number[number.length - 13])
            
            if(num === 0) {
                trillionUnit = ''
                trillionWord = 'триллионов'
            } else if (num === 1) {
                trillionWord = 'триллион'
            } else {
                if(num > 1 && num < 5) {
                    trillionWord = 'триллиона'
                }
                if(num > 4 && num < 10) {
                    trillionWord = 'триллионов'
                }
            }

            trillionUnit = this.getUnit(number[number.length - 13])

            trillionTens = this.getTens(number[number.length - 14])
        } else {
            trillionTeen = this.getTeen(number.slice(number.length - 14, number.length -12))
            trillionWord = 'триллионов'
        }

        if(number.slice(number.length - 15, number.length - 12) === '000') {
            trillionWord = ''
        }

        //Сотни триллионов
        if(number[number.length - 15]) {
            trillionHundred = this.getHundreds(number[number.length - 15])
        }

        //Сборка триллионов
        let numberTrillions
        if (trillionTeen !== '') {
            numberTrillions = (`${trillionHundred} ${trillionTeen} ${trillionWord}`).trim()
        } else {
            numberTrillions = (`${trillionHundred} ${trillionTens} ${trillionUnit} ${trillionWord}`).trim()
        }


        //Квадриллионы
        let quadrillionUnit = ''
        let quadrillionTeen = ''
        let quadrillionTens = ''
        let quadrillionHundred = ''
        let quadrillionWord = ''

        //Единицы и десятки квадриллионов
        if (number[number.length - 17] !== '1') {
            let num = Number(number[number.length - 16])
            
            if(num === 0) {
                quadrillionUnit = ''
                quadrillionWord = 'квадриллионов'
            } else if (num === 1) {
                quadrillionWord = 'квадриллион'
            } else {
                if(num > 1 && num < 5) {
                    quadrillionWord = 'квадриллиона'
                }
                if(num > 4 && num < 10) {
                    quadrillionWord = 'квадриллионов'
                }
            }

            quadrillionUnit = this.getUnit(number[number.length - 16])

            quadrillionTens = this.getTens(number[number.length - 17])
        } else {
            quadrillionTeen = this.getTeen(number.slice(number.length - 17, number.length -15))
            quadrillionWord = 'квадриллионов'
        }

        if(number.slice(number.length - 18, number.length - 15) === '000') {
            quadrillionWord = ''
        }

        //Сотни квадриллионов
        if(number[number.length - 18]) {
            quadrillionHundred = this.getHundreds(number[number.length - 18])
        }

        //Сборка квадриллионов
        let numberQuadrillions
        if (quadrillionTeen !== '') {
            numberQuadrillions = (`${quadrillionHundred} ${quadrillionTeen} ${quadrillionWord}`).trim()
        } else {
            numberQuadrillions = (`${quadrillionHundred} ${quadrillionTens} ${quadrillionUnit} ${quadrillionWord}`).trim()
        }




        //Сборка окончательной строки
            let startIndex
            if (number[0] === '-')
                startIndex = 1
            else
                startIndex = 0

            rusDisplayNumber = `${number.slice(startIndex, -18)} ${numberQuadrillions} ${numberTrillions} ${numberBillions} ${number987} ${number654} ${hundred} ${number21}`

            if(Number(number) < 0) {
                rusDisplayNumber = `минус ${rusDisplayNumber}`
            }
            if(stringNumber.slice(0, 2) === "0.")
                rusDisplayNumber = `ноль${rusDisplayNumber.trim()}`
            if (decimals !== '') {
                return this.getRusWithDecimals (`${rusDisplayNumber}.${decimals}`)
            }
            else
                return rusDisplayNumber
    }

    getRusWithDecimals (number) {
        let int = number.toString().split('.')[0]
        let decimals = number.split('.')[1]

        if (decimals === '5')
            return `${int} с половиной`
        else
            return number
    }

    correctOperation (operation) {
        if (operation === 'умножить' || operation === 'разделить')
            return `${operation} на`
        else
            return operation
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getRusCurrentOperand(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getRusCurrentOperand(this.previousOperand)} ${this.correctOperation(this.operation)}`
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