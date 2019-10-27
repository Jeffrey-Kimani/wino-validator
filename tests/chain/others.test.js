const expect = require('expect')
var packageTest = require('./test')
var test = packageTest.test
var repeat = packageTest.repeat

describe('Test the contains rule', () => {
    it('should validate all the contains scenarios', (done) => {
        var state = test({
            field: 'contains',
            rule: 'contains:foo',
            valid: [
                'foo', 'foobar', 'bazfoo'
            ],
            invalid: [
                'bar', 'fobar'
            ]
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the matches rule', () => {
    // it('should validate strings against a pattern', (done) => {
    //     var state = test({
    //         field: 'matches',
    //         rule: 'matches:/abc/',
    //         valid: [
    //             'abc', 'abcdef', '123abc'
    //         ],
    //         invalid: [
    //             'acb', 'Abc'
    //         ]
    //     })
    //     expect(state).toBe(true)
    //     done()
    // })

    it('should validate strings against a string', (done) => {
        var state = test({
            field: 'matches',
            rule: 'matches:abc',
            valid: [
                'abc', 'abcdef', '123abc'
            ],
            invalid: [
                'acb', 'Abc'
            ]
        })
        expect(state).toBe(true)
        done()
    })
});