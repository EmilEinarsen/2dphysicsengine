import { pythagorean } from '../../../Calculations/Formulas'

/**
 * @returns {boolean} collision
 */
const circle = (ent0, ent1) =>	{
	
	return pythagorean(ent0.x-ent1.x, ent0.y-ent1.y) < ent0.size.radius + ent1.size.radius
	
}
export default circle