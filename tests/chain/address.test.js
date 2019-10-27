const expect = require('expect')
var packageTest = require('./test')
var test = packageTest.test
var repeat = packageTest.repeat

describe('Test the mac address rule', () => {
    it('should validate all the mac address scenarios', (done) => {
        var state = test({
            field: 'mac address',
            rule: 'mac_address',
            valid: [
                'ab:ab:ab:ab:ab:ab',
                'FF:FF:FF:FF:FF:FF',
                '01:02:03:04:05:ab',
                '01:AB:03:04:05:06',
            ],
            invalid: [
                'abc',
                '01:02:03:04:05',
                '01:02:03:04::ab',
                '1:2:3:4:5:6',
                'AB:CD:EF:GH:01:02',
            ]
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the port rule', () => {
    it('should validate all the port scenarios', (done) => {
        var state = test({
            field: 'port',
            rule: 'port',
            valid: [
                '0',
                '22',
                '80',
                '443',
                '3000',
                '8080',
                '65535',
            ],
            invalid: [
                '',
                '-1',
                '65536',
            ]
        })
        expect(state).toBe(true)
        done()
    })
});


// describe('Test the ipRange rule', () => {
//     it('should validate all the ipv4 address range scenarios', (done) => {
//         var state = test({
//             field: 'ip range',
//             rule: 'ipRange',
//             valid: [
//                 '127.0.0.1/24',
//                 '0.0.0.0/0',
//                 '255.255.255.0/32',
//             ],
//             invalid: [
//                 '127.200.230.1/35',
//                 '127.200.230.1/-1',
//                 '1.1.1.1/011',
//                 '::1/64',
//                 '1.1.1/24.1',
//                 '1.1.1.1/01',
//                 '1.1.1.1/1.1',
//                 '1.1.1.1/1.',
//                 '1.1.1.1/1/1',
//                 '1.1.1.1'
//             ]
//         })
//         expect(state).toBe(true)
//         done()
//     })
// });

describe('Test the ip address rule', () => {
    it('should validate all the ipv4 address scenarios', (done) => {
        var state = test({
            field: 'ip address',
            rule: 'ip: 4',
            valid: [
                '127.0.0.1',
                '0.0.0.0',
                '1.2.3.4',
                '255.255.255.255',
            ],
            invalid: [
                '::1',
                '2001:db8:0000:1:1:1:1:1',
                '::ffff:127.0.0.1',
            ]
        })
        expect(state).toBe(true)
        done()
    })

    it('should validate all the ipv6 address scenarios', (done) => {
        var state = test({
            field: 'ip address',
            rule: 'ip: 6',
            valid: [
                '::1',
                '2001:db8:0000:1:1:1:1:1',
                '::ffff:127.0.0.1',
            ],
            invalid: [
                '127.0.0.1',
                '0.0.0.0',
                '255.255.255.255',
                '1.2.3.4',
                '::ffff:287.0.0.1',
            ]
        })
        expect(state).toBe(true)
        done()
    })
});