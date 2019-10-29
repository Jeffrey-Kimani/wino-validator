# Wino Validator

Wino validator is a template based validation framework for Javascript that allows you to validate named data and return
errors in a nice organized format.  

Wino validator is inspired by PHP's Framework laravel validation

## Table of contents

* [Introduction](#Introduction)
* [Examples](#Examples)
* <a href="#Multiple">Multiple Field Validation</a>
* <a href="#validation Rules">Validation Rules</a>
* [Licence](#licence)

## Introduction

To install run `npm install wino-validator`. Here is an example of how to use it

```js
const validator = require('wino-validator')

let validation_errors = validator.validate([
   ['ip_address-> required|ip:4', '123.257.123.25']
])

console.log(validation_errors)
```

The output should be  

```js
[ { field: 'ip', message: [ 'the \'ip\' field should be a version 4 ip address' ] } ]
```

because the ip address is not valid

## Examples

Validation is easy. There are two validation options

### Option One - Array

Here is an example of an object array validation type:

```js
let errors = validator.validate([
   ['email-> required|char_between: 50, 52|email', undefined]
])

console.log(errors)
```

Output:  
```js
[{ 
   field: 'email',
   message:[ 
      'the \'email\' field is required',
      'the \'email\' field should fall between 50 and 52 characters',
      'the \'email\' field is not a valid email' 
   ] 
}]
```

### Option Two - Object Array

Here is an example of an object array validation type:

```js
let errors = validator.validateObject([
    {
        field: 'email',
        data: 'company-a@gmail',
        rules: 'required|char_between: 50, 52|email'
    }
]);

console.log(errors)
```

Output:  

```js  
[{ field: 'email',
   message: [ 
      'the \'email\' field should fall between 50 and 52 characters',
      'the \'email\' field is not a valid email' 
   ] 
}]
```

<h2 id="Multiple">Multiple Field Validation</h2>

Validation can be for more than one field as in the example below

```js
let errors = validator.validate([
   ['email-> required|char_between: 50, 52|email', undefined],
   ['mobile_number-> required|min_char: 10|max_char: 10|numeric', '072398760']
])

console.log(errors)
```

Output:  

```js  
[
   { 
      field: 'email',
      message:[ 
         'the \'email\' field is required',
         'the \'email\' field should fall between 50 and 52 characters',
         'the \'email\' field is not a valid email' 
      ] 
   },
   { 
      field: 'mobile_number',
      message:[ 
         'the \'mobile_number\' field should be greater than or equal to 10 characters' 
      ]
   }
]
```

<h2 id="validation-rules">Validation Rules</h2>

wino-validate supports a number of validation rules, below is a list of all the rules supported

* [required](#required)
* [contains](#required)
* [equals](#required)
* [alpha](#required)
* [alpha_numeric](#required)
* [numeric](#required)
* [ascii](#required)
* [base_64](#required)
* [boolean](#required)
* [bytes](#required)
* [credit_card](#required)
* [uri](#uri)
* [decimal](#decimal)
* [decimal_digits](#decimal_digits)
* [bytes_between](#bytes_between)
* [email](#email)
* [divisible_by](#divisible_by)
* [fqdn](#fqdn)
* [float](#float)
* [float_between](#float_between)
* [full_width](#full_width)
* [half_width](#half_width)
* [hash](#hash)
* [hex_color](#hex_color)
* [hexadecimal](#hexadecimal)
* [ip](#ip)
* [isbn](#isbn)
* [isin](#isin)
* [issn](#issn)
* [iso_8601_date](#iso_8601_date)
* [rfc_3339](#rfc_3339)
* [iso_31661_alpha_2](#iso_31661_alpha_2)
* [iso_31661_alpha_3](#iso_31661_alpha_3)
* [isrc](#isrc)
* [json](#json)
* [lat_lng](#lat_lng)
* [lowercase](#lowercase)
* [mac_address](#mac_address)
* [md5](#md5)
* [mobile_phone](#mobile_phone)
* [mime_type](#mime_type)
* [mongo_id](#mongo_id)
* [multibyte](#multibyte)
* [port](#port)
* [poastal_code](#poastal_code)
* [surrogate_pair](#surrogate_pair)
* [url](#url)
* [uuid](#uuid)
* [uppercase](#uppercase)
* [variable_width](#variable_width)
* [matches](#matches)
* [min_char](#min_char)
* [max_char](#max_char)
* [char_between](#char_between)
* [digits](#digits)
* [in](#in)
* [not_in](#not_in)
* [date_equal](#date_equal)
* [date_before](#date_before)
* [date_after](#date_after)

#### required

Validates that a field is not empty. A field is considered "empty" if one of the following conditions are true:

* The value is undefined.
* The value is null.
* The value is an empty string.


## Licence
As of September 29, 2019 wino-validator is licensed under the [GPLv3+](http://www.gnu.org/licenses/gpl-3.0.html)