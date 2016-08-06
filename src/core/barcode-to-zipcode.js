'use strict';

const _ = require('lodash');

const mapping = {
  ":::||": 1,
  "::|:|": 2,
  "::||:": 3,
  ":|::|": 4,
  ":|:|:": 5,
  ":||::": 6,
  "|:::|": 7,
  "|::|:": 8,
  "|:|::": 9,
  "||:::": 0
};

function _splitBarcodes(barcode) {
  let zipcodeSymbols = barcode.substring(1, barcode.length - 1);
  return _([...zipcodeSymbols])
    .chunk(5)
    .map(chars => chars.join(''))
    .value();
}

function checkBarcode(barcode) {
  if (barcode) {
    let lengthIsCorrect = [32, 52].includes(barcode.length);
    let frameIsCorrect = barcode.startsWith('|') && barcode.endsWith('|');
    var splitBarcodes = _splitBarcodes(barcode);
    let symbolsAreCorrect = _.every(splitBarcodes, symbol => _(mapping).keys().includes(symbol));
    return lengthIsCorrect && frameIsCorrect && symbolsAreCorrect;
  }
  return false;
}

function convertToZipcode(barcode) {
  return _.map(_splitBarcodes(barcode), symbols => mapping[symbols]);
}

function validateCd(zipcodesWithCd) {
  return _.sum(zipcodesWithCd) % 10 === 0;
}

function formatZipcode(zipcodesWithCd) {
  let zipcode = _.dropRight(zipcodesWithCd, 1);
  if (zipcode.length === 9) {
    zipcode.splice(5, 0, '-');
  }
  return zipcode.join('');
}

function barcodeToZipcode(barcode) {
  if (checkBarcode(barcode)) {
    let zipcodeWithCd = convertToZipcode(barcode)
    if (validateCd(zipcodeWithCd)) {
      return formatZipcode(zipcodeWithCd);
    }
  }
  return 'Invalid barcode: ' + barcode;
}

module.exports = {
  checkBarcode,
  convertToZipcode,
  validateCd,
  formatZipcode,
  barcodeToZipcode
};