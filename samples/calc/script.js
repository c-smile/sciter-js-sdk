class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
        this.currentOperand = "";
        this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "")
      this.compute();

    this.operation = operation;
    this.previousOperand = this.currentOperand;
        this.currentOperand = "";
  }

  compute() {
    let computation;
        const prev = Number.parseFloat(this.previousOperand);
        const current = Number.parseFloat(this.currentOperand);
        if (Number.isNaN(prev) || Number.isNaN(current)) return;
    switch (this.operation) {
            case "+":
        computation = prev + current;
        break;
            case "-":
        computation = prev - current;
        break;
            case "*":
        computation = prev * current;
        break;
            case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
        this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
        const integerDigits = Number.parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        const integerDisplay = Number.isNaN(integerDigits) ? "" : integerDigits.toLocaleString("en", {maximumFractionDigits: 0});
        if (decimalDigits != undefined)
      return `${integerDisplay}.${decimalDigits}`;

      return integerDisplay;
    }

  updateDisplay() {
        this.currentOperandTextElement.textContent = this.getDisplayNumber(this.currentOperand);
        this.previousOperandTextElement.textContent = this.operation == undefined ? "" : `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

for (const button of numberButtons) {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
    });
}

for (const button of operationButtons) {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
    });
}

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

//console.log("Hello!"); - should show that black scary thing