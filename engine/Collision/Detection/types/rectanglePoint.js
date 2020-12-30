import { areaOfRectangle, areaOfTriangle } from "../../../Calculations/Formulas"

/**
 * 
 * @param {Point} a 
 * @param {Point} b 
 * @param {Point} c 
 * @param {Point} d 
 * @param {Point} p
 * 
 * @return {boolean}
 */
const rectanglePoint = (a,b,c,d,p) => {
	const areaRectangle = areaOfRectangle(a,b,c)
	
	const { APD, DPC, CPB, PBA } = {
		APD: areaOfTriangle(a,p,d),
		DPC: areaOfTriangle(d,p,c),
		CPB: areaOfTriangle(c,p,b),
		PBA: areaOfTriangle(p,b,a),
	}

	return areaRectangle >= ( APD + DPC + CPB + PBA )
}

export default rectanglePoint