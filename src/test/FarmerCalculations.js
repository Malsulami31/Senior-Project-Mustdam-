// calculations.js - Calculation utility functions

/**
 * Calculate the total carbon credits
 * @param {Array} credits - Array of credit objects
 * @returns {string} - Total credits rounded to two decimal places
 */
export const calculateTotalCredits = (credits) => {
    if (!credits || credits.length === 0) return '0.00';
    
    const total = credits.reduce((total, credit) => {
      const amount = parseFloat(credit.amount) || 0;
      return total + amount;
    }, 0);
    
    return total.toFixed(2);
  };
  
  /**
   * Calculate the total value of carbon credits
   * @param {Array} credits - Array of credit objects
   * @returns {string} - Total value rounded to two decimal places
   */
  export const calculateTotalValue = (credits) => {
    if (!credits || credits.length === 0) return '0.00';
    
    const total = credits.reduce((total, credit) => {
      const amount = parseFloat(credit.amount) || 0;
      const price = parseFloat(credit.pricePerCredit) || 0;
      return total + (amount * price);
    }, 0);
    
    return total.toFixed(2);
  };
  
  /**
   * Calculate the average price of carbon credits
   * @param {Array} credits - Array of credit objects
   * @returns {string} - Average price rounded to two decimal places
   */
  export const calculateAveragePrice = (credits) => {
    if (!credits || credits.length === 0) return '0.00';
    
    const totalPrice = credits.reduce((total, credit) => {
      const price = parseFloat(credit.pricePerCredit) || 0;
      return total + price;
    }, 0);
    
    return (totalPrice / credits.length).toFixed(2);
  };
  