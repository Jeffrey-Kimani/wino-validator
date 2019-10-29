var validator = require('./index')


// var errors = validator.validateObject([
//     {
//         field: 'email',
//         data: 'geoffreykariithi@gmail',
//         rules: 'required|char_between: 50, 52|email'
//     },
//    //  {
//    //      field: 'mobile number',
//    //      data: '072398',
//    //      rules: 'required|digits: 7,10'
//    //  },
// ]);

var errors = validator.validate([
   ['email-> required|char_between: 50, 52|email', undefined],
   ['mobile_number-> required|min_char: 10|max_char: 10|numeric', '072398760']
])

// var errors = validator.validate([
//    ['ip->ip: 4', '2001:db8:0000:1:1:1:1:1'],
//    ['ip_address-> required|ip:4', '123.257.123.25']
// ])

console.log(errors)