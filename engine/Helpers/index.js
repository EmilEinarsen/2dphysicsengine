
/**
 * @param {number} number
 * 
 * @returns {number} 
 */
export const random = (number, { negative } = {}) => (Math.random() * number) * (negative ? (Math.round(Math.random()) === 0 ? -1 : 1) : 1)

export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()