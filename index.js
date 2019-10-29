const decoder = require('./validation-decoder')


module.exports = {
    /**
     * 
     * @param {Array} validationItems
     */
    validateObject: function (validationItems) {
        return decoder.processFields(validationItems)
    },

    validate: function (validationItems) {
        var itemValidation = []

        for (let i = 0; i < validationItems.length; i++) {
            const item = validationItems[i];
            let splitRule = item[0].split('->')
            // Remove whitespaces
            splitRule[0] = splitRule[0].replace(' ', '')
            splitRule[1] = splitRule[1].replace(' ', '')

            
            var oneItem = {
                field: splitRule[0] ,
                data: item[1],
                rules: splitRule[1]
            }
            itemValidation.push(oneItem)
        }

        return decoder.processFields(itemValidation)
    }
}