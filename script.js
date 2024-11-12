'use strict';

// Elements
const resultEl = document.querySelector('.result');

const operators = document.querySelectorAll('.operator');
const operands = document.querySelectorAll('.operand');

const btnClear = document.querySelector('.ac');
const btnSign = document.querySelector('.sign');
const btnPercent = document.querySelector('.percent');
const btnDecimal = document.querySelector('.decimal');
const btnEqual = document.querySelector('.equal');

// Global Variables
let operator = '';
let values = new Array(2).fill('');
let activeValue = 0;
let clickedOperatorOnce = false;

// Functions
const add = function (v1, v2) {
  return `${Number.parseFloat(Number(v1) + Number(v2))}`;
};
const subtract = function (v1, v2) {
  return `${Number.parseFloat(Number(v1) - Number(v2))}`;
};
const multiply = function (v1, v2) {
  console.log(
    'AT MULTIPLY, V1 = ',
    v1,
    'V2 = ',
    v2,
    'RESULT = ',
    Math.round(Number(v1) * Number(v2))
  );
  return `${Number.parseFloat(Number(v1) * Number(v2))}`;
};
const divide = function (v1, v2) {
  if (v2 === '0') return undefined;
  return `${Number.parseFloat(Number(v1) / Number(v2))}`;
};

const operate = function (opr, v1, v2) {
  console.log(`Iam at the Operate function, opr = ${opr}, v1 = ${v1}, v2 = ${v2}`);
  let result;
  if (opr && v1 && v2) {
    switch (opr) {
      case '+':
        result = add(v1, v2);
        break;
      case '-':
        result = subtract(v1, v2);
        break;
      case '*':
        result = multiply(v1, v2);
        break;
      case '/':
        result = divide(v1, v2);
        break;
      default:
        result = 'Error: Invalid operator';
    }
  }
  console.log('Result = ', result);
  return result;
};

const updateDisplay = (r) => {
  console.log('r.length = ', r.length);
  const num = Number(r);
  if (Number.isFinite(Number(r)) && r.length > 9) {
    resultEl.textContent = Number(r).toFixed(3);
  } else if (Number.isFinite(Number(r))) {
    resultEl.textContent = r;
  } else {
    // Error (NaN)
    resultEl.textContent = '0';
    operator = '';
    values = ['', ''];
  }
};

// Event Handlers

// Clear the result and reset all
btnClear.addEventListener('click', (e) => {
  e.preventDefault();
  resultEl.textContent = '0';
  values = ['', ''];
  operator = '';
  activeValue = 0;
  clickedOperatorOnce = false;
});

// Equal Button
btnEqual.addEventListener('click', (e) => {
  e.preventDefault();
  if (operator !== '' && values[0] !== '' && values[1] !== '') {
    let result = operate(operator, values[0], values[1]);
    console.log(result);
    result = result.length > 9 ? result.slice(0, 11) : result;
    if (result) {
      updateDisplay(result);
      values[0] = result;
      values[1] = '';
      activeValue = 1;
      operator = '';
    } else {
      resultEl.textContent = 'Undefined';
      activeValue = 0;
      values[0] = '';
      values[1] = '';
      operator = '';
    }
  }
  console.log(`Values after the Equal = '${values[0]}' , '${values[1]}'`);
});

// Populating the numbers to variables
operands.forEach((oprnd) => {
  oprnd.addEventListener('click', () => {
    // console.log(typeof Number(oprnd.value));
    console.log(
      `Iam at the Operands function, opr = ${operator}, v1 = ${values[0]}, v2 = ${values[1]}`
    );
    if (operator === '' && activeValue === 0) {
      resultEl.textContent = '';
      values[0] += oprnd.value;
      console.log(values[0]);
      values[0] = values[0].length > 10 ? values[0].slice(0, 10) : values[0];
      resultEl.textContent = values[0];
    } else if (operator !== '' && values[0] !== '') {
      activeValue = 1;
      values[1] += oprnd.value;
      console.log(values[1]);
      values[1] = values[1].length > 10 ? values[1].slice(0, 10) : values[1];
      resultEl.textContent = values[1];
    }
  });
});

// Applying Operators
operators.forEach((opr) => {
  opr.addEventListener('click', () => {
    // console.log(opr.value);
    if (operator === '') {
      operator = opr.value;
    } else if (operator !== '') {
      if (values[0] !== '' && values[1] !== '') {
        const result = operate(opr.value, values[0], values[1]);
        updateDisplay(result);
        values[0] = result;
        values[1] = '';
        activeValue = 1;
        operator = opr.value;
      } else if (values[0] !== '' && values[1] === '') {
        values[1] += opr.value;
        activeValue = 1;
        resultEl.textContent = values[1];
      }
    }
  });
});

// Applying Signs
btnSign.addEventListener('click', () => {
  // Toggle between a '-' for the activeValue
  if (resultEl.textContent === values[0] && values[0][0] !== '-') {
    values[0] = `-${values[0]}`;
    updateDisplay(values[0]);
  } else if (resultEl.textContent === values[1] && values[1][0] !== '-') {
    values[1] = `-${values[1]}`;
    updateDisplay(values[1]);
  } else if (resultEl.textContent === values[0] && values[0][0] === '-') {
    values[0] = values[0].slice(1);
    updateDisplay(values[0]);
  } else if (resultEl.textContent === values[1] && values[1][0] === '-') {
    values[1] = values[1].slice(1);
    updateDisplay(values[1]);
  }
});

// Applying the Percentage (%)
btnPercent.addEventListener('click', () => {
  if (resultEl.textContent === values[0]) {
    values[0] = `${Number(values[0]) / 100}`;
    updateDisplay(values[0]);
  } else if (resultEl.textContent === values[1]) {
    values[1] = `${Number(values[1]) / 100}`;
    updateDisplay(values[1]);
  }
});

// Adding Decimals (.)
btnDecimal.addEventListener('click', () => {
  if (resultEl.textContent === '0') {
    values[0] = `0.`;
    updateDisplay(values[0]);
  }
  if (resultEl.textContent === values[0] && !values[0].includes('.')) {
    values[0] = `${values[0]}.`;
    updateDisplay(values[0]);
  } else if (resultEl.textContent === values[1] && !values[1].includes('.')) {
    values[1] = `${values[1]}.`;
    updateDisplay(values[1]);
  }
});
