const expect = require('expect')
var packageTest = require('./test')
var test = packageTest.test
var repeat = packageTest.repeat

describe('Test the decimal rule', () => {
    it('should validate all the decimal scenarios', (done) => {
        var state = test({
            field: 'decimal',
            rule: 'decimal',
            valid: [
                '123',
                '00123',
                '-00123',
                '0',
                '-0',
                '+123',
                '0.01',
                '.1',
                '1.0',
                '-.25',
                '-0',
                '0.0000000000001',
            ],
            invalid: [
                '0,01',
                ',1',
                '1,0',
                '-,25',
                '0,0000000000001',
                '0٫01',
                '٫1',
                '1٫0',
                '-٫25',
                '0٫0000000000001',
                '....',
                ' ',
                '',
                '-',
                '+',
                '.',
                '0.1a',
                'a',
                '\n',
            ]
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the float rule', () => {
    it('should validate all the float scenarios', (done) => {
        var state = test({
            field: 'float',
            rule: 'float_between: -150,150',
            valid: [
                '123',
                '123.',
                '123.123',
                '-123.123',
                '-0.123',
                '+0.123',
                '0.123',
                '.0',
                '-.123',
                '+.123',
                '01.123',
                '-0.22250738585072011e-307',
                '150.00'
            ],
            invalid: [
                '123,123',
                '150.1',
                '150.0000000001',
                '  ',
                '',
                '.',
                'foo',
            ]
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the bytes_between rule', () => {
    it('should validate all the bytes_between scenarios', (done) => {
        var state = test({
            field: 'float',
            rule: 'bytes_between: 2,3',
            valid: [
                'abc', 
                'de'
            ],
            invalid: [
                '', 
                '𠀋', 
                '千竈通り',
                'a', 
                'abcd'
            ]
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the hexadecimal rule', () => {
    it('should validate all the hexadecimal scenarios', (done) => {
        var state = test({
            field: 'hexadecimal',
            rule: 'hexadecimal',
            valid: [
                'deadBEEF',
                'ff0044',
            ],
            invalid: [
                'abcdefg',
                '',
                '..',
            ]
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the decimal_digits rule', () => {
    it('should validate all the decimal_digits scenarios with params 2,3', (done) => {
        var state = test({
            field: 'decimal number',
            rule: 'decimal_digits: 2,3',
            valid: [
                '123',
                '00123',
                '-00123',
                '0',
                '-0',
                '+123',
                '0.01',
                '1.043',
                '.15',
                '-.255',
                '-0',
            ],
            invalid: [
                '0.0000000000001',
                '0.0',
                '.1',
                '1.0',
                '-.2564',
                '0.0',
                '٫1',
                '1٫0',
                '-٫25',
                '0٫0000000000001',
                '....',
                ' ',
                '',
                '-',
                '+',
                '.',
                '0.1a',
                'a',
                '\n',
            ]
        })
        expect(state).toBe(true)
        done()
    })
});