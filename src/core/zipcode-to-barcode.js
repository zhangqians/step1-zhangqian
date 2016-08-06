"use strict";
const _ = require('lodash');

const mapping = {
  1: ":::||",
  2: "::|:|",
  3: "::||:",
  4: ":|::|",
  5: ":|:|:",
  6: ":||::",
  7: "|:::|",
  8: "|::|:",
  9: "|:|::",
  0: "||:::"
};

function containsOnlyDigits(numbers) {
  return _.every(numbers, n => '0' <= n && n <= '9');
}

function checkZipcode(zipcode) {
  let finalZipcode = zipcode;
  if (finalZipcode.length === 10 && finalZipcode.charAt(5) === '-') {
    finalZipcode = finalZipcode.substring(0, 5) + finalZipcode.substring(6);
  }
  let isAllNumbers = containsOnlyDigits(finalZipcode);
  return isAllNumbers && (finalZipcode.length === 5 || finalZipcode.length === 9);
}

function formatZipcode(zipcode) {
  return [...zipcode].filter(c => c !== '-').map(n => parseInt(n));
}

function calculateCd(zipcodeNumbers) {
  let total = _.sum(zipcodeNumbers);
  return _.range(10).find(n => (total + n) % 10 === 0);
}

function convertToBarcode(zipcodeNumbers) {
  let barcode = zipcodeNumbers.map(c => mapping[c]).join('');
  return '|' + barcode + '|';
}

function zipcodeToBarcode(zipcode) {
  if (checkZipcode(zipcode)) {
    let zipcodeNumbers = formatZipcode(zipcode);
    let cd = calculateCd(zipcodeNumbers);
    zipcodeNumbers.push(cd);
    return convertToBarcode(zipcodeNumbers);
  }
  return 'Invalid zipcode: ' + zipcode;
}

module.exports = {
  checkZipcode: checkZipcode,
  formatZipcode: formatZipcode,
  calculateCd: calculateCd,
  convertToBarcode: convertToBarcode,
  zipcodeToBarcode: zipcodeToBarcode
};