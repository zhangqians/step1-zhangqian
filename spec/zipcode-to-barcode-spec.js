/**
 * Created by zhagnian on 16-8-5.
 */
"use strict";

let {
    checkZipcode,
    formatZipcode,
    calculateCd,
    convertToBarcode,
    zipcodeToBarcode
} = require('../src/core/zipcode-to-barcode');

describe("Zipcode converter", function () {
    describe("checkZipcode", () => {
        describe("length", ()=> {
            it("should be 5", function () {
                expect(checkZipcode('12345')).toBeTruthy();
            });
            it("should be 9", function () {
                expect(checkZipcode('123451234')).toBeTruthy();
            });
            it("should be 10", function () {
                expect(checkZipcode('12345-6789')).toBeTruthy();
            });
            it("should not be 4", function () {
                expect(checkZipcode('1234')).toBeFalsy();
            });
            it("should not be 6", function () {
                expect(checkZipcode('123456')).toBeFalsy();
            });
            it("should not be 8", function () {
                expect(checkZipcode('12345678')).toBeFalsy();
            });
            it("should not be 11", function () {
                expect(checkZipcode('12345-67890')).toBeFalsy();
            });
        });

        describe('position of -', ()=> {
            it('should be 6', ()=> {
                expect(checkZipcode('12345-6789')).toBeTruthy();
            });
            it('should not be 5', ()=> {
                expect(checkZipcode('1234-56789')).toBeFalsy();
            });
            it('should not be 7', ()=> {
                expect(checkZipcode('123456-789')).toBeFalsy();
            });
        });

        describe('number of -', () => {
            it('should be 1', ()=> {
                expect(checkZipcode('12345-6789')).toBeTruthy();
            });
            it('should not be 0', ()=> {
                expect(checkZipcode('1234566789')).toBeFalsy();
            });
            it('should not be 2', ()=> {
                expect(checkZipcode('12345--789')).toBeFalsy();
            });
        });

        describe('the symbol -', ()=> {
            it('should be -', () => {
                expect(checkZipcode('12345-6789')).toBeTruthy();
            });
            it('should not be #', () => {
                expect(checkZipcode('12345#6789')).toBeFalsy();
            })
        });

        describe('numbers', () => {
            it('should be numbers', () => {
                expect(checkZipcode('12345')).toBeTruthy();
            });
            it('should not be letters', ()=> {
                expect(checkZipcode('hello')).toBeFalsy();
            })
        })
    });

    describe('formatZipcode', ()=> {
        it('format xxxxx-xxxx zipcode', ()=> {
            let zipcode = '12345-6789';
            let result = formatZipcode(zipcode);
            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
        });
        it('format xxxxxxxxx zipcode', ()=> {
            let zipcode = '123456789';
            let result = formatZipcode(zipcode);
            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
        });
        it('format xxxxx zipcode', ()=> {
            let zipcode = '12345';
            let result = formatZipcode(zipcode);
            expect(result).toEqual([1, 2, 3, 4, 5])
        });
    });
    describe('calculateCd', () => {
        it('calculate the correct CD', () => {
            let zipcodeNumbers = [1, 2, 3, 4, 5];
            let cd = calculateCd(zipcodeNumbers);
            expect(cd).toEqual(5);
        });
        it('calculate the correct CD when it is 0', () => {
            let zipcodeNumbers = [1, 2, 3, 2, 2];
            let cd = calculateCd(zipcodeNumbers);
            expect(cd).toEqual(0);
        });
    });
    describe('convertToBarcode', () => {
        it('converts numbers to barcodes with frames', () => {
            let zipcodeNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
            let result = convertToBarcode(zipcodeNumbers);
            expect(result).toEqual("|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|::||:::|");
        });
    });
    describe('zipcode2barcode', ()=> {
        it('converts 5 length zipcode to barcode', () => {
            var result = zipcodeToBarcode('12345');
            expect(result).toEqual('|:::||::|:|::||::|::|:|:|::|:|:|')
        });
        it('converts 9 length zipcode to barcode', () => {
            var result = zipcodeToBarcode('123456789');
            expect(result).toEqual('|:::||::|:|::||::|::|:|:|::||::|:::||::|:|:|:::|:|:|')
        });
        it('converts 10 length zipcode to barcode', () => {
            var result = zipcodeToBarcode('45056-1234');
            expect(result).toEqual('|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|')
        });
        it('returns invalid zipcode if zipcode is invalid', ()=> {
            var result = zipcodeToBarcode('123');
            expect(result).toEqual('Invalid zipcode: 123');
        });
    });
});