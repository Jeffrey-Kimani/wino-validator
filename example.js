var validator = require('./index')


// var errors = JSON.stringify(validator.validate([
//     {
//         field: 'email',
//         data: 'geoffreykariithi@gmail',
//         rules: 'required|char_between: 50, 52|email'
//     },
//     {
//         field: 'mobile number',
//         data: '072398',
//         rules: 'required|digits: 7,10'
//     },
// ]),null,2);

var errors = JSON.stringify(validator.validateArray([
    ['email', 'geoffreykariithi@gmail', 'required|char_between: 50, 52|email'],
    ['mobile number', '072398', 'required|digits: 7,10']
]), null, 2);

// var errors = JSON.stringify(validator.validateArray([
//     ['ip', '2001:db8:0000:1:1:1:1:1', 'ip: 4'],
//     // ['ip', '123.900.123.25', 'required|ip:4']
// ]), null, 2);

console.log(errors)
// validator.validate([{
//     field: 'email',
//     data: '      ',
//     rules: 'required'
// }]).forEach(message => {
//     console.log(message.message[0])
// });