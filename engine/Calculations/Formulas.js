const meterToPixelRatio = 3779.5275590551

export const secToMs = t => t / 1000

export const pixelToMeter = pixel => pixel * ( 1 / meterToPixelRatio )

export const meterToPixel = meter => meter * meterToPixelRatio

/**
 * @param {Lengths} obj
 * 
 *  @returns {number} hypotenuse
 */
export const pythagorean = (a, b) =>
		// c = √a2 + b2
		Math.sqrt(( Math.pow(a,2) + Math.pow(b,2) ))

/**
 * @param {Point} a
 * @param {Point} b
 * @param {Point} c
 * 
 *  @returns {number} area
 */
export const areaOfRectangle = (a,b,c) =>
	Math.abs((
		(( b.x * a.y ) - ( a.x * b.y )) 
		+ (( c.x * b.y ) - ( b.x *c.y )) 
		+ (( a.x * c.y ) - ( c.x * a.y ))
	))

/**
 * @param {Point} a
 * @param {Point} b
 * @param {Point} c
 * 
 *  @returns {number} area
 */
export const areaOfTriangle = (a,b,c) =>
	areaOfRectangle(a,b,c)/2