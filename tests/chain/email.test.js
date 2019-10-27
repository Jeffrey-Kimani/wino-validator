const expect = require('expect')
var packageTest = require('./test')
var test = packageTest.test
var repeat = packageTest.repeat

describe('Test the email rule', () => {
    it('should validate all the email scenarios', (done) => {
        var state = test({
            field: 'email',
            rule: 'email',
            valid: [
                'foo@bar.com',
                'x@x.au',
                'foo@bar.com.au',
                'foo+bar@bar.com',
                'hans.m端ller@test.com',
                'hans@m端ller.com',
                'test|123@m端ller.com',
                'test123+ext@gmail.com',
                'some.name.midd.leNa.me+extension@GoogleMail.com',
                '"foobar"@example.com',
                '"  foo  m端ller "@example.com',
                '"foo\\@bar"@example.com',
                `${repeat('a', 64)}@${repeat('a', 63)}.com`,
                `${repeat('a', 64)}@${repeat('a', 63)}.${repeat('a', 63)}.${repeat('a', 63)}.${repeat('a', 58)}.com`,
                `${repeat('a', 64)}@${repeat('a', 63)}.com`,
            ],
            invalid: [
                'invalidemail@',
                'invalid.com',
                '@invalid.com',
                'foo@bar.com.',
                'somename@ｇｍａｉｌ.com',
                'foo@bar.co.uk.',
                'z@co.c',
                'ｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌｇｍａｉｌ@gmail.com',
                `${repeat('a', 64)}@${repeat('a', 251)}.com`,
                `${repeat('a', 65)}@${repeat('a', 250)}.com`,
                `${repeat('a', 64)}@${repeat('a', 64)}.com`,
                `${repeat('a', 31)}@gmail.com`,
                'test1@invalid.co m',
                'test2@invalid.co m',
                'test3@invalid.co m',
                'test4@invalid.co m',
                'test5@invalid.co m',
                'test6@invalid.co m',
                'test7@invalid.co m',
                'test8@invalid.co m',
                'test9@invalid.co m',
                'test10@invalid.co m',
                'test11@invalid.co m',
                'test12@invalid.co　m',
                'test13@invalid.co　m',
                'gmail...ignores...dots...@gmail.com',
                'test@gmail.com',
                'test.1@gmail.com',
                'ends.with.dot.@gmail.com',
                'multiple..dots@gmail.com',
                'multiple..dots@stillinvalid.com',
                'test123+invalid! sub_address@gmail.com',
            ]
        })
        expect(state).toBe(true)
        done()
    })
});