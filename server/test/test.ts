var assert = require('assert');

describe('Array', function () { // test suite for the array object
    describe('#indexOf()', function () { // describes more specific part of the array object (indexof)
        it('should return -1 when the value is not present', function () { // test case
            assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
});