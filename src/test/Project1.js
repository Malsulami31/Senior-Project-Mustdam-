export function calculatePrices(quantity, pricePerTon, transactionFeeRate) {
  const priceBeforeFee = quantity * pricePerTon;
  const transactionFee = priceBeforeFee * transactionFeeRate;
  const totalPrice = priceBeforeFee + transactionFee;

  return { priceBeforeFee, transactionFee, totalPrice };
}

export function isValidQuantity(quantity) {
  return quantity >= 1;
}
