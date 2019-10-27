const decoder = require('./validation-decoder')
// validate([
//     {
//         field: "email", 
//         data: "geoffrey.kimani@sbsafrica.com", 
//         rules: "required|email|char_between:3,150"
//     },
//     {
//         field: "name", 
//         data: "geoffrey.kimani", 
//         rules: "required|alpha_dash|char_between:3,150"
//     },
// ])
// validate([
//     ["email", "geoffrey.kimani@sbsafrica.com", "required|email|char_between:3,150"],
//     ["name", "Geoffrey Kimani", "required|alpha_dash|char_between:3,150"],
// ]);

module.exports = {
    /**
     * 
     * @param {Array} validationItems
     */
    _validate: function (validationItems) {
        return decoder.processFields(validationItems)
    },
    _validateArray: function (validationItems) {
        var itemValidation = []

        for (let i = 0; i < validationItems.length; i++) {
            const item = validationItems[i];
            
            var oneItem = {
                field: item[0],
                data: item[1],
                rules: item[2]
            }
            itemValidation.push(oneItem)
        }
        return decoder.processFields(itemValidation)
    },
    validate: function (res,validationItems) {
        var errors = decoder.processFields(validationItems)

        if (errors.length > 0) {
            try {
                res.status(422).send({
                    results: decoder.processFields(validationItems)
                })
                return false
            }catch(warnings){}
        }else{
            return true
        }
    },
    validateArray: async function (res,validationItems) {
        var itemValidation = []

        for (let i = 0; i < validationItems.length; i++) {
            const item = validationItems[i];
            
            var oneItem = {
                field: item[0],
                data: item[1],
                rules: item[2]
            }
            itemValidation.push(oneItem)
        }
        var errors = decoder.processFields(itemValidation)

        if (errors.length > 0){
            try {
                res.status(422).send({
                    results: decoder.processFields(itemValidation)
                })
                return false
            }catch(warnings){}
        }else{
            return true
        }
    }
}