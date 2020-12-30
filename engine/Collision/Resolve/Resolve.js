import { pythagorean } from '../../Calculations/Formulas'
import Physics from '../../Physics'
import Detection from '../Detection/Detection'
import circle from './types/circle'
import circleRectangle from './types/circleRectangle'

function Resolve(ent0, ent1, type) {

	resolveMomentum(ent0, ent1, type)

	preventEntityMerging(ent0, ent1, type)

}

const resolveMomentum = (ent0, ent1, type) => 
	type === Detection.types.CIRCLE_CIRCLE 
		? circle(ent0, ent1)
	: type === Detection.types.CIRCLE_RECTANGLE || type === Detection.types.RECTANGLE_CIRCLE
		? circleRectangle(ent0, ent1)
	: ''

const preventEntityMerging = (ent0, ent1, type) => {
	
	const d = {
		x: ent0.getMidX() - ent1.getMidX(),
		y: ent0.getMidY() - ent1.getMidY(),
	}
	d.x === 0 && (d.x = .1)
	d.y === 0 && (d.y = .1)
	d.d = pythagorean(d.x, d.y)

	if(d.d > (ent0.size.radius + ent1.size.radius)) return 
	
	const angle = Math.atan2(d.y,d.x)

	const dToMove = {
		ent0: ent0.form.type === 'CIRCLE' ? d.d / 4 : d.d / 2,
		ent1: ent1.form.type === 'CIRCLE' ? d.d / 4 : d.d / 2
	}
	
	ent0.x += dToMove.ent0 * Math.cos(angle)
	ent1.x += dToMove.ent1 * Math.cos(angle+(Math.PI))
	ent0.y += dToMove.ent0 * Math.sin(angle)
	ent1.y += dToMove.ent1 * Math.sin(angle+(Math.PI))

}

export default Resolve