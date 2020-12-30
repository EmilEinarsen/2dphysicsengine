import { pythagorean } from "../../../Calculations/Formulas"

const circleRectangle = (ent0, ent1) => {
	
	let c = ent0.form.type === 'CIRCLE' ? ent0 : ent1
	let r = ent0.form.type === 'RECTANGLE' ? ent0 : ent1
	
	let dist = {
		x: Math.abs( c.getMidX() - r.getMidX() ),
		y: Math.abs( c.getMidY() - r.getMidY() )
	}

	let collision = (() => {
		if (dist.x > ((r.size.width / 2) + c.size.radius)) return false
		if (dist.y > ((r.size.height / 2) + c.size.radius)) return false

		if (dist.x <= (r.size.width / 2)) return true 
		if (dist.y <= (r.size.height / 2)) return true
		
		return pythagorean( (dist.x - (r.size.width / 2)), (dist.y - (r.size.height / 2)) ) <= Math.pow(c.size.radius)
	})()
	
	return collision
}

export default circleRectangle