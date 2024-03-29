const validator = require('./validate')
const npmValidator = require('validator');
let customMessages = {
   required: "the '{0}' field is required",
   contains: "the '{0}' field should contain {1} characters",
   equals: "the '{0}' field should equal {1}",
   alpha: "the '{0}' field should only contain alphabetic characters of the locale {1}",
   alpha_numeric: "the '{0}' field can only contain characters and integers",
   numeric: "the '{0}' field can only contain numeric characters",
   ascii: "the '{0}' field should contain only ascii characters",
   base_64: "the '{0}' field should be base 64",
   boolean: "the '{0}' field should be boolean",
   bytes: "the '{0}' field should be a byte",
   credit_card: "the '{0}' field should be a valid credit card",
   uri: "the '{0}' field should be a valid URI",
   decimal: "the '{0}' field should be a decimal number",
   decimal_digits: "the '{0}' field should be a decimal number with {1} decimal point(s)",
   bytes_between: "the '{0}' field should be a byte of length between {1} and {2}",
   email: "the '{0}' field is not a valid email",
   divisible_by: "the '{0}' field should be divisible by {1}",
   fqdn: "the '{0}' field should be a valid fqdn",
   float: "the '{0}' field should be a float number",
   float_between: "the '{0}' field should be a float number between {1} and {2}",
   full_width: "the '{0}' field should only contain full width characters",
   half_width: "the '{0}' field should only contain half width characters",
   hash: "the '{0}' field should be a hash of algorithm {1}",
   hex_color: "the '{0}' field should be a valid hexadecimal color",
   hexadecimal: "the '{0}' field should be a valid hexadecimal number",
   ip: "the '{0}' field should be a version {1} ip address",
   ipRange: "the '{0}' field should be a valid ipv4 address range",
   isbn: "the '{0}' field should be an ISBN {1} number",
   isin: "the '{0}' field should be an ISIN number",
   issn: "the '{0}' field should be an ISSN string",
   iso_8601_date: "the '{0}' field should be an ISO8601 date",
   rfc_3339: "the '{0}' field should be an ISO8601 date",
   iso_31661_alpha_2: "the '{0}' field should be a valid ISO31661 alpha 2 country code",
   iso_31661_alpha_3: "the '{0}' field should be a valid ISO31661 alpha 3 country code",
   isrc: "the '{0}' field should be an ISRC string",
   json: "the '{0}' field should be in JSON format",
   lat_lng: "the '{0}' field should be a valid latitude-longitude coordinate",
   lowercase: "the '{0}' field should only contain lowercase characters",
   mac_address: "the '{0}' field should be a mac address",
   md5: "the '{0}' field should be an MD5 mac address",
   mobile_phone: "the '{0}' field should be a mobile phone of the locale {1}",
   mime_type: "the '{0}' field should match a valid MIME type format",
   mongo_id: "the '{0}' field should be a mongo id",
   multibyte: "the '{0}' field should contain one or more multibyte characters",
   port: "the '{0}' field should be a valid port number",
   poastal_code: "the '{0}' field should be a valid poastal code of the locale {1}",
   surrogate_pair: "the '{0}' field should contain surrogate pairs characters",
   url: "the '{0}' field should be a valid url",
   uuid: "the '{0}' field should be a UUID version {1}",
   uppercase: "the '{0}' field should only contain uppercase characters",
   variable_width: "the '{0}' field should only contain a mixture of full and half-width chars",
   matches: "the '{0}' field is invalid, pattern not met",
   min_char: "the '{0}' field should be greater than or equal to {1} characters",
   max_char: "the '{0}' field should be less than or equal to {1} characters",
   char_between: "the '{0}' field should fall between {1} and {2} characters",
   digits: "the '{0}' field should contain {1} to {2} digits",
   in: "the '{0}' field is not valid",
   not_in: "the '{0}' field is not valid",
   date_equal: "the '{0}' field should be equal to this date {1}",
   date_before: "the '{0}' field should be before this date {1}",
   date_after: "the '{0}' field should be after this date {1}",
}

