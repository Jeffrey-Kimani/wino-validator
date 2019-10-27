const fs = require('fs');
let customMessages = JSON.parse(fs.readFileSync('./messages.json'))
const validator = require('./validate')
const npmValidator = require('validator');

let rules = {
   'required': (rule, field, data) => {
      if (validator.isEmpty(data)) {
         return parseMessage(customMessages.required, [field])
      }
   },
   'contains': (rule, field, data) => {
      var params = rule.params[0]

      if (!npmValidator.contains(data, [params])) {
         return parseMessage(customMessages.contains, [field, params])
      }
   },

   'equals': (rule, field, data) => {
      var params = rule.params[0]

      if (!npmValidator.equals(data, params)) {
         return parseMessage(customMessages.equals, [field])
      }
   },

   'alpha': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 5) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isAlpha(data, [params])) {
         return parseMessage(customMessages.alpha, [field, params])
      }
   },

   'alpha_numeric': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 5) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isAlphanumeric(data, params)) {
         return parseMessage(customMessages.alpha_numeric, [field, params])
      }
   },

   'ascii': (rule, field, data) => {
      var params = rule.params[0]

      if (!npmValidator.isAscii(data)) {
         return parseMessage(customMessages.ascii, [field])
      }
   },

   'base_64': (rule, field, data) => {
      var params = rule.params[0]

      if (!npmValidator.isBase64(data)) {
         return parseMessage(customMessages.base_64, [field])
      }
   },

   'boolean': (rule, field, data) => {
      var params = rule.params[0]

      if (!npmValidator.isBoolean(data)) {
         return parseMessage(customMessages.boolean, [field])
      }
   },

   'bytes': (rule, field, data) => {
      if (!npmValidator.isByteLength(data)) {
         return parseMessage(customMessages.bytes, [field])
      }
   },

   'credit_card': (rule, field, data) => {
      if (!npmValidator.isCreditCard(data)) {
         return parseMessage(customMessages.credit_card, [field])
      }
   },

   'isin': (rule, field, data) => {
      if (!npmValidator.isISIN(data)) {
         return parseMessage(customMessages.isin, [field])
      }
   },

   'uri': (rule, field, data) => {
      if (!npmValidator.isDataURI(data)) {
         return parseMessage(customMessages.uri, [field])
      }
   },

   'decimal': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 4) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isDecimal(data, [{ locale: params }])) {
         return parseMessage(customMessages.decimal, [field, params])
      }
   },

   'float': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 4) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isDecimal(data, params)) {
         return parseMessage(customMessages.float, [field, params])
      }
   },

   'decimal_digits': (rule, field, data) => {
      if (rule.params.length > 1) {
         var numbersLeft, decimalDigits;
         rule.params[0] = rule.params[0].replace(/\s/g, '')
         rule.params[1] = rule.params[1].replace(/\s/g, '')

         if (validator.numeric(rule.params[0] + '' + rule.params[1])) {
            numbersLeft = rule.params[0]
            decimalDigits = rule.params[1]

            if (!npmValidator.isDecimal(data, { decimal_digits: `${numbersLeft},${decimalDigits}` })) {
               return parseMessage(customMessages.bytes_between, [field, numbersLeft, decimalDigits])
            }
         } else {
            throw new InvalidParameter(rule.rule, `${rule.params[0]} and ${rule.params[1]}`)
         }
      } else {
         throw new MissingParameter(rule.rule)
      }
   },

   'divisible_by': (rule, field, data) => {
      if (rule.params.length > 0) {
         var divisibleBy;
         rule.params[0] = rule.params[0].replace(/\s/g, '')

         if (validator.numeric(rule.params[0])) {
            divisibleBy = rule.params[0]

            if (!npmValidator.isDivisibleBy(data, divisibleBy)) {
               return parseMessage(customMessages.divisible_by, [field, divisibleBy])
            }
         } else {
            throw new InvalidParameter(rule.rule, rules.params[0])
         }
      } else {
         throw new MissingParameter(rule.rule)
      }
   },

   'bytes_between': (rule, field, data) => {
      if (rule.params.length > 0) {
         var min, max;
         rule.params[0] = rule.params[0].replace(/\s/g, '')
         rule.params[1] = rule.params[1].replace(/\s/g, '')

         if (validator.numeric(rule.params[0] + '' + rule.params[1])) {
            min = rule.params[0]
            max = rule.params[1]

            if (!npmValidator.isByteLength(data, { min: min, max: max })) {
               return parseMessage(customMessages.bytes_between, [field, min, max])
            }
         } else {
            throw new InvalidParameter(rule.rule, rules.params[0] + rules.params[1])
         }
      } else {
         throw new MissingParameter(rule.rule)
      }
   },

   'float_between': (rule, field, data) => {
      if (rule.params.length > 0) {
         var min, max;
         rule.params[0] = rule.params[0].replace(/\s/g, '')
         rule.params[1] = rule.params[1].replace(/\s/g, '')

         min = rule.params[0]
         max = rule.params[1]

         if (!npmValidator.isFloat(data, { min: min, max: max })) {
            return parseMessage(customMessages.bytes_between, [field, min, max])
         }
      } else {
         throw new MissingParameter(rule.rule)
      }
   },

   'email': (rule, field, data) => {
      if (!npmValidator.isEmail(data)) {
         return parseMessage(customMessages.email, [field])
      }
   },

   'fqdn': (rule, field, data) => {
      if (!npmValidator.isFQDN(data)) {
         return parseMessage(customMessages.fqdn, [field])
      }
   },

   'full_width': (rule, field, data) => {
      if (!npmValidator.isFullWidth(data)) {
         return parseMessage(customMessages.full_width, [field])
      }
   },

   'half_width': (rule, field, data) => {
      if (!npmValidator.isHalfWidth(data)) {
         return parseMessage(customMessages.half_width, [field])
      }
   },

   'hex_color': (rule, field, data) => {
      if (!npmValidator.isHexColor(data)) {
         return parseMessage(customMessages.hex_color, [field])
      }
   },

   'hexadecimal': (rule, field, data) => {
      if (!npmValidator.isHexadecimal(data)) {
         return parseMessage(customMessages.hexadecimal, [field])
      }
   },

   'hash': (rule, field, data) => {
      if (rule.params.length > 0) {
         var algorithim = [];
         var isValid = true
         var invalid = ''

         rule.params.forEach(r => {
            r = r.replace(/\s/g, '')
            algorithim.push(r)

            if (!validator.in(r, ['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160',
               'tiger128', 'tiger160', 'tiger192', 'crc32', 'crc32b'])) {
               invalid += r
               isValid = false;
            }
         });

         if (isValid) {
            if (!npmValidator.isHash(data, algorithim)) {
               return parseMessage(customMessages.hash, [field, invalid])
            }
         } else {
            throw new InvalidParameter(rule.rule, invalid)
         }
      } else {
         throw new MissingParameter(rule.rule)
      }
   },

   'ip': (rule, field, data) => {
      if (rule.params.length > 0) {
         var version = 4;
         rule.params[0] = rule.params[0].replace(/\s/g, '')

         if (validator.in(rule.params[0], ['4', '6'])) {
            version = rule.params[0]
         } else {
            throw new InvalidParameter(rule.rule, rules.params[0])
         }
      }
      if (!npmValidator.isIP(data, version)) {
         return parseMessage(customMessages.ip, [field, version])
      }
   },

   // 'ipRange': (rule,field,data) => {
   //     if (!npmValidator.isIPRange(data)) {
   //         return parseMessage(customMessages.ipRange, [field])
   //     }
   // },

   'isbn': (rule, field, data) => {
      if (rule.params.length > 0) {
         var version = [];
         var isValid = true
         var invalid = ''

         rule.params.forEach(r => {
            r = r.replace(/\s/g, '')
            version.push(r)

            if (!validator.in(r, ['10', '13'])) {
               invalid += r
               isValid = false;
            }
         });

         if (isValid) {
            if (!npmValidator.isISBN(data, version)) {
               return parseMessage(customMessages.uuid, invalid)
            }
         } else {
            throw new InvalidParameter(rule.rule, invalid)
         }
      } else {
         throw new MissingParameter(rule.rule)
      }
   },

   'issn': (rule, field, data) => {
      if (!npmValidator.isISSN(data)) {
         return parseMessage(customMessages.issn, [field])
      }
   },

   'iso_8601_date': (rule, field, data) => {
      if (!npmValidator.isISO8601(data)) {
         return parseMessage(customMessages.iso_8601_date, [field])
      }
   },

   'rfc_3339': (rule, field, data) => {
      if (!npmValidator.isRFC3339(data)) {
         return parseMessage(customMessages.rfc_3339, [field])
      }
   },

   'iso_31661_alpha_2': (rule, field, data) => {
      if (!npmValidator.isISO31661Alpha2(data)) {
         return parseMessage(customMessages.iso_31661_alpha_2, [field])
      }
   },

   'iso_31661_alpha_3': (rule, field, data) => {
      if (!npmValidator.isISO31661Alpha3(data)) {
         return parseMessage(customMessages.iso_31661_alpha_3, [field])
      }
   },

   'isrc': (rule, field, data) => {
      if (!npmValidator.isISRC(data)) {
         return parseMessage(customMessages.isrc, [field])
      }
   },

   'json': (rule, field, data) => {
      if (!npmValidator.isJSON(data)) {
         return parseMessage(customMessages.json, [field])
      }
   },

   'lat_lng': (rule, field, data) => {
      if (!npmValidator.isLatLong(data)) {
         return parseMessage(customMessages.lat_lng, [field])
      }
   },

   'lowercase': (rule, field, data) => {
      if (!npmValidator.isLowercase(data)) {
         return parseMessage(customMessages.lowercase, [field])
      }
   },

   'mac_address': (rule, field, data) => {
      if (!npmValidator.isMACAddress(data)) {
         return parseMessage(customMessages.mac_address, [field])
      }
   },

   'md5': (rule, field, data) => {
      if (!npmValidator.isMD5(data)) {
         return parseMessage(customMessages.md5, [field])
      }
   },

   'mime_type': (rule, field, data) => {
      if (!npmValidator.isMimeType(data)) {
         return parseMessage(customMessages.mime_type, [field])
      }
   },

   'mongo_id': (rule, field, data) => {
      if (!npmValidator.isMongoId(data)) {
         return parseMessage(customMessages.mongo_id, [field])
      }
   },

   'multibyte': (rule, field, data) => {
      if (!npmValidator.isMultibyte(data)) {
         return parseMessage(customMessages.multibyte, [field])
      }
   },

   'port': (rule, field, data) => {
      if (!npmValidator.isPort(data)) {
         return parseMessage(customMessages.port, [field])
      }
   },

   'surrogate_pair': (rule, field, data) => {
      if (!npmValidator.isSurrogatePair(data)) {
         return parseMessage(customMessages.surrogate_pair, [field])
      }
   },

   'url': (rule, field, data) => {
      if (!npmValidator.isURL(data, { allow_underscores: true })) {
         return parseMessage(customMessages.url, [field])
      }
   },

   'uppercase': (rule, field, data) => {
      if (!npmValidator.isUppercase(data)) {
         return parseMessage(customMessages.uppercase, [field])
      }
   },

   'uppercase': (rule, field, data) => {
      if (!npmValidator.isUppercase(data)) {
         return parseMessage(customMessages.uppercase, [field])
      }
   },

   'variable_width': (rule, field, data) => {
      if (!npmValidator.isVariableWidth(data)) {
         return parseMessage(customMessages.variable_width, [field])
      }
   },

   'uuid': (rule, field, data) => {
      if (rule.params.length > 0) {
         var version = [];
         var isValid = true
         var invalid = ''

         rule.params.forEach(r => {
            r = r.replace(/\s/g, '')
            version.push(r)

            if (!validator.in(r, ['3', '4', '5'])) {
               invalid += r
               isValid = false;
            }
         });

         if (isValid) {
            if (!npmValidator.isUUID(data, version)) {
               return parseMessage(customMessages.uuid, invalid)
            }
         } else {
            throw new InvalidParameter(rule.rule, invalid)
         }
      } else {
         throw new MissingParameter(rule.rule)
      }
   },

   'matches': (rule, field, data) => {
      if (rule.params.length > 0) {
         var match = rule.params[0]

         if (!npmValidator.matches(data, [match])) {
            return parseMessage(customMessages.matches, [field, match])
         }
      } else {
         throw new MissingParameter(rule.rule)
      }
   },

   'mobile_phone': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 5) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isMobilePhone(data, params)) {
         return parseMessage(customMessages.mobile_phone, [field, params])
      }
   },

   'poastal_code': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 5) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isPostalCode(data, params)) {
         return parseMessage(customMessages.poastal_code, [field, params])
      }
   },

   'max_char': (rule, field, data) => {
      if (rule.params.length > 0) {
         var param = rule.params[0].replace(/\s/g, '');

         if (!validator.maxChar(data, param)) {
            return parseMessage(customMessages.max_char, [field, param])
         }
      } else {
         throw new MissingParameter(rule)
      }
   },

   'min_char': (rule, field, data) => {
      if (rule.params.length > 0) {
         var param = rule.params[0].replace(/\s/g, '');

         if (!validator.minChar(data, param)) {
            return parseMessage(customMessages.min_char, [field, param])
         }
      } else {
         throw new MissingParameter(rule)
      }
   },

   'char_between': (rule, field, data) => {
      if (rule.params.length > 1) {
         var param1 = rule.params[0].replace(/\s/g, '');
         var param2 = rule.params[1].replace(/\s/g, '');

         if (!validator.charBetween(data, param1, param2)) {
            return parseMessage(customMessages.char_between, [field, param1, param2])
         }
      } else {
         throw new MissingParameter(rule)
      }
   },

   'digits': (rule, field, data) => {
      if (rule.params.length > 1) {
         var param1 = rule.params[0].replace(/\s/g, '');
         var param2 = rule.params[1].replace(/\s/g, '');

         if (!validator.numeric(data)) {
            return parseMessage(customMessages.numeric, [field])
         } else {
            if (!validator.digitsBetween(data, param1, param2)) {
               return parseMessage(customMessages.digits, [field, param1, param2])
            }
         }
      } else {
         throw new MissingParameter(rule)
      }
   },

   'in': (rule, field, data) => {
      if (!validator.in(data, rule.params)) {
         return parseMessage(customMessages.in, [field])
      }
   },

   'not_in': (rule, field, data) => {
      if (!validator.notIn(data, rule.params)) {
         return parseMessage(customMessages.not_in, [field])
      }
   },


   'date_equal': (rule, field, data) => {
      if (rule.params.length > 0) {
         if (!validator.isEqualToDate(data, rule.params[0])) {
            return parseMessage(customMessages.date_equal, [field])
         }
      } else {
         throw new MissingParameter(rule)
      }
   },

   'date_before': (rule, field, data) => {
      if (rule.params.length > 0) {
         if (!validator.isBeforeDate(data, rule.params[0])) {
            return parseMessage(customMessages.date_before, [field])
         }
      } else {
         throw new MissingParameter(rule)
      }
   },

   'date_after': (rule, field, data) => {
      if (rule.params.length > 0) {
         if (!validator.isAfterDate(data, rule.params[0])) {
            return parseMessage(customMessages.date_after, [field])
         }
      } else {
         throw new MissingParameter(rule)
      }
   },
}

/**
 * Takes a message and replaces the necessary items in the array to the message 
 * @param {String} message 
 * @param {Array} replace 
 */
function parseMessage(message, replace) {
   return message.replace(/({\d})/g, function (j) {
      return replace[j.replace(/{/, '').replace(/}/, '')];
   });
}

module.exports = {
   rules,
   parseMessage
}