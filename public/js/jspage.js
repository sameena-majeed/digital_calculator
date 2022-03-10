function Calculator() {
  var exp_array = [],
    operators = ["*", "/", "+", "-"],
    number = "",
    i,
    that = this,
    operator,
    equation = document.getElementById("equation"),
    display = document.getElementById("display");
  display.textContent = "0";

  this.evaluate = function (operator) {
    let exprsn_string = exp_array.toString();
    let exprsn = exprsn_string.replaceAll(',', '');
    let num1, num2;
    let found = exprsn.indexOf(operator);
    num1 = exprsn.substring(0, found);
    num2 = exprsn.substring(found + 1, exprsn.length + 1);
    try {
      if (num1 === "" && num2 === "") {
        console.log("Invalid operands!");
      }
      if (operator == "/") {
        if (num1 == 0 && num2 == 0) {
          equation.textContent = "Division by zero is undefined";
          return;
        }
      }
      let result = eval(exprsn);
      display.textContent = result;
      equation.textContent = exprsn + "=";
    } catch (err) {
      equation.textContent = "Invalid Number!";
    }
  }

  this.clear = function () {
    exp_array = [];
    number = "";
    display.textContent = "0";
    equation.textContent = "";
  };

  this.printEquation = function () {
    equation.textContent = "";
    for (i = 0; i < exp_array.length; i += 1) {
      equation.textContent += exp_array[i];
    }
  };

  this.printDisplay = function () {
    display.textContent = "";
    for (i = 0; i < exp_array.length; i += 1) {
      display.textContent += exp_array[i];
    }
  };

  this.checkInput = function (input) {
    return operators.indexOf(input) === -1 ? false : true;
  }

  this.input = function (key) {
    var input = key;
    var testInput = that.checkInput(input);
    if (testInput && number === "") {
      number = "0";
    }
    if (input === "=" && exp_array.length === 0) {
      this.clear;
    } else if (testInput) {
      operator = input;
      exp_array.push(input);
      number = "";
      that.printDisplay();
    } else if (input === "C") {
      that.clear();
    } else if (input === "=") {
      if (number !== "") {
        number = "";
        that.printEquation();
        that.evaluate(operator);
      } else {
        number = "";
        let store = display.textContent;
        that.clear();
        equation.textContent = store;
      }
    }
    else if (input === "⌫" && exp_array.length == 0) {
      that.clear();
    }
    else if (input === "⌫" && exp_array.length != 0) {
      exp_array.pop();
      that.printDisplay();
      return;
    }
    else {
      number = input;
      if (input == '.') {
        exp_array.push(number);
      } else {
        exp_array.push(parseInt(number, 10));
      }
      that.printDisplay();
    }
  };
}

var calculate = new Calculator();
var nodes = document.getElementById("calc-buttons").childNodes;
for (var i = 0; i < nodes.length; i++) {
  if (nodes[i].nodeName.toLowerCase() === "span") {
    nodes[i].addEventListener("click", clickHandler)
  }
}

function clickHandler(e) {
  let key = e.target.textContent;
  calculate.input(key);
}

//for keyboard input
document.addEventListener('keydown', keydown_handler);
function keydown_handler(e) {
  let key = e.key;
  let flag = false;
  if ((key >= 0 && key <= 10) || (calculate.checkInput(key) || (key == '.'))) {
    key = key;
    flag = true;
  }
  else if (key == 'Backspace') {
    key = "⌫";
    flag = true;
  } else if (key == "Enter") {
    key = "=";
    flag = true;
  } else if (key == 'c' || key == 'C') {
    key = "C";
    flag = true;
  }
  if (flag === true) {
    calculate.input(key);
    console.log(key);
  }

  // for hover effect
  var nodes = document.getElementById("calc-buttons").childNodes;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeName.toLowerCase() === "span") {
      let check_i = nodes[i].innerText;
      if (check_i == key && check_i != 'C' && check_i != 'c' && check_i != "⌫") {
        nodes[i].classList.add('hoverTrial');
        //y doesnt this work?
        // setTimeout(function() {
        //   nodes[i].classList.remove('hoverTrial');
        // }, 100);       
      }
    }
  }
}

document.addEventListener('keyup', keyup_handler);
function keyup_handler(e) {
  let key = e.key;
  if (key == "Enter") {
    key = "=";
  }
  var nodes = document.getElementById("calc-buttons").childNodes;
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].nodeName.toLowerCase() === "span") {
      if (nodes[i].innerText == key) {
        nodes[i].classList.remove('hoverTrial');

      }
    }
  }
}