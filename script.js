let currentInput = '0';
let previousInput = '';
let operation = null;

const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    previousDisplay.innerText = operation ? `${previousInput} ${operation}` : '';
}

function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') compute();
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function compute() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '×': result = prev * current; break;
        case '÷': result = prev / current; break;
        default: return;
    }
    currentInput = result.toString();
    operation = undefined;
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operation = null;
    updateDisplay();
}

// KEYBOARD SUPPORT
window.addEventListener('keydown', e => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '=' || e.key === 'Enter') compute();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearDisplay();
    if (['+', '-', '*', '/'].includes(e.key)) {
        let op = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
        chooseOperation(op);
    }
});