let rules = {
   'required': (rule, field, data) => {
      if (data === 'undefined' || data === 'null' || validator.isEmpty(data)) {
         return parseMessage(customMessages.required, [field],'required')
      }
   },
   'contains': (rule, field, data) => {
      var params = rule.params[0]
      
      if (!npmValidator.contains(data, [params])) {
         return parseMessage(customMessages.contains, [field, params],'contains')
      }
   },

   'equals': (rule, field, data) => {
      var params = rule.params[0]

      if (!npmValidator.equals(data, params)) {
         return parseMessage(customMessages.equals, [field],'equals')
      }
   },

   'alpha': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 5) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isAlpha(data, [params])) {
         return parseMessage(customMessages.alpha, [field, params],'alpha')
      }
   },

   'alpha_numeric': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 5) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isAlphanumeric(data, params)) {
         return parseMessage(customMessages.alpha_numeric, [field, params],'alpha_numeric')
      }
   },

   'ascii': (rule, field, data) => {
      var params = rule.params[0]

      if (!npmValidator.isAscii(data)) {
         return parseMessage(customMessages.ascii, [field],'ascii')
      }
   },

   'base_64': (rule, field, data) => {
      var params = rule.params[0]

      if (!npmValidator.isBase64(data)) {
         return parseMessage(customMessages.base_64, [field],'base_64')
      }
   },

   'boolean': (rule, field, data) => {
      var params = rule.params[0]

      if (!npmValidator.isBoolean(data)) {
         return parseMessage(customMessages.boolean, [field],'boolean')
      }
   },

   'bytes': (rule, field, data) => {
      if (!npmValidator.isByteLength(data)) {
         return parseMessage(customMessages.bytes, [field],'bytes')
      }
   },

   'credit_card': (rule, field, data) => {
      if (!npmValidator.isCreditCard(data)) {
         return parseMessage(customMessages.credit_card, [field],'credit_card')
      }
   },

   'isin': (rule, field, data) => {
      if (!npmValidator.isISIN(data)) {
         return parseMessage(customMessages.isin, [field],'isin')
      }
   },

   'uri': (rule, field, data) => {
      if (!npmValidator.isDataURI(data)) {
         return parseMessage(customMessages.uri, [field],'uri')
      }
   },

   'decimal': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 4) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isDecimal(data, [{ locale: params }])) {
         return parseMessage(customMessages.decimal, [field, params],'decimal')
      }
   },

   'float': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 4) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isDecimal(data, params)) {
         return parseMessage(customMessages.float, [field, params],'float')
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
               return parseMessage(customMessages.bytes_between, [field, numbersLeft, decimalDigits],'decimal_digits')
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
               return parseMessage(customMessages.divisible_by, [field, divisibleBy],'divisible_by')
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
               return parseMessage(customMessages.bytes_between, [field, min, max],'bytes_between')
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
            return parseMessage(customMessages.bytes_between, [field, min, max],'float_between')
         }
      } else {
         throw new MissingParameter(rule.rule)
      }
   },

   'email': (rule, field, data) => {
      if (!npmValidator.isEmail(data)) {
         return parseMessage(customMessages.email, [field],'email')
      }
   },

   'fqdn': (rule, field, data) => {
      if (!npmValidator.isFQDN(data)) {
         return parseMessage(customMessages.fqdn, [field],'fqdn')
      }
   },

   'full_width': (rule, field, data) => {
      if (!npmValidator.isFullWidth(data)) {
         return parseMessage(customMessages.full_width, [field],'full_width')
      }
   },

   'half_width': (rule, field, data) => {
      if (!npmValidator.isHalfWidth(data)) {
         return parseMessage(customMessages.half_width, [field],'half_width')
      }
   },

   'hex_color': (rule, field, data) => {
      if (!npmValidator.isHexColor(data)) {
         return parseMessage(customMessages.hex_color, [field],'hex_color')
      }
   },

   'hexadecimal': (rule, field, data) => {
      if (!npmValidator.isHexadecimal(data)) {
         return parseMessage(customMessages.hexadecimal, [field],'hexadecimal')
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
               return parseMessage(customMessages.hash, [field, invalid],'hash')
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
         return parseMessage(customMessages.ip, [field, version],'ip')
      }
   },

   // 'ipRange': (rule,field,data) => {
   //     if (!npmValidator.isIPRange(data)) {
   //         return parseMessage(customMessages.ipRange, [field],'required')
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
               return parseMessage(customMessages.uuid, invalid,'isbn')
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
         return parseMessage(customMessages.issn, [field],'issn')
      }
   },

   'iso_8601_date': (rule, field, data) => {
      if (!npmValidator.isISO8601(data)) {
         return parseMessage(customMessages.iso_8601_date, [field],'iso_8601_date')
      }
   },

   'rfc_3339': (rule, field, data) => {
      if (!npmValidator.isRFC3339(data)) {
         return parseMessage(customMessages.rfc_3339, [field],'rfc_3339')
      }
   },

   'iso_31661_alpha_2': (rule, field, data) => {
      if (!npmValidator.isISO31661Alpha2(data)) {
         return parseMessage(customMessages.iso_31661_alpha_2, [field],'iso_31661_alpha_2')
      }
   },

   'iso_31661_alpha_3': (rule, field, data) => {
      if (!npmValidator.isISO31661Alpha3(data)) {
         return parseMessage(customMessages.iso_31661_alpha_3, [field],'iso_31661_alpha_3')
      }
   },

   'isrc': (rule, field, data) => {
      if (!npmValidator.isISRC(data)) {
         return parseMessage(customMessages.isrc, [field],'isrc')
      }
   },

   'json': (rule, field, data) => {
      if (!npmValidator.isJSON(data)) {
         return parseMessage(customMessages.json, [field],'json')
      }
   },

   'lat_lng': (rule, field, data) => {
      if (!npmValidator.isLatLong(data)) {
         return parseMessage(customMessages.lat_lng, [field],'lat_lng')
      }
   },

   'lowercase': (rule, field, data) => {
      if (!npmValidator.isLowercase(data)) {
         return parseMessage(customMessages.lowercase, [field],'lowercase')
      }
   },

   'mac_address': (rule, field, data) => {
      if (!npmValidator.isMACAddress(data)) {
         return parseMessage(customMessages.mac_address, [field],'mac_address')
      }
   },

   'md5': (rule, field, data) => {
      if (!npmValidator.isMD5(data)) {
         return parseMessage(customMessages.md5, [field],'md5')
      }
   },

   'mime_type': (rule, field, data) => {
      if (!npmValidator.isMimeType(data)) {
         return parseMessage(customMessages.mime_type, [field],'mime_type')
      }
   },

   'mongo_id': (rule, field, data) => {
      if (!npmValidator.isMongoId(data)) {
         return parseMessage(customMessages.mongo_id, [field],'mongo_id')
      }
   },

   'multibyte': (rule, field, data) => {
      if (!npmValidator.isMultibyte(data)) {
         return parseMessage(customMessages.multibyte, [field],'multibyte')
      }
   },

   'port': (rule, field, data) => {
      if (!npmValidator.isPort(data)) {
         return parseMessage(customMessages.port, [field],'port')
      }
   },

   'surrogate_pair': (rule, field, data) => {
      if (!npmValidator.isSurrogatePair(data)) {
         return parseMessage(customMessages.surrogate_pair, [field],'surrogate_pair')
      }
   },

   'url': (rule, field, data) => {
      if (!npmValidator.isURL(data, { allow_underscores: true })) {
         return parseMessage(customMessages.url, [field],'url')
      }
   },

   'uppercase': (rule, field, data) => {
      if (!npmValidator.isUppercase(data)) {
         return parseMessage(customMessages.uppercase, [field],'uppercase')
      }
   },

   'variable_width': (rule, field, data) => {
      if (!npmValidator.isVariableWidth(data)) {
         return parseMessage(customMessages.variable_width, [field],'variable_width')
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
               return parseMessage(customMessages.uuid, invalid,'uuid')
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
            return parseMessage(customMessages.matches, [field, match],'matches')
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
         return parseMessage(customMessages.mobile_phone, [field, params],'mobile_phone')
      }
   },

   'poastal_code': (rule, field, data) => {
      var params = 'en-US'
      if (rule.params.length > 0 && rule.params[0].length > 5) {
         var params = rule.params[0].replace(/\s/g, '')
      }

      if (!npmValidator.isPostalCode(data, params)) {
         return parseMessage(customMessages.poastal_code, [field, params],'poastal_code')
      }
   },

   'max_char': (rule, field, data) => {
      if (rule.params.length > 0) {
         var param = rule.params[0].replace(/\s/g, '');

         if (!validator.maxChar(data, param + 1)) {
            return parseMessage(customMessages.max_char, [field, param],'max_char')
         }
      } else {
         throw new MissingParameter(rule)
      }
   },

   'min_char': (rule, field, data) => {
      if (rule.params.length > 0) {
         var param = rule.params[0].replace(/\s/g, '');

         if (!validator.minChar(data, param-1)) {
            return parseMessage(customMessages.min_char, [field, param],'min_char')
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
            return parseMessage(customMessages.char_between, [field, param1, param2],'char_between')
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
            return parseMessage(customMessages.numeric, [field],'numeric')
         } else {
            if (!validator.digitsBetween(data, param1, param2+1)) {
               return parseMessage(customMessages.digits, [field, param1, param2],'digits')
            }
         }
      } else {
         throw new MissingParameter(rule)
      }
   },

   'numeric': (rule,field,data) => {
      if (!validator.numeric(data)) {
         return parseMessage(customMessages.numeric, [field],'numeric')
      }
   },

   'in': (rule, field, data) => {
      if (!validator.in(data, rule.params)) {
         return parseMessage(customMessages.in, [field],'in')
      }
   },

   'not_in': (rule, field, data) => {
      if (!validator.notIn(data, rule.params)) {
         return parseMessage(customMessages.not_in, [field],'not_in')
      }
   },


   'date_equal': (rule, field, data) => {
      if (rule.params.length > 0) {
         if (!validator.isEqualToDate(data, rule.params[0])) {
            return parseMessage(customMessages.date_equal, [field],'date_equal')
         }
      } else {
         throw new MissingParameter(rule)
      }
   },

   'date_before': (rule, field, data) => {
      if (rule.params.length > 0) {
         if (!validator.isBeforeDate(data, rule.params[0])) {
            return parseMessage(customMessages.date_before, [field],'date_before')
         }
      } else {
         throw new MissingParameter(rule)
      }
   },

   'date_after': (rule, field, data) => {
      if (rule.params.length > 0) {
         if (!validator.isAfterDate(data, rule.params[0])) {
            return parseMessage(customMessages.date_after, [field],'date_after')
         }
      } else {
         throw new MissingParameter(rule)
      }
   },
}

// Error Messages
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

function MissingMessage(message_field) {
   this.toString = function () {
      return `Could not find the message field'${message_field}' in the defined messages`
   };
}

/**
 * Takes a message and replaces the necessary items in the array to the message 
 * @param {String} message 
 * @param {Array} replace 
 */
function parseMessage(message, replace,message_field) {
   if(message){
      return message.replace(/({\d})/g, function (j) {
         return replace[j.replace(/{/, '').replace(/}/, '')];
      });
   }else{
      throw new MissingMessage(message_field)
   }
}

module.exports = {
   rules,
   parseMessage
}