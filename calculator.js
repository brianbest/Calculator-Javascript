class Calculator {
  constructor() {
    this.product;
    this.currentSolution = [];
    this.operation;

    this.el = $('<div class="calculator">');
    this.el.append('<div class="display">');
    this.el.append('<div class="numbers">');
    this.el.append('<div class="operators">');

    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].forEach((value) => {
      let button = new Button(value, value);
      this.el.find('.numbers').append(button.getElement());
    });

    ['+', '-', '*', '/', '=', 'C'].forEach((value) => {
      let operator = new Operator(value, value);
      this.el.find('.operators').append(operator.getElement());
    });

    this.el.on('button:selected', this.handleButtonClick.bind(this));
    this.el.on('operator:selected', this.handleOperatorClick.bind(this));
  }

  getElement() {
    return this.el;
  }

  handleButtonClick(e, data) {
    this.currentSolution.push(data);
    this.updateDisplay();
  }

  handleOperatorClick(e, data) {
    if (data === "C") {
      this.reset();
      this.updateDisplay();
      return
    }
    if (data === "=" && this.operation) {
      this.product = this.produceProduct(this.currentSolution);
      this.currentSolution.push(data);
      this.currentSolution.push(this.produceProduct(this.currentSolution));

    } else if (!this.operation) {
      this.operation = data;
      this.currentSolution.push(data);
    } else {
      return;
    }

    this.updateDisplay();
  }

  reset() {
    this.product = '';
    this.currentSolution = [];
    this.operation = '';
  }

  updateDisplay() {
    let displayString = ''
    this.currentSolution.forEach((value) => {
      displayString = displayString + new String(value);
    });
    this.el.find('.display').html(displayString);
  }

  produceProduct(currentSolution) {
    let values = [];
    let temp = '';
    let operators = ['+', '-', '*', '/'];

    currentSolution.forEach((value) => {
      if (operators.includes(value)) {
        values.push(parseInt(temp));
        temp = '';
      } else {
        temp = temp + new String(value);
      }
    });
    values.push(parseInt(temp));

    return this.evaluate(values[0], values[1]);
  }

  evaluate(x, y) {
    let operation;
    switch (this.operation) {
      case '+':
        operation = this.add;
        break;
      case '-':
        operation = this.subtract;
        break;
      case '*':
        operation = this.multiply;
        break;
      case '/':
        operation = this.divide;
        break;
    }

    return operation(x, y);
  }


  add(x, y) {
    return x + y;
  }

  subtract(x, y) {
    return x - y;
  }

  multiply(x, y) {
    return x * y;
  }

  divide(x, y) {
    if (x === 0 || y === 0) {
      return "err";
    }
    return x / y;
  }
}
