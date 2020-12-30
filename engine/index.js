import PhysicsEntity from './Entities/Entity'
import Physics from './Physics'
import Canvas from './Canvas'
import Draw from './Draw/Draw'
import Collision from './Collision'
import { capitalizeFirstLetter, random } from './Helpers'
import { getCanvasSize, timer } from './Calculations'
import preset from './preset'

export default function Engine({ 
	id, 
	settings: {
		perspective,
		mode,
		edges
	}
}) {
	if(!Engine.PERSPECTIVES[perspective]) {
		console.log('Invalid perspective')
		return
	}

	preset.perspective = perspective
	preset.mode = mode
	preset.edges = edges
	
	Canvas({ id, settings: {} })
	initial()
}

const initial = () => {
	Engine.timer = timer()
    Engine.entities = []
	const canvasSize = getCanvasSize()

	for(let i = 0; i < 3000; i++)
		Engine.entities.push(PhysicsEntity({
			form: { type: Draw.forms.CIRCLE },
			physics: PhysicsEntity.PHYSICS.DYNAMIC,
			pos: {
				x: canvasSize.width/2,
				y: canvasSize.height/2,
				vx: random(1, { negative: true }),
				vy: random(1, { negative: true })
			},
			size: { radius: 10 },
			mass: .1
		}))

	/* Engine.entities.push(PhysicsEntity({
		form: { type: Draw.forms.CIRCLE },
		physics: PhysicsEntity.PHYSICS.DYNAMIC,
		pos: {
			x: canvasSize.width/2,
			y: canvasSize.height/2,
			vx: 0,
			vy: 0
		},
		size: { radius: 50 },
		mass: .1
	}))

	Engine.entities.push(PhysicsEntity({
		form: { type: Draw.forms.CIRCLE },
		physics: PhysicsEntity.PHYSICS.DYNAMIC,
		pos: {
			x: canvasSize.width/2,
			y: canvasSize.height/2 - 60,
			vx: 0,
			vy: 0
		},
		size: { radius: 50 },
		mass: .1
	})) */
	
	/* for(let i = 0; i < 50; i++)
	Engine.entities.push(PhysicsEntity({
		form: { type: Draw.forms.CIRCLE },
		physics: PhysicsEntity.PHYSICS.DYNAMIC,
		pos: {
			x: canvasSize.width/2,
			y: canvasSize.height/2,
			vx: random(1, { negative: true }),
			vy: random(1, { negative: true })
		},
		size: { radius: 50 },
		mass: 10
	})) */

	/* Engine.entities.push(PhysicsEntity({
		form: { type: Draw.forms.RECTANGLE },
		physics: PhysicsEntity.PHYSICS.DYNAMIC,
		pos: {
			x: canvasSize.width/2,
			y: canvasSize.height/2 - 20,
			vx: -1,
			vy: 0
		},
		size: { radius: 50 },
		mass: 30
	})) */
		
	
    process()
}

const process = () => {
	let getTime = () => 0
	
	Engine.process = setInterval(() => {
		preset.edges && screenEdges()

		removeOutOfBoundEntities()

		step({ elapsed: getTime() })

		getTime = timer()

		Engine.MODE.DEBUG && (
			process.count > Engine.entities.length && console.log(Engine.entities.length),
			process.count = Engine.entities.length
		)
	}, (1000 / 60))
}

const step = ({ elapsed }) => {
	/* 
		MAP:
			interaction
			positional logic
			detect collisions
			resolve collisions
    */

	/* Positional logic */
	Engine.entities.forEach(entity => {

			switch (entity.physics) {
				case PhysicsEntity.PHYSICS.STATIC:
					// static hitbox, no interaction upon moving
					break
				case PhysicsEntity.PHYSICS.KINEMATIC:
					// interacts, however unaffected by collisions
					break
				case PhysicsEntity.PHYSICS.DYNAMIC:
					// can affect and be affected
					entity.vx += Physics.velocity(entity.ax, elapsed, 'x')
					entity.vy += Physics.velocity(entity.ay, elapsed, 'y')
					entity.x += Physics.distance(entity.vx, elapsed)
					entity.y += Physics.distance(entity.vy, elapsed)
					break
			}

	})
	
	/* Detect collisions */
	Engine.entities.forEach((entity, index) => {
		for(let i = index + 1; i < Engine.entities.length; i++)
			Collision(entity, Engine.entities[i])
	})

    draw()
}

const draw = () => {
    const canvasSize = getCanvasSize()

	// New Layer
    Draw({
		form: { type: Draw.forms.RECTANGLE, color: 'white' },
        point: { x: 0, y: 0 },
        size: { 
            height: canvasSize.height,
            width: canvasSize.width
        }
    })

    Engine.entities.forEach(entity => 
        Draw({
			form: entity.form,
            point: { x: entity.x, y: entity.y }, 
			size: entity.size,
			type: 'stroke'
        })
	)

	if(preset.mode === Engine.MODE.DEBUG) {
		Draw.text(`
			Runtime (s): ${Math.round(Engine.timer()/10)/100}
		`, 100, 100)
		Draw.text(`
			Speed: ${preset.physics.speed}
		`, 100, 160)
		Draw.text(`
			Perspective: ${capitalizeFirstLetter(preset.perspective)}
		`, 100, 220)
	}
}

const screenEdges = () => {
	const canvasSize = getCanvasSize()

	Engine.entities.forEach(entity => {

		const e = {
			l: entity.getLeft(),
			r: entity.getRight(),
			t: entity.getTop(),
			b: entity.getBottom()
		}

		;(e.l <= 0 && entity.vx <= 0) && (
			(entity.vx = -entity.vx),
			(entity.form.type === 'CIRCLE' ? entity.x = entity.size.radius : entity.x = 0)
		)
		;(e.r >= canvasSize.width && entity.vx >= 0) && (
			(entity.vx = -entity.vx),
			(entity.form.type === 'CIRCLE' ? entity.x = canvasSize.width - entity.size.radius : entity.x = canvasSize.width - entity.size.width)
		)
		;(e.t <= 0 && entity.vy <= 0) && (
			(entity.vy = -entity.vy),
			(entity.form.type === 'CIRCLE' ? entity.y = entity.size.radius : entity.y = 0)
		)
		;(e.b >= canvasSize.height && entity.vy >= 0) && (
			(entity.vy = -entity.vy),
			(entity.form.type === 'CIRCLE' ? entity.y = canvasSize.height - entity.size.radius : entity.y = canvasSize.height - entity.size.height)
		)
	})
}

const removeOutOfBoundEntities = () => {
	const canvasSize = getCanvasSize()

	Engine.entities = Engine.entities.filter((entity, index) => 

		!(preset.perspective === Engine.PERSPECTIVES.SIDE 
			? canvasSize.height < entity.getTop()

		: preset.perspective ===  Engine.PERSPECTIVES.ABOVE 
			? (-preset.entityOutOfBoundsTolerance > entity.getBottom() 
				|| (canvasSize.height + preset.entityOutOfBoundsTolerance) < entity.getTop()
				|| -preset.entityOutOfBoundsTolerance > entity.getRight()
				|| (canvasSize.width + preset.entityOutOfBoundsTolerance) < entity.getLeft())
		
		: true)

	)
	
	preset.edges && !Engine.entities.length && clearInterval(Engine.process)
}

Engine.PERSPECTIVES = {
	ABOVE: 'ABOVE',
	SIDE: 'SIDE'
}

Engine.MODE = {
	NORMAL: 'NORMAL',
	DEBUG: 'DEBUG'
}