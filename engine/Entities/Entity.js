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
 */
function PhysicsEntity({ 
    collisionName = PhysicsEntity.ELASTIC, 
    type = PhysicsEntity.DYNAMIC, 
    size = {}, 
    pos = {}
}) {
    
    PhysicsEntity.collision = collisionName
    PhysicsEntity.type = type

    PhysicsEntity.size = {
        height: size.height || 20,
        width: size.width || 20,
    }

    Object.assign(PhysicsEntity, {
        x: pos.x || 0, y: pos.y || 0,
        vx: pos.vx || 0, vy: pos.vy || 0,
        ax: pos.ax || 0, ay: pos.ay || 0,
    })

    return { ...PhysicsEntity }
}


Object.assign(PhysicsEntity, {
    getMidX: () => PhysicsEntity.halfWidth + PhysicsEntity.x,
    getMidY: () => PhysicsEntity.halfHeight + PhysicsEntity.y,
    getTop: () => PhysicsEntity.y,
    getLeft: () => PhysicsEntity.x,
    getRight: () => PhysicsEntity.x + PhysicsEntity.width,
    getBottom: () => PhysicsEntity.y + PhysicsEntity.height
})


PhysicsEntity.KINEMATIC = 'kinematic'

PhysicsEntity.DYNAMIC   = 'dynamic'

PhysicsEntity.DISPLACE = 'displace'

PhysicsEntity.ELASTIC = 'elastic'

export default PhysicsEntity