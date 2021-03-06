import { secToMs, meterToPixel, pixelToMeter, pythagorean } from '../Calculations/Formulas'
import preset from '../preset'

export const distance = (entity, elapsed) => {
	let t = secToMs( elapsed )

	entity.x += meterToPixel(entity.vx) * t
	entity.y += meterToPixel(entity.vy) * t
}

export const velocity = (entity, elapsed) => {
	const 
		g = preset.perspective === 'SIDE' ? preset.physics.constants.g : 0,
		t = secToMs( elapsed )

	entity.vx += pixelToMeter(meterToPixel( entity.ax ) * t)
	entity.vy += pixelToMeter(meterToPixel( entity.ay + g ) * t)

	entity.vx *= preset.physics.constants.friction
	entity.vy *= preset.physics.constants.friction
}

export const calcCollision = {
	velocity: (ent0, ent1) => {
		
		const angle = {
			ent0: Math.atan2(ent0.vy, ent0.vx),
			ent1: Math.atan2(ent1.vy, ent1.vx),
			contact: Math.atan2( (ent0.getMidY() - ent1.getMidY()), (ent0.getMidX() - ent1.getMidX()) )
		}

		ent1.form.type === 'RECTANGLE' && ent0.form.type === 'CIRCLE' && 
			(angle.contact = 
				ent1.getLeft() < ent0.x && ent0.x < ent1.getRight() ? Math.PI/2 : Math.PI
			)

		return {
			ent0: twoMovingEntitesCollisionVelocityResolution(ent0.mass, pythagorean(ent0.vx, ent0.vy), angle.ent0, ent1.mass, pythagorean(ent1.vx, ent1.vy), angle.ent1, angle.contact),
			ent1: twoMovingEntitesCollisionVelocityResolution(ent1.mass, pythagorean(ent1.vx, ent1.vy), angle.ent1, ent0.mass, pythagorean(ent0.vx, ent0.vy), angle.ent0, angle.contact)
		}
	}
}

const twoMovingEntitesCollisionVelocityResolution = (m1, v1, o1, m2, v2, o2, c) => ({
	x: (((((v1*Math.cos(o1-c))*(m1-m2))+(2*m2*v2*Math.cos(o2-c)))/(m1+m2))*Math.cos(c))+(v1*Math.sin(o1-c)*Math.cos(c+(Math.PI/2))),
	y: (((((v1*Math.cos(o1-c))*(m1-m2))+(2*m2*v2*Math.cos(o2-c)))/(m1+m2))*Math.sin(c))+(v1*Math.sin(o1-c)*Math.sin(c+(Math.PI/2)))
})