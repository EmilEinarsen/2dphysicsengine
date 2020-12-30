import Engine from "../../.."
import PhysicsEntity from "../../../Entities/Entity"
import { calcCollision } from "../../../Physics/movement"

const circleRectangle = (ent0, ent1) => {
	let c = ent0.form.type === 'CIRCLE' ? ent0 : ent1
	let r = ent0.form.type === 'RECTANGLE' ? ent0 : ent1

	let velocity = calcCollision.velocity(
		c, 
		{ ...r, x: r.getMidX(), y: r.getMidY() }	
	)
	
	c.vx = velocity.ent0.x
	c.vy = velocity.ent0.y
	
	r.physics === PhysicsEntity.PHYSICS.DYNAMIC && (
		r.vx = velocity.ent1.x,
		r.vy = velocity.ent1.y
	)

}

export default circleRectangle