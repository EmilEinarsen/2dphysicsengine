import Detection from '../Detection/Detection'
import circle from './types/circle'
import circleRectangle from './types/circleRectangle'

function Resolve(ent0, ent1, type) {
	resolveMomentum(ent0, ent1, type)

	preventEntityMerging(ent0, ent1)

}

const resolveMomentum = (ent0, ent1, type) => 
	type === Detection.types.CIRCLE_CIRCLE 
		? circle(ent0, ent1)
	: type === Detection.types.CIRCLE_RECTANGLE || type === Detection.types.RECTANGLE_CIRCLE
		? circleRectangle(ent0, ent1)
	: ''

const preventEntityMerging = (ent0, ent1) => {
	let 
		dx = ent1.x - ent0.x,
		dy = ent1.y - ent0.y

	dx === 0 && dy === 0 && (dx = .001)
	
	let 
		d = Math.sqrt(dx*dx + dy*dy),
		step = ent0.size.radius + ent1.size.radius - d
	
	if (step <= 0) return

	let correctionDistribution = {
		ent0: (ent1.mass) / (ent0.mass + ent1.mass),
		ent1: (ent0.mass) / (ent0.mass + ent1.mass),
	}

	dx /= d; dy /= d
	ent0.x -= dx*step*correctionDistribution.ent0; ent0.y -= dy*step*correctionDistribution.ent0
	ent1.x += dx*step*correctionDistribution.ent1; ent1.y += dy*step*correctionDistribution.ent1
}

export default Resolve