import { pythagorean } from '../../../Calculations/Formulas'

/**
 * @returns {boolean} collision
 */
const circle = (ent0, ent1) => {

	let c = ent0.form.type === 'CIRCLE' ? ent0 : ent1
	let p = ent0.form.type === 'POINT' ? ent0 : ent1

	return pythagorean(c.x-p.x, c.y-p.y) < c.size.radius
}
	
	
export default circle