import Physics from "../Physics"

/**
 * @param {object} param0
 * @param {string} param0.collisionName 
 * @param {string} param0.type 
 * @param {object} param0.size 
 * @param {number} param0.size.height 
 * @param {number} param0.size.width 
 * @param {object} param0.pos 
 * @param {number} param0.pos.x 
 * @param {number} param0.pos.y
 * @param {number} param0.pos.vx 
 * @param {number} param0.pos.vy
 * @param {number} param0.pos.ax 
 * @param {number} param0.pos.ay
 * @param {object} param0.form
 * @param {string} param0.form.type
 */
function PhysicsEntity({ 
	physics = PhysicsEntity.PHYSICS.DYNAMIC, 
	restitution,
	size = {},
	mass = 1,
	pos = {},
	form = {}
}) {
    const Entity = {}
	Entity.physics = physics

	Entity.restitution = restitution || .2
	
	Entity.form = {
		type: form.type ?? 'RECTANGLE'
	}

    Entity.size = {
		width: size.width ?? size.radius * 2,
		height: size.height ?? size.radius * 2,
		radius : size.radius
	}

	Entity.mass = mass

    Object.assign(Entity, {
        x: pos.x || 0, y: pos.y || 0,
        vx: pos.vx || 0, vy: pos.vy || 0,
        ax: pos.ax || 0, ay: pos.ay || 0,
    })

	Object.assign(Entity, {
		getMidX: () => form.type === 'CIRCLE' ? Entity.x : Entity.x + (Entity.size.width / 2),
		getMidY: () => form.type === 'CIRCLE' ? Entity.y : Entity.y + (Entity.size.height / 2),
		getTop: () => form.type === 'CIRCLE' ? Entity.y - Entity.size.radius : Entity.y,
		getBottom: () => form.type === 'CIRCLE' ? Entity.y + Entity.size.radius : Entity.y + Entity.size.height,
		getLeft: () => form.type === 'CIRCLE' ? Entity.x - Entity.size.radius : Entity.x,
		getRight: () => form.type === 'CIRCLE' ? Entity.x + Entity.size.radius : Entity.x + Entity.size.width,
	})

	Entity.update = elapsed => {
		switch (Entity.physics) {
			case PhysicsEntity.PHYSICS.STATIC:
				// static hitbox, no interaction upon moving
				break
			case PhysicsEntity.PHYSICS.KINEMATIC:
				// interacts, however unaffected by collisions
				break
			case PhysicsEntity.PHYSICS.DYNAMIC:
				// can affect and be affected
				Physics.velocity(Entity, elapsed)
				Physics.distance(Entity, elapsed)
				break
		}
	}

    return Entity
}

PhysicsEntity.PHYSICS = {
	STATIC: 'STATIC',
	KINEMATIC: 'KINEMATIC',
	DYNAMIC: 'DYNAMIC'
}

PhysicsEntity.COLLISION = {
	DISPLACE: 'DISPLACE',
	ELASTIC: 'ELASTIC'
}


export default PhysicsEntity