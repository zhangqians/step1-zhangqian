/**
 * Created by zhagnian on 16-8-5.
 */
'use strict';

const {
    checkBarcode,
    convertToZipcode,
    validateCd,
    formatZipcode,
    barcodeToZipcode
} = require('../src/core/barcode-to-zipcode');

describe('barcodeToZipcode', ()=> {
    describe('checkBarcode', ()=> {
        describe('length', () => {
            it('should be 32', ()=> {
                var barcode = '|:::||::|:|::||::|::|:|:|::|:|:|';
                expect(checkBarcode(barcode)).toBeTruthy();
            });
            it('should be 52', ()=> {
                var barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
                expect(checkBarcode(barcode)).toBeTruthy();
            });
            it('should not be 31', ()=> {
                var barcode = '|:::||::|:|::||::|::|:|:|::|:||';
                expect(checkBarcode(barcode)).toBeFalsy();
            });
            it('should not be 33', ()=> {
                var barcode = '|:::||::|:|::||::|::|:|:|::|:|:||';
                expect(checkBarcode(barcode)).toBeFalsy();
            });
            it('should not be 51', ()=> {
                var barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:||';
                expect(checkBarcode(barcode)).toBeFalsy();
            });
            it('should not be 53', ()=> {
                var barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:||';
                expect(checkBarcode(barcode)).toBeFalsy();
            });
        })
    });

    describe('convertToZipcode', ()=> {
        it('converts barcode to zipcode', ()=> {
            let barcode = '|:::||::|:||';
            expect(convertToZipcode(barcode)).toEqual([1, 2]);
        })
    });

    describe('validateCd', () => {
        it('returns true if the sum of all numbers can be divided by 10', ()=> {
            expect(validateCd([1, 2, 3, 4, 5, 5])).toBeTruthy();
        });
        it('returns false if the sum of all numbers can not be divided by 10', ()=> {
            expect(validateCd([1, 2, 3, 4, 5, 1])).toBeFalsy();
        });
    });

    describe('formatZipcode', ()=> {
        it('can format to 5 length zipcode', ()=> {
            expect(formatZipcode([1, 2, 3, 4, 5, 5])).toEqual('12345');
        });
        it('can format to 10 length zipcode', ()=> {
            expect(formatZipcode([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])).toEqual('12345-1234');
        });
    });

    describe('barcode-to-zipcode', () => {
        it('can convert barcode to 5 length zipcode', ()=> {
            let barcode = '|:::||::|:|::||::|::|:|:|::|:|:|';
            expect(barcodeToZipcode(barcode)).toEqual('12345');
        });
        it('can convert barcode to 10 length zipcode', ()=> {
            let barcode = '|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|';
            expect(barcodeToZipcode(barcode)).toEqual('12345-6789');
        });
        it('returns "invalid barcode" if the barcode is invalid', ()=> {
            let barcode = '|:::||::|:|::||::|::|:|:|::::|||';
            expect(barcodeToZipcode(barcode)).toEqual('Invalid barcode: |:::||::|:|::||::|::|:|:|::::|||');
        })
    })
});