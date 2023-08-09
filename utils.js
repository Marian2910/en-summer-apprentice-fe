/**
 * Converts a string to kebab case.
 * @param {string} str
 * @returns {string} 
 */
export const kebabCase = (str) => str.replace(/\s+/g, '-');
/**
 * 
 * @param {string} searchTerm
 */

export const addPurchase = (data) => {
    const purchasedEvents =
      JSON.parse(localStorage.getItem('purchasedEvents')) || [];
    purchasedEvents.push(data);
    localStorage.setItem('purchasedEvents', JSON.stringify(purchasedEvents));
  };
  


