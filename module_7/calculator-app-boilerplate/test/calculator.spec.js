const assert = require('chai').assert;
const packageFile = require('../package.json');
const calculator = require('../calculator');
const glob = require('glob');
const fs = require('fs');

// variable declairation
let sum = 0;
let sub = 0;
let mul = 0;
let div = 0;

// testsuit
describe('Calculator testing', function () {

  describe('Functionality testing', function () {

    describe('Addition functionality testing', function () {
      // testcase to test is dependencies are used or not
      it('Add two positive numbers, returning get positive sum', function () {
        sum = calculator('A', { lhs: 5, rhs: 10 });
        assert.equal(sum, 15);
      });
      // test case to test add functionality

      it('Add two negative numbers, returning get negative sum', function () {
        sum = calculator('A', { lhs: -5, rhs: -10 });
        assert.equal(sum, -15);
      });

      // test case to test add functionality
      it('Add two number, with either of them is negative, producing subtracted output', function () {
        const sum = calculator('A', { lhs: -5, rhs: 10 });
        assert.equal(sum, 5);
      });

      // test case to test add functionality
      it('Add zeros, produces zero', function () {
        sum = calculator('A', { lhs: 0, rhs: 0 });
        assert.equal(sum, 0);
      });
    });

    describe('Subtraction functionality testing', function () {
      // test case to test subtract functionality
      it('Subtract two positive numbers, returning get positive subtraction',
        function () {
          const result = calculator('S', { lhs: 10, rhs: 5 });
          assert.equal(result, 5);
        });

      // test case to test subtract functionality
      it('Subtract two negative numbers, returning get negative subtraction',
        function () {
          const result = calculator('S', { lhs: -10, rhs: -5 });
          assert.equal(result, -5);
        });

      // test case to test subtract functionality
      it('Subtract two number, with either of them is negative, producing sum output', function () {
          const result = calculator('S', { lhs: 10, rhs: -5 });
          assert.equal(result, 15);
        });

      // test case to test subtract functionality
      it('Subtract zeros, produces zero', function () {
          const result = calculator('S', { lhs: 0, rhs: 0 });
          assert.equal(result, 0);
      });
    });

    describe('Multiplication functionality testing', function () {
      // test case to test multiply functionality
      it('Multiply two positive numbers, returning get positive Multiplication', function () {
        const result = calculator('M', { lhs: 5, rhs: 10 });
        assert.equal(result, 50);
      });
      // test case to test multiply functionality
      it('Multiply two negative numbers, returning get positive Multiplication', function () {
        const result = calculator('M', { lhs: -5, rhs: -10 });
        assert.equal(result, 50);
      });
      // test case to test multiply functionality
      it(`Multiply two number, with either of them is negative, producing negative multiplication output`, function () {
          const result = calculator('M', { lhs: -5, rhs: 10 });
          assert.equal(result, -50);
      });

      // test case to test multiply functionality
      it('Multiply zeros, produces zero', function () {
        const result = calculator('M', { lhs: 0, rhs: 10 });
        assert.equal(result, 0);
      });
    });

    describe('Division functionality testing', function () {
      // test case to test divide functionality

      it('Divide two positive numbers, returning get positive Multiplication', function () {
        const result = calculator('D', { lhs: 10, rhs: 2 });
        assert.equal(result, 5);
      });


      // test case to test divide functionality
      it('Divide two negative numbers, returning get positive Multiplication', function () {
        const result = calculator('D', { lhs: -10, rhs: -2 });
        assert.equal(result, 5);
      });

      // test case to test divide functionality
      it('Divide two number, with either of them is negative, producing negative Division output',
        function () {
          const result = calculator('D', { lhs: -10, rhs: 2 });
          assert.equal(result, -5);
        });

      // test case to test divide functionality
      it(`Should not divide by 0, producing 'Can not divide by zero' message`, function () {
        const result = calculator('D', { lhs: 10, rhs: 0 });
        assert.equal(result, 'Can not divide by zero');
      });
    });

    describe('Unknown operation testing', function () {
      // test case to test divide functionality
      it(`should not calculate if unknown operation is passed, producing 'Unknown operation' message`, function () {
          const result = calculator('X', { lhs: 5, rhs: 5 });
          assert.equal(result, 'Unknown operation');
        });
    });

  });

});