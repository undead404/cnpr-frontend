/* eslint-disable import/prefer-default-export */

export function normalizePlateNumber(plateNumber) {
  return plateNumber.replace(' ', '').toUpperCase();
}
