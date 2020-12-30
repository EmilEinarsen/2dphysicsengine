import { calcCollision } from "../../../Physics/movement"

const circle = (ent0, ent1) => {
	
	const result = calcCollision.velocity(ent0, ent1)

	ent0.vx = result.ent0.x
	ent0.vy = result.ent0.y
	ent1.vx = result.ent1.x
	ent1.vy = result.ent1.y

}

export default circle