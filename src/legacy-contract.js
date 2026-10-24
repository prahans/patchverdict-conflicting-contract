'use strict';

// Separate legacy integration contract, not involved in the reported fee bug.
function legacyContractTotal(subtotal, processingFee) {
  return subtotal + processingFee;
}

module.exports = { legacyContractTotal };
