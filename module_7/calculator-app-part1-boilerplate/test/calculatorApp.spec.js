const chai = require('chai');
const expect = chai.expect;
const { addition, subtraction, multiplication, division } = require('../src/calculatorApp');

describe('Addition Functionality', () => {
  it('Check for addition of two positive numbers and return the sum as positive number', () => {
    // Write Test Case Here
    expect(addition(5, 10)).to.be.equal(15);
  });

  it('Check for addition of two negative numbers and return the sum as negative number.', () => {
    // Write Test Case Here
    expect(addition(-5, -10)).to.be.equal(-15);
  });

  it('Check if either of number is negative produce subtracted output.', () => {
    // Write Test Case Here
    expect(addition(-5, 10)).to.be.equal(5);
  });
});

describe('Subtraction Functionality', () => {
  it('Check for subtracting two positive number and return positive subtraction', () => {
    expect(subtraction(15, 10)).to.be.equal(5);
  });
  it('Check if either of number is negative produce sum as output', () => {
    expect(subtraction(-5, 10)).to.be.equal(-15);
  });
  it('Subtracting zero will produce zero as subtraction.', () => {
    expect(subtraction(0, 0)).to.be.equal(0);
  });
});

describe('Multiplication Functionality', () => {
  it('Check for multiplication of two positive numbers and return the product as positive number', () => {
    expect(multiplication(5, 10)).to.be.equal(50);
  });

  it('Check for multiplication of two negative numbers and return the product as positive number', () => {
    expect(multiplication(-5, -10)).to.be.equal(50);
  });

  it('Check if either of number is negative produce negative product.', () => {
    expect(multiplication(-5, 10)).to.be.equal(-50);
  });
});

describe('Division Functionality', () => {
  it('Check for division of two positive numbers and return the quotient as positive number', () => {
    expect(division(10, 2)).to.be.equal(5);
  });

  it('Check for division of two negative numbers and return the quotient as positive number', () => {
    expect(division(-10, -2)).to.be.equal(5);
  });

  it('Check if either of number is negative produce negative quotient.', () => {
    expect(division(-10, 2)).to.be.equal(-5);
  });

  it('Check if denominator is zero throw error.', () => {
    expect(() => division(10, 0)).to.throw("ERROR::Divide by zero error..!");
  });
});
