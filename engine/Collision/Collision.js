import Detection from './Detection'
import Resolve from './Resolve/Resolve'

export default function Collision(entity0, entity1) {

	const type = entity0.form.type+'_'+entity1.form.type
	
	let collision = Detection(entity0, entity1, type)

	collision && Resolve(entity0, entity1, type)
}

Collision.detection = Detection