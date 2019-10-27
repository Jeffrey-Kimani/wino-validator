var validator = require('./../../modules/validator/validator')

function test(items) {
    var state = true

    for (let i = 0; i < items.valid.length; i++) {
        const item = items.valid[i];

        var response = validator._validate([{
            field: items.field,
            data: item,
            rules: items.rule
        }])

        if (response.length > 0) {
            console.log(`Failed on: ${item} expected TRUE`)
            state = false
        }
    }

    for (let i = 0; i < items.valid.length; i++) {
        const item = items.invalid[i];

        var response = validator._validate([{
            field: items.field,
            data: item,
            rules: items.rule
        }])
        if (response.length == 0) {
            console.log(`Failed on: ${item} expected FALSE`)
            state = false
        }
    }

    return state;
}

function repeat(str, count) {
    let result = '';
    for (; count; count--) {
        result += str;
    }
    return result;
}

module.exports = {test,repeat}