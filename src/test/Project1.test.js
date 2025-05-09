import { calculatePrices , isValidQuantity } from './Project1';

describe('calculatePrices', () => {
  it('should calculate priceBeforeFee, transactionFee, and totalPrice correctly', () => {
    const quantity = 100;
    const pricePerTon = 8.55;
    const transactionFeeRate = 0.01;

    const { priceBeforeFee, transactionFee, totalPrice } = calculatePrices(quantity, pricePerTon, transactionFeeRate);

    expect(priceBeforeFee).toBeCloseTo(855);
    expect(transactionFee).toBeCloseTo(8.55);
    expect(totalPrice).toBeCloseTo(863.55);
  });

  it('should handle different quantities correctly', () => {
    const quantity = 50;
    const pricePerTon = 10;
    const transactionFeeRate = 0.02;

    const { priceBeforeFee, transactionFee, totalPrice } = calculatePrices(quantity, pricePerTon, transactionFeeRate);

    expect(priceBeforeFee).toBeCloseTo(500);
    expect(transactionFee).toBeCloseTo(10);
    expect(totalPrice).toBeCloseTo(510);
  });
  
  it('should return all zeros when pricePerTon is 0', () => {
    const result = calculatePrices(100, 0, 0.02);
    expect(result.priceBeforeFee).toBe(0);
    expect(result.transactionFee).toBe(0);
    expect(result.totalPrice).toBe(0);
  });
  
});



describe('isValidQuantity', () => {
  it('should return true for quantity 1 or more', () => {
    expect(isValidQuantity(1)).toBe(true);
    expect(isValidQuantity(10)).toBe(true);
  });

  it('should return false for quantity less than 1', () => {
    expect(isValidQuantity(0)).toBe(false);
    expect(isValidQuantity(-5)).toBe(false);
  });
});