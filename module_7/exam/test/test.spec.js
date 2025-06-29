const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
describe('Exam', () => {
    it('Foo', () => {
      var foo = 'hi';
      assert.exists(foo, 'hi is neither `null` nor `undefined`');
    });

    it('[10, 20, 30]', () => {
      expect([10, 20, 30]).to.be.an('array').that.includes(2);
    });

    it('ordered', () => {
      expect([2, 1]).to.have.ordered.members([1, 2])
    });

    it('Title', () => {
    assert.lengthOf(new Map([['a',1],['b',2],['c',3]]), 3, 'map has size of 6');
    });
  });