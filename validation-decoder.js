const rules = require('./rules').rules
let items = [], messages = []

function processFields(items) {
    messages = []

    //process all the fields
    for (let i = 0; i < items.length; i++) {
        var item = items[i];

        var rules = getRules(item.rules)
        var fieldMessages = []
        //process all the rules one at a time
        for (let j = 0; j < rules.length; j++) {
            const rule = rules[j];
            var message = decodeAndExecuteRule(rule, item.field, item.data + '')

            if (message != null) {
                fieldMessages.push(message)
            }

            //If all the rules have been processed push the validation message to the messages array
            if (j == rules.length - 1 && fieldMessages.length > 0) {
                messages.push({
                    field: item.field,
                    message: fieldMessages
                })
            }
        }
    }

    return messages;
}

function getRules(validationRules) {
    var rules = []

    // split rules
    var _rules = validationRules.split('|')

    for (let i = 0; i < _rules.length; i++) {
        var rule = _rules[i];
        var params = []
        
        //check if rule has parameters
        if (rule.includes(':')) {
            var data = rule.split(':')
            rule = data[0]
            params = data[1].split(',')
        }

        //Clean up the rules and store them with the respective parameters
        rules.push({
            rule: rule.toLowerCase(),
            params: params
        });
    }

    return rules;
}

function decodeAndExecuteRule(rule,field,data) {
    let selectedRule = rules[rule.rule]
    if(selectedRule){
        return selectedRule(rule,field,data)
    }else{
        throw new RuleDoesNotExist(rule.rule)
    }

    return null
}

function RuleDoesNotExist(value) {
    this.toString = function () {
        return `the ${value} rule does not exist`
    };
}

function MissingParameter(rule) {
    this.toString = function () {
        return `the rule: ${rule} has missing parameters`
    };
}

function InvalidParameter(rule, parameter) {
    this.toString = function () {
        return `the ${parameter} parameter(s) provided for rule ${rule} is invalid`
    };
}

module.exports = {
    processFields
}