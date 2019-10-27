const expect = require('expect')
var packageTest = require('./test')
var test = packageTest.test
var repeat = packageTest.repeat

describe('Test the FQDN rule', () => {
    it('should validate all the fqdn scenarios', (done) => {
        var state = test({
            field: 'fqdn',
            rule: 'fqdn',
            valid: [
                'domain.com',
                'dom.plato',
                'a.domain.co',
                'foo--bar.com',
                'xn--froschgrn-x9a.com',
                'rebecca.blackfriday',
            ],
            invalid: [
                'abc',
                '256.0.0.0',
                '_.com',
                '*.some.com',
                's!ome.com',
                'domain.com/',
                '/more.com',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the Hexadecimal Color rule', () => {
    it('should validate all the hexadecimal color scenarios', (done) => {
        var state = test({
            field: 'hexadecimal',
            rule: 'hex_color',
            valid: [
                '#ff0034',
                '#CCCCCC',
                'fff',
                '#f00',
            ],
            invalid: [
                '#ff',
                'fff0',
                '#ff12FG',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the ISRC code rule', () => {
    it('should validate all the ISRC code scenarios', (done) => {
        var state = test({
            field: 'isrc',
            rule: 'isrc',
            valid: [
                'USAT29900609',
                'GBAYE6800011',
                'USRC15705223',
                'USCA29500702',
            ],
            invalid: [
                'USAT2990060',
                'SRC15705223',
                'US-CA29500702',
                'USARC15705223',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the UUID rule', () => {
    it('should validate UUID\'S version 3', (done) => {
        var state = test({
            field: 'uuid',
            rule: 'uuid:3',
            valid: [
                'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
            ],
            invalid: [
                '',
                'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
                '934859',
                'AAAAAAAA-1111-1111-AAAG-111111111111',
                'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
                'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
            ],
        })
        expect(state).toBe(true)
        done()
    })
    it('should validate UUID\'S version 4', (done) => {
        var state = test({
            field: 'uuid',
            rule: 'uuid:4',
            valid: [
                '713ae7e3-cb32-45f9-adcb-7c4fa86b90c1',
                '625e63f3-58f5-40b7-83a1-a72ad31acffb',
                '57b73598-8764-4ad0-a76a-679bb6640eb1',
                '9c858901-8a57-4791-81fe-4c455b099bc9',
            ],
            invalid: [
                '',
                'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
                '934859',
                'AAAAAAAA-1111-1111-AAAG-111111111111',
                'A987FBC9-4BED-5078-AF07-9141BA07C9F3',
                'A987FBC9-4BED-3078-CF07-9141BA07C9F3',
            ],
        })
        expect(state).toBe(true)
        done()
    })
    it('should validate UUID\'S version 5', (done) => {
        var state = test({
            field: 'uuid',
            rule: 'uuid:5',
            valid: [
                '987FBC97-4BED-5078-AF07-9141BA07C9F3',
                '987FBC97-4BED-5078-BF07-9141BA07C9F3',
                '987FBC97-4BED-5078-8F07-9141BA07C9F3',
                '987FBC97-4BED-5078-9F07-9141BA07C9F3',
            ],
            invalid: [
                '',
                'xxxA987FBC9-4BED-3078-CF07-9141BA07C9F3',
                'A987FBC9-4BED-3078-CF07-9141BA07C9F3xxx',
                'A987FBC94BED3078CF079141BA07C9F3',
                '934859',
                '987FBC9-4BED-3078-CF07A-9141BA07C9F3',
                'AAAAAAAA-1111-1111-AAAG-111111111111',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the md5 rule', () => {
    it('should validate all the  md5 strings scenarios', (done) => {
        var state = test({
            field: 'md5',
            rule: 'md5',
            valid: [
                'd94f3f016ae679c3008de268209132f2',
                '751adbc511ccbe8edf23d486fa4581cd',
                '88dae00e614d8f24cfd5a8b3f8002e93',
                '0bf1c35032a71a14c2f719e5a14c1e96',
            ],
            invalid: [
                'KYT0bf1c35032a71a14c2f719e5a14c1',
                'q94375dj93458w34',
                '39485729348',
                '%&FHKJFvk',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the credit card rule', () => {
    it('should validate all the credit card scenarios', (done) => {
        var state = test({
            field: 'credit_card',
            rule: 'credit_card',
            valid: [
                '375556917985515',
                '36050234196908',
                '4716461583322103',
                '4716-2210-5188-5662',
                '4929 7226 5379 7141',
                '5398228707871527',
                '6283875070985593',
                '6263892624162870',
                '6234917882863855',
                '6234698580215388',
                '6226050967750613',
                '6246281879460688',
                '2222155765072228',
                '2225855203075256',
                '2720428011723762',
                '2718760626256570',
                '6765780016990268',
            ],
            invalid: [
                'foo',
                'foo',
                '5398228707871528',
                '2718760626256571',
                '2721465526338453',
                '2220175103860763',
                '375556917985515999999993',
                '899999996234917882863855',
                'prefix6234917882863855',
                '623491788middle2863855',
                '6234917882863855suffix',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the isin rule', () => {
    it('should validate all the isin scenarios', (done) => {
        var state = test({
            field: 'isin',
            rule: 'isin',
            valid: [
                'AU0000XVGZA3',
                'DE000BAY0017',
                'BE0003796134',
                'SG1G55870362',
                'GB0001411924',
                'DE000WCH8881',
                'PLLWBGD00016',
            ],
            invalid: [
                'DE000BAY0018',
                'PLLWBGD00019',
                'foo',
                '5398228707871528',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the issn rule', () => {
    it('should validate all the issn scenarios', (done) => {
        var state = test({
            field: 'issn',
            rule: 'issn',
            valid: [
                '0378-5955',
                '0000-0000',
                '2434-561X',
                '2434-561x',
                '01896016',
                '20905076',
            ],
            invalid: [
                '0378-5954',
                '0000-0001',
                '0378-123',
                '037-1234',
                '0',
                '2434-561c',
                '1684-5370',
                '19960791',
                '',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the json rule', () => {
    it('should validate all the json scenarios', (done) => {
        var state = test({
            field: 'json',
            rule: 'json',
            valid: [
                '{ "key": "value" }',
                '{}',
            ],
            invalid: [
                '{ key: "value" }',
                '{ \'key\': \'value\' }',
                'null',
                '1234',
                'false',
                '"nope"',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the ISBN rule', () => {
    it('should validate all the isbn 10 value scenarios', (done) => {
        var state = test({
            field: 'isbn',
            rule: 'isbn:10',
            valid: [
                '3836221195', '3-8362-2119-5', '3 8362 2119 5',
                '1617290858', '1-61729-085-8', '1 61729 085-8',
                '0007269706', '0-00-726970-6', '0 00 726970 6',
                '3423214120', '3-423-21412-0', '3 423 21412 0',
                '340101319X', '3-401-01319-X', '3 401 01319 X',
            ],
            invalid: [
                '3423214121', '3-423-21412-1', '3 423 21412 1',
                '978-3836221191', '9783836221191',
                '123456789a', 'foo', '',
            ],
        })
        expect(state).toBe(true)
        done()
    })
    
    it('should validate all the isbn 13 value scenarios', (done) => {
        var state = test({
            field: 'isbn',
            rule: 'isbn:13',
            valid: [
                '9783836221191', '978 - 3 - 8362 - 2119 - 1', '978 3 8362 2119 1',
                '9783401013190', '978-3401013190', '978 3401013190',
                '9784873113685', '978-4-87311-368-5', '978 4 87311 368 5',
            ],
            invalid: [
                '9783836221190', '978-3-8362-2119-0', '978 3 8362 2119 0',
                '3836221195', '3-8362-2119-5', '3 8362 2119 5',
                '01234567890ab', 'foo', '',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});

describe('Test the hash rule', () => {
    // it('should validate md5, md4, ripemd128, tiger128 hash strings scenarios', (done) => {
    //     var state = test({
    //         field: 'hash',
    //         rule: `hash:md5, md4, ripemd128, tiger128`,
    //         valid: [
    //             'd94f3f016ae679c3008de268209132f2',
    //             '751adbc511ccbe8edf23d486fa4581cd',
    //             '88dae00e614d8f24cfd5a8b3f8002e93',
    //             '0bf1c35032a71a14c2f719e5a14c1e96',
    //         ],
    //         invalid: [
    //             'KYT0bf1c35032a71a14c2f719e5a14c1',
    //             'q94375dj93458w34',
    //             '39485729348',
    //             '%&FHKJFvk',
    //         ],
    //     })
    //     expect(state).toBe(true)
    //     done()
    // })

    // it('should validate crc32, crc32b hash strings scenarios', (done) => {
    //     var state = test({
    //         field: 'hash',
    //         rule: `hash:crc32, crc32b`,
    //         valid: [
    //             'd94f3f01',
    //             '751adbc5',
    //             '88dae00e',
    //             '0bf1c350',
    //         ],
    //         invalid: [
    //             'KYT0bf1c35032a71a14c2f719e5a14c1',
    //             'q94375dj93458w34',
    //             'q943',
    //             '39485729348',
    //             '%&FHKJFvk',
    //         ],
    //     })
    //     expect(state).toBe(true)
    //     done()
    // })
    
    // it('should validate sha1, tiger160, ripemd160 hash strings scenarios', (done) => {
    //     var state = test({
    //         field: 'hash',
    //         rule: `hash: sha1, tiger160, ripemd160`,
    //         valid: [
    //             'd94f3f01',
    //             '751adbc5',
    //             '88dae00e',
    //             '0bf1c350',
    //         ],
    //         invalid: [
    //             'KYT0bf1c35032a71a14c2f719e5a14c1',
    //             'q94375dj93458w34',
    //             'q943',
    //             '39485729348',
    //             '%&FHKJFvk',
    //         ],
    //     })
    //     expect(state).toBe(true)
    //     done()
    // })
    
    it('should validate sha256 hash strings scenarios', (done) => {
        var state = test({
            field: 'hash',
            rule: `hash: sha256`,
            valid: [
                '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
                '1d996e033d612d9af2b44b70061ee0e868bfd14c2dd90b129e1edeb7953e7985',
                '80f70bfeaed5886e33536bcfa8c05c60afef5a0e48f699a7912d5e399cdcc441',
                '579282cfb65ca1f109b78536effaf621b853c9f7079664a3fbe2b519f435898c',
            ],
            invalid: [
                'KYT0bf1c35032a71a14c2f719e5a14c1',
                'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
                'q94375dj93458w34',
                '39485729348',
                '%&FHKJFvk',
            ],
        })
        expect(state).toBe(true)
        done()
    })
    
    it('should validate sha384 hash strings scenarios', (done) => {
        var state = test({
            field: 'hash',
            rule: `hash: sha384`,
            valid: [
                '3fed1f814d28dc5d63e313f8a601ecc4836d1662a19365cbdcf6870f6b56388850b58043f7ebf2418abb8f39c3a42e31',
                'b330f4e575db6e73500bd3b805db1a84b5a034e5d21f0041d91eec85af1dfcb13e40bb1c4d36a72487e048ac6af74b58',
                'bf547c3fc5841a377eb1519c2890344dbab15c40ae4150b4b34443d2212e5b04aa9d58865bf03d8ae27840fef430b891',
                'fc09a3d11368386530f985dacddd026ae1e44e0e297c805c3429d50744e6237eb4417c20ffca8807b071823af13a3f65',
            ],
            invalid: [
                'KYT0bf1c35032a71a14c2f719e5a14c1',
                'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
                'q94375dj93458w34',
                '39485729348',
                '%&FHKJFvk',
            ],
        })
        expect(state).toBe(true)
        done()
    })
    
    it('should validate sha512 hash strings scenarios', (done) => {
        var state = test({
            field: 'hash',
            rule: `hash: sha512`,
            valid: [
                '9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043',
                '83c586381bf5ba94c8d9ba8b6b92beb0997d76c257708742a6c26d1b7cbb9269af92d527419d5b8475f2bb6686d2f92a6649b7f174c1d8306eb335e585ab5049',
                '45bc5fa8cb45ee408c04b6269e9f1e1c17090c5ce26ffeeda2af097735b29953ce547e40ff3ad0d120e5361cc5f9cee35ea91ecd4077f3f589b4d439168f91b9',
                '432ac3d29e4f18c7f604f7c3c96369a6c5c61fc09bf77880548239baffd61636d42ed374f41c261e424d20d98e320e812a6d52865be059745fdb2cb20acff0ab',
            ],
            invalid: [
                'KYT0bf1c35032a71a14c2f719e5a14c1',
                'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
                'q94375dj93458w34',
                '39485729348',
                '%&FHKJFvk',
            ],
        })
        expect(state).toBe(true)
        done()
    })
    
    it('should validate tiger192 hash strings scenarios', (done) => {
        var state = test({
            field: 'hash',
            rule: `hash: tiger192`,
            valid: [
                '6281a1f098c5e7290927ed09150d43ff3990a0fe1a48267c',
                '56268f7bc269cf1bc83d3ce42e07a85632394737918f4760',
                '46fc0125a148788a3ac1d649566fc04eb84a746f1a6e4fa7',
                '7731ea1621ae99ea3197b94583d034fdbaa4dce31a67404a',
            ],
            invalid: [
                'KYT0bf1c35032a71a14c2f719e5a14c1',
                'KYT0bf1c35032a71a14c2f719e5a14c1dsjkjkjkjkkjk',
                'q94375dj93458w34',
                '39485729348',
                '%&FHKJFvk',
            ],
        })
        expect(state).toBe(true)
        done()
    })
});