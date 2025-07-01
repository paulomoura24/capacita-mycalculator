import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('0');
  const [prevInput, setPrevInput] = useState(null);
  const [operator, setOperator] = useState(null);
  const [awaitingOperand, setAwaitingOperand] = useState(false);

  const handleButtonClick = (value) => {
    if (value === 'C') {
      // Clear the calculator
      setInput('0');
      setPrevInput(null);
      setOperator(null);
      setAwaitingOperand(false);
      return;
    }

    if (value === '±') {
      // Change the sign
      setInput((parseFloat(input) * -1).toString());
      return;
    }

    if (value === '%') {
      // Calculate percentage
      setInput((parseFloat(input) / 100).toString());
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      // Handle operators
      if (prevInput !== null && operator !== null && !awaitingOperand) {
        // If there's a previous input and an operator, calculate the result
        const result = performCalculation();
        setInput(result);
        setPrevInput(result);
      } else {
        setPrevInput(input);
      }
      setOperator(value);
      setAwaitingOperand(true);
      return;
    }

    if (value === '=') {
      // Handle equals
      if (prevInput !== null && operator !== null) {
        const result = performCalculation();
        setInput(result);
        setPrevInput(null);
        setOperator(null);
        setAwaitingOperand(false);
      }
      return;
    }

    if (value === '.') {
      // Handle decimal point
      if (!input.includes('.')) {
        setInput(input + '.');
      }
      return;
    }

    // Handle number input
    if (awaitingOperand) {
      setInput(value);
      setAwaitingOperand(false);
    } else {
      setInput(input === '0' ? value : input + value);
    }
  };

  const performCalculation = () => {
    const prev = parseFloat(prevInput);
    const current = parseFloat(input);

    switch (operator) {
      case '+':
        return (prev + current).toString();
      case '-':
        return (prev - current).toString();
      case '*':
        return (prev * current).toString();
      case '/':
        return (prev / current).toString();
      default:
        return current.toString();
    }
  };

  return (
    <div className="calculator">
      <Display value={input} />
      <div className="button-grid">
        <Button value="C" onClick={handleButtonClick} />
        <Button value="±" onClick={handleButtonClick} />
        <Button value="%" onClick={handleButtonClick} />
        <Button value="/" onClick={handleButtonClick} className="operator" />

        <Button value="7" onClick={handleButtonClick} />
        <Button value="8" onClick={handleButtonClick} />
        <Button value="9" onClick={handleButtonClick} />
        <Button value="*" onClick={handleButtonClick} className="operator" />

        <Button value="4" onClick={handleButtonClick} />
        <Button value="5" onClick={handleButtonClick} />
        <Button value="6" onClick={handleButtonClick} />
        <Button value="-" onClick={handleButtonClick} className="operator" />

        <Button value="1" onClick={handleButtonClick} />
        <Button value="2" onClick={handleButtonClick} />
        <Button value="3" onClick={handleButtonClick} />
        <Button value="+" onClick={handleButtonClick} className="operator" />

        <Button value="0" onClick={handleButtonClick} className="double" />
        <Button value="." onClick={handleButtonClick} />
        <Button value="=" onClick={handleButtonClick} className="operator" />
      </div>
    </div>
  );
};

export default Calculator;
