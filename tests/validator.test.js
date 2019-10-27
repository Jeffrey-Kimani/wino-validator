const expect = require('expect')
const validator = require('./../modules/validator/validate')

describe('Test numeric method', () => {
    it('should return true on a numeric string - 99329932902', (done) => {
        expect(validator.numeric('99329932902')).toBe(true)
        done()
    })

    it('should return false on a non numeric string - +(99)329932902', (done) => {
        expect(validator.numeric('+(99)329932902')).toBe(false)
        done()
    })
});


describe('Test is empty method', () => {
    it('should return true on an empty string', (done) => {
        expect(validator.isEmpty('        ')).toBe(true)
        done()
    })

    it('should return false on a string that is not empty', (done) => {
        expect(validator.isEmpty('    903k  ')).toBe(false)
        done()
    })
});

describe('Test max char method', () => {
    it('should return true if max characters is not exceeded', (done) => {
        expect(validator.maxChar('Geoffrey',10)).toBe(true)
        done()
    })

    it('should return false if max characters is exceeded', (done) => {
        expect(validator.maxChar('Geoffrey Kimani', 11)).toBe(false)
        done()
    })
});

describe('Test min char method', () => {
    it('should return true if min characters is reached', (done) => {
        expect(validator.minChar('slugs',4)).toBe(true)
        done()
    })

    it('should return false if min characters is not reached', (done) => {
        expect(validator.minChar('slug', 6)).toBe(false)
        done()
    })
});

describe('Test char between method', () => {
    it('should return true if string characters fall between defined range', (done) => {
        expect(validator.charBetween('slug',2,4)).toBe(true)
        done()
    })

    it('should return true if string characters doesn\'t fall between defined range min not reached', (done) => {
        expect(validator.charBetween('slug', 6,8)).toBe(false)
        done()
    })
    
    it('should return true if string characters doesn\'t fall between defined range max exceeded', (done) => {
        expect(validator.charBetween('slug', 2,3)).toBe(false)
        done()
    })
});

describe('Test digits between method', () => {
    it('should return true if digits fall between defined range', (done) => {
        expect(validator.digitsBetween('0723989878',9,13)).toBe(true)
        done()
    })

    it('should return true if digits doesn\'t fall between defined range min not reached', (done) => {
        expect(validator.digitsBetween('0723989878', 11,12)).toBe(false)
        done()
    })
    
    it('should return true if digits doesn\'t fall between defined range max exceeded', (done) => {
        expect(validator.digitsBetween('0723989878', 6,9)).toBe(false)
        done()
    })
});

describe('Test in method', () => {
    it('should return true if item exists in an array', (done) => {
        expect(validator.in('apple', ['banana','pinnaples','grapes','apple','melon'])).toBe(true)
        done()
    })

    it('should return false if item does not exist in an array', (done) => {
        expect(validator.in('apple', ['banana', 'pinnaples', 'grapes', 'melon'])).toBe(false)
        done()
    })
});

describe('Test not in method', () => {
    it('should return true if item does not exist in an array', (done) => {
        expect(validator.notIn('apple', ['banana', 'pinnaples', 'grapes', 'melon'])).toBe(true)
        done()
    })

    it('should return false if item exists in an array', (done) => {
        expect(validator.notIn('apple', ['banana', 'pinnaples', 'grapes', 'apple', 'melon'])).toBe(false)
        done()
    })
});


describe('Test is equal to date method', () => {
    it('should return true if date is equal to comparison date', (done) => {
        expect(validator.isEqualToDate(new Date("2013-05-26"), new Date("2013-05-26"))).toBe(true)
        done()
    })

    it('should return false if date is not equal to comparison date', (done) => {
        expect(validator.isEqualToDate(new Date("2013-05-25"), new Date("2013-05-26"))).toBe(false)
        done()
    })
    
    it('should return true if date time is equal to comparison date', (done) => {
        expect(validator.isEqualToDate(new Date("2013-05-26 00:10"), new Date("2013-05-26 00:10"))).toBe(true)
        done()
    })

    it('should return false if date time is not equal to comparison date', (done) => {
        expect(validator.isEqualToDate(new Date("2013-05-26 00:10:20"), new Date("2013-05-26 00:10:40"))).toBe(false)
        done()
    })
    
    // it('should return an error if the values are not date objects', (done) => {
    //     expect(validator.isEqualToDate("2013-05-26 00:10:20", "2013-05-26 00:10:40")).toThrow("ensure the date and the comparison date are Date objects")
    //     done()
    // })
});

describe('Test is before date method', () => {
    it('should return true if date is before comparison date', (done) => {
        expect(validator.isBeforeDate(new Date("2013-05-25"), new Date("2013-05-26"))).toBe(true)
        done()
    })

    it('should return false if date is not before comparison date', (done) => {
        expect(validator.isBeforeDate(new Date("2013-05-28"), new Date("2013-05-26"))).toBe(false)
        done()
    })
    
    it('should return true if date time is before comparison date', (done) => {
        expect(validator.isBeforeDate(new Date("2013-05-26 08:32:23"), new Date("2013-05-26 09:20:24"))).toBe(true)
        done()
    })

    it('should return false if date time is not before comparison date', (done) => {
        expect(validator.isBeforeDate(new Date("2013-05-26 10:30"), new Date("2013-05-26 10:29:59"))).toBe(false)
        done()
    })

    // it('should return an error if the values are not date objects', (done) => {
    //     expect(validator.isEqualToDate("2013-05-26 00:10:20", "2013-05-26 00:10:40")).toThrow("ensure the date and the comparison date are Date objects")
    //     done()
    // })
});

describe('Test is after date method', () => {
    it('should return true if date is after comparison date', (done) => {
        expect(validator.isAfterDate(new Date("2013-05-28"), new Date("2013-05-26"))).toBe(true)
        done()
    })

    it('should return false if date is not after comparison date', (done) => {
        expect(validator.isAfterDate(new Date("2013-05-26"), new Date("2013-05-26"))).toBe(false)
        done()
    })
    it('should return true if date time is after comparison date', (done) => {
        expect(validator.isAfterDate(new Date("2013-05-26 10:40:20"), new Date("2013-05-26 10:40"))).toBe(true)
        done()
    })

    it('should return false if date time is not after comparison date', (done) => {
        expect(validator.isAfterDate(new Date("2013-05-26 10:52:20"), new Date("2013-05-26 10:52:21"))).toBe(false)
        done()
    })

    // it('should return an error if the values are not date objects', (done) => {
    //     expect(validator.isEqualToDate("26/05/2013 00:10:20", "26/05/2013 00:10:40")).toThrow("ensure the date and the comparison date are Date objects")
    //     done()
    // })
});