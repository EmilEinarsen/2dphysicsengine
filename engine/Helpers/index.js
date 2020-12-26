
/**
 * @param {number} number
 * 
 * @returns {number} 
 */
export const random = (number) => Math.round(Math.random() * number)

/**
 * 
 * @returns {function | number}
 */
export const timer = () => {
    const start = new Date().getTime()

    return () => {
        const end = new Date().getTime()

        return end - start
    } 
} 