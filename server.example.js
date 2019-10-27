const express = require('express')

var app = express();
var validator = require('.')

app.get('/', function (req, res, next) {

    if(validator.validateArray(res,[
        ['ip', '192.23.121.256', 'char_between: 5,20|ip: 4'],
        ['email', 'geoffreykariithi@gmail.com', 'required|char_between: 2,5|email'],
    ]) == true){
        res.send({
            result: 'correct format'
        })
    }

});

//Set up port
app.listen(3030, () => {
    console.log('Started App!')
});
