const expect = require('expect')
var packageTest = require('./test')
var test = packageTest.test
var repeat = packageTest.repeat

describe('Test the alpha rule', () => {
    it('should validate default locale alpha strings', (done) => {
        var state = test({
            field: 'name',
            rule: 'alpha',
            valid: [
                'abc',
                'ABC',
                'FoObar',
            ],
            invalid: [
                'abc1',
                '  foo  ',
                '',
                'ÄBC',
                'FÜübar',
                'Jön',
                'Heiß',
            ]
        })
        expect(state).toBe(true)
        done()
    })
    it('should validate bulgarian alpha strings', (done) => {
        var state = test({
            field: 'name',
            rule: 'alpha: bg-BG',
            valid: [
                'абв',
                'АБВ',
                'жаба',
                'яГоДа',
            ],
            invalid: [
                'abc1',
                '  foo  ',
                '',
                'ЁЧПС',
                '_аз_обичам_обувки_',
                'ехо!',
            ]
        })
        expect(state).toBe(true)
        done()
    })
    it('should validate czech alpha strings', (done) => {
        var state = test({
            field: 'name',
            rule: 'alpha: cs-CZ',
            valid: [
                'KŮŇ',
                'ódy',
            ],
            invalid: [
                'ábc1',
                '  fůj  ',
            ]
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the multibyte rule', () => {
    it('should validate all the multibyte scenarios', (done) => {
        var state = test({
            field: 'multibyte',
            rule: 'multibyte',
            valid: [
                'ひらがな・カタカナ、．漢字',
                'あいうえお foobar',
                'test＠example.com',
                '1234abcDEｘｙｚ',
                'ｶﾀｶﾅ',
                '中文',
            ],
            invalid: [
                'abc',
                'abc123',
                '<>@" *.',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the ascii rule', () => {
    it('should validate all the ascii scenarios', (done) => {
        var state = test({
            field: 'ascii',
            rule: 'ascii',
            valid: [
                'foobar',
                '0987654321',
                'test@example.com',
                '1234abcDEF',
            ],
            invalid: [
                'ｆｏｏbar',
                'ｘｙｚ０９８',
                '１２３456',
                'ｶﾀｶﾅ',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the full width rule', () => {
    it('should validate all the full width scenarios', (done) => {
        var state = test({
            field: 'full width',
            rule: 'full_width',
            valid: [
                'ひらがな・カタカナ、．漢字',
                '３ー０　ａ＠ｃｏｍ',
                'Ｆｶﾀｶﾅﾞﾬ',
                'Good＝Parts',
            ],
            invalid: [
                'abc',
                'abc123',
                '!"#$%&()<>/+=-_? ~^|.,@`{}[]',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

// describe('Test the half width rule', () => {
//     it('should validate all the half width scenarios', (done) => {
//         var state = test({
//             field: 'half width',
//             rule: 'half_width',
//             valid: [
//                 `!"#$%&()<>/+=-_? ~^|.,@\`{}[]`,
//                 `l-btn_02--active`,
//                 `abc123い`,
//                 `ｶﾀｶﾅﾞﾬ￩`,
//             ],
//             invalid: [
//                 `あいうえお`,
//                 '００１１',
//             ],
//         })
//         expect(state).toBe(true)
//         done()
//     })
// });

describe('Test the variable width rule', () => {
    it('should validate all the variable width scenarios', (done) => {
        var state = test({
            field: 'variable width',
            rule: 'variable_width',
            valid: [
                'ひらがなカタカナ漢字ABCDE',
                '３ー０123',
                'Ｆｶﾀｶﾅﾞﾬ',
                'Good＝Parts',
            ],
            invalid: [
                'abc',
                'abc123',
                '!"#$%&()<>/+=-_? ~^|.,@`{}[]',
                'ひらがな・カタカナ、．漢字',
                '１２３４５６',
                'ｶﾀｶﾅﾞﾬ',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});