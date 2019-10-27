module.exports = {
    alpha: function (data) {
        var alpha = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];

        return checkValidityArray(data,alpha)
    },
    alphaSpaced: function (data) {
        var alphaSpaced = [
            ' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];

        return checkValidityArray(data,alphaSpaced)
    },
    alphaNumeric: function (data) {
        var alphaNumeric = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];

        return checkValidityArray(data,alphaNumeric)
    },
    alphaDash: function (data) {
        var alphaDash = [
            '-', '_', ' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];

        return checkValidityArray(data,alphaDash)
    },
    alphaEmail: function (data) {
        var alphaEmail = [
            '-', '_', '.', '@', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];

        return checkValidityArray(data,alphaEmail)
    },
    numeric: function (data) {
        var numeric = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
        ];

        return checkValidityArray(data,numeric)
    },
    numericFormatted: function (data) {
        var numericFormatted = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '(', ')', ' ', '+'
        ];

        return checkValidityArray(data,numericFormatted)
    },
    isEmpty: function (data) {
        var empty = [
            ' '
        ];

        return checkValidityArray(data,empty)
    },
    maxChar: function (data,maxCharacters){
        if (data.length >= maxCharacters) {
            return false
        } else {
            return true
        }
    },
    minChar: function (data,minChracters){
        if (data.length <= minChracters) {
            return false
        } else {
            return true
        }
    },
    charBetween: function (data,minChracters,maxCharacters){
        if (data.length >= minChracters && data.length <= maxCharacters) {
            return true
        } else {
            return false
        }
    },
    digitsBetween: function (data,nbMin,nbMax){
        if (this.numeric(data)) {
            if (data.length >= nbMin && data.length <= nbMax) {
                return true
            } else {
                return false
            }
        }
        return false
    },
    in: function (data,items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            
            if(data === item){
                return true
            }
        }
        return false
    },
    notIn: function (data,items) {
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            
            if(data === item){
                return false
            }
        }
        return true
    },
    email: function (data) {
        return /\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i.test(data)
    },
    isEqualToDate: function (date,comparisonDate) {
        if (date instanceof Date && comparisonDate instanceof Date){
            if ((Math.round(date.getTime() / 1000) - Math.round(comparisonDate.getTime() / 1000)) == 0){
                return true
            }
            return false
        }else{
            throw "ensure the date and the comparison date are Date objects"
        }
    },
    isBeforeDate: function (date,comparisonDate) {
        if (date instanceof Date && comparisonDate instanceof Date) {
            if ((Math.round(date.getTime() / 1000) - Math.round(comparisonDate.getTime() / 1000)) < 0) {
                return true
            }
            return false
        } else {
            throw "ensure the date and the comparison date are Date objects"
        }
    },
    isAfterDate: function (date,comparisonDate) {
        if (date instanceof Date && comparisonDate instanceof Date) {
            if ((Math.round(date.getTime() / 1000) - Math.round(comparisonDate.getTime() / 1000)) > 0) {
                return true
            }
            return false
        } else {
            throw "ensure the date and the comparison date are Date objects"
        }
    }
}

/**
 * Checks the vality of an array aganist an array of elements
 * @param {String} data - The data to check
 * @param {Array} elementsCheck - The elements to check aganist
 */
function checkValidityArray(data, elementsCheck) {
    data = data.toLowerCase().split('');

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < elementsCheck.length; j++) {
            if (data[i] == elementsCheck[j]) {
                break;
            }
            if (j == elementsCheck.length - 1) {
                return false
            }

        }
        if (i == data.length - 1) {
            return true
        }
    }
}