// __tests__/FarmerCalculations.test.js
import { 
    calculateTotalCredits, 
    calculateTotalValue, 
    calculateAveragePrice 
  } from '/Users/ghadihersi/Desktop/Senior-Project-Mustdam--Mustdam_Frontend/src/test/FarmerCalculations.js';
  
  describe('Carbon Credit Calculation Functions', () => {
    describe('calculateTotalCredits', () => {
      test('should calculate the correct total credits', () => {
        const credits = [
          { amount: '10.5' },
          { amount: '20.5' },
          { amount: '5' }
        ];
        
        expect(calculateTotalCredits(credits)).toBe('36.00');
      });
      
      test('should return zero for an empty array', () => {
        expect(calculateTotalCredits([])).toBe('0.00');
      });
      
      test('should handle undefined values', () => {
        const credits = [
          { amount: '10' },
          {},  // missing amount value
          { amount: '5' }
        ];
        
        expect(calculateTotalCredits(credits)).toBe('15.00');
      });
      
      test('should handle non-numeric values', () => {
        const credits = [
          { amount: '10' },
          { amount: 'non-numeric' },
          { amount: '5' }
        ];
        
        expect(calculateTotalCredits(credits)).toBe('15.00');
      });
      
      test('should handle null input', () => {
        expect(calculateTotalCredits(null)).toBe('0.00');
      });
    });
  
    describe('calculateTotalValue', () => {
      test('should calculate the correct total value', () => {
        const credits = [
          { amount: '10', pricePerCredit: '5' },
          { amount: '20', pricePerCredit: '3' }
        ];
        
        expect(calculateTotalValue(credits)).toBe('110.00');
      });
      
      test('should return zero for an empty array', () => {
        expect(calculateTotalValue([])).toBe('0.00');
      });
      
      test('should handle missing amount values', () => {
        const credits = [
          { amount: '10', pricePerCredit: '5' },
          { pricePerCredit: '3' },
          { amount: '5', pricePerCredit: '2' }
        ];
        
        expect(calculateTotalValue(credits)).toBe('60.00');
      });
      
      test('should handle missing price values', () => {
        const credits = [
          { amount: '10', pricePerCredit: '5' },
          { amount: '20' },
          { amount: '5', pricePerCredit: '2' }
        ];
        
        expect(calculateTotalValue(credits)).toBe('60.00');
      });
      
      test('should handle negative values', () => {
        const credits = [
          { amount: '10', pricePerCredit: '5' },
          { amount: '-5', pricePerCredit: '3' }
        ];
        
        expect(calculateTotalValue(credits)).toBe('35.00');
      });
      
      test('should handle null input', () => {
        expect(calculateTotalValue(null)).toBe('0.00');
      });
    });
  
    describe('calculateAveragePrice', () => {
      test('should calculate the correct average price', () => {
        const credits = [
          { pricePerCredit: '10' },
          { pricePerCredit: '20' },
          { pricePerCredit: '30' }
        ];
        
        expect(calculateAveragePrice(credits)).toBe('20.00');
      });
      
      test('should return 0.00 for an empty array', () => {
        expect(calculateAveragePrice([])).toBe('0.00');
      });
      
      test('should handle missing price values', () => {
        const credits = [
          { pricePerCredit: '10' },
          {},
          { pricePerCredit: '20' }
        ];
        
        expect(calculateAveragePrice(credits)).toBe('10.00');
      });
      
      test('should handle non-numeric values', () => {
        const credits = [
          { pricePerCredit: '10' },
          { pricePerCredit: 'non-numeric' },
          { pricePerCredit: '20' }
        ];
        
        expect(calculateAveragePrice(credits)).toBe('10.00');
      });
      
      test('should handle decimal values', () => {
        const credits = [
          { pricePerCredit: '10.5' },
          { pricePerCredit: '20.5' },
          { pricePerCredit: '30' }
        ];
        
        expect(calculateAveragePrice(credits)).toBe('20.33');
      });
      
      test('should handle null input', () => {
        expect(calculateAveragePrice(null)).toBe('0.00');
      });
    });
    
    describe('Special Case Tests', () => {
      test('should handle unusual decimal values', () => {
        const credits = [
          { amount: '0.1', pricePerCredit: '0.2' },
          { amount: '0.2', pricePerCredit: '0.1' }
        ];
        
        // Due to floating-point precision issues in JavaScript
        expect(calculateTotalValue(credits)).toBe('0.04');
      });
      
      test('should handle large numbers', () => {
        const credits = [
          { amount: '1000000', pricePerCredit: '1000' },
          { amount: '2000000', pricePerCredit: '500' }
        ];
        
        expect(calculateTotalValue(credits)).toBe('2000000000.00');
      });
    });
  });
  
  // Additional tests for full coverage
  
  describe('Advanced Calculation Function Tests', () => {
    // Test when no data or undefined is provided
    test('should work with undefined for all functions', () => {
      expect(calculateTotalCredits(undefined)).toBe('0.00');
      expect(calculateTotalValue(undefined)).toBe('0.00');
      expect(calculateAveragePrice(undefined)).toBe('0.00');
    });
    
    // Test with a mix of valid and invalid data
    test('should handle mixed valid and invalid data', () => {
      const mixedCredits = [
        { amount: '10', pricePerCredit: '5' },
        { amount: 'NaN', pricePerCredit: null },
        { amount: '', pricePerCredit: undefined },
        { amount: '20', pricePerCredit: '10' },
      ];
      
      expect(calculateTotalCredits(mixedCredits)).toBe('30.00');
      expect(calculateTotalValue(mixedCredits)).toBe('250.00');
      expect(calculateAveragePrice(mixedCredits)).toBe('3.75');
    });
    
    // Test for very small decimal values
    test('should handle very small decimal values', () => {
      const tinyCredits = [
        { amount: '0.0001', pricePerCredit: '0.0001' },
        { amount: '0.0002', pricePerCredit: '0.0002' },
      ];
      
      expect(calculateTotalCredits(tinyCredits)).toBe('0.00');
      expect(calculateTotalValue(tinyCredits)).toBe('0.00');
      expect(calculateAveragePrice(tinyCredits)).toBe('0.00');
    });
  });
  