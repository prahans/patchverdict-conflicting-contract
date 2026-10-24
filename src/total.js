'use strict';

/**
 * Calculate a displayed amount by adding a flat processing fee.
 * Both arguments are finite non-negative numbers for this fixture.
 */
function calculateTotal(subtotal, processingFee) {
  // Reported defect: the processing fee is not included.
  return subtotal;
}

module.exports = { calculateTotal };
