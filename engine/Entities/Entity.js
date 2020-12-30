let Collision = {

    elastic: (restitution) => {
        Collision.restitution = restitution || .2
    },

    displace: () => {
        // possible friction 
    }
}


/**
 * 
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
    collisionName = PhysicsEntity.COLLISION.ELASTIC, 
    physics = PhysicsEntity.PHYSICS.DYNAMIC, 
	size = {},
	mass = 1,
	pos = {},
	form = {}
}) {
    const Entity = {}
    Entity.collision = collisionName
	Entity.physics = physics
	
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