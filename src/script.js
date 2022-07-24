class Calculator {
	constructor(outputAccTextElement, outputCurrTextElement) {
		this.outputAccTextElement = outputAccTextElement;
		this.outputCurrTextElement = outputCurrTextElement;
		this.clear();
	}

	clear() {
		this.outputAcc = "";
		this.outputCurr = "";
		this.operation = undefined;
	}

	delete() {
		this.outputCurr = this.outputCurr.toString().slice(0, -1);
	}

	appendNumber(number) {
		if (number === "." && this.outputCurr.includes(".")) return;
		this.outputCurr = this.outputCurr.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.outputCurr === "") return;
		if (this.outputAcc !== "") {
			this.compute();
		}
		this.operation = operation;
		this.outputAcc = this.outputCurr;
		this.outputCurr = "";
	}

	compute() {
		let computation;
		const acc = parseFloat(this.outputAcc);
		const curr = parseFloat(this.outputCurr);
		if (isNaN(acc) || isNaN(curr)) return;
		switch (this.operation) {
			case "+":
				computation = acc + curr;
				break;
			case "-":
				computation = acc - curr;
				break;
			case "x":
				computation = acc * curr;
				break;
			case "÷":
				computation = acc / curr;
				break;
			default:
				return;
		}
		this.outputCurr = computation;
		this.operation = undefined;
		this.outputAcc = "";
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.outputCurrTextElement.innerText = this.getDisplayNumber(this.outputCurr);
		if (this.operation != null) {
			this.outputAccTextElement.innerText = `${this.getDisplayNumber(this.outputAcc)} ${
				this.operation
			}`;
		} else {
			this.outputAccTextElement.innerText = "";
		}
	}
}

const numberButtons = document.querySelectorAll("[data-number");
const operationButtons = document.querySelectorAll("[data-operation");
const equalsButton = document.querySelector("[data-equals");
const deleteButton = document.querySelector("[data-delete");
const allClearButton = document.querySelector("[data-all-clear");
const outputAccTextElement = document.querySelector("[data-output-acc");
const outputCurrTextElement = document.querySelector("[data-output-curr");

const calculator = new Calculator(outputAccTextElement, outputCurrTextElement);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener("click", (button) => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
