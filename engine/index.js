import PhysicsEntity from './Entities/Entity'
import Canvas from './Canvas'
import { random, timer } from './Helpers'
import Draw from './Draw'
import { distance, getCanvasSize } from './Calculations'
import preset from './preset'

export default function Engine({ id, settings = {} }) {
    Canvas({ id, settings })
    initial()
}

const initial = () => {
    Engine.entities = []
    const canvasSize = getCanvasSize()

    for(let i = 0; i < 20; i++)
        Engine.entities[i] = PhysicsEntity({ 
            pos: { 
                x: random(canvasSize.width), 
                y: random(canvasSize.height),
                vx: .5
            }
        })

    
    
    let getTime = () => 0
    setInterval(() => {
        step({ elapsed: getTime() })
        
        getTime = timer()
    }, (1000 / 60))
}

const step = ({ elapsed }) => {
    /* 
        interaction

        positional logic

        detect collisions

        resolve collisions
    */

    Engine.entities.forEach(entity => {

        switch (entity.type) {

            case PhysicsEntity.DYNAMIC: 
                entity.x += distance(entity.vx, elapsed)
                entity.y += distance(entity.vy, elapsed)
                break

        }

    })

    draw()
}

const draw = () => {
    const canvasSize = getCanvasSize()

    Draw.rectangle({
        point: { x: 0, y: 0 },
        size: { 
            height: canvasSize.height,
            width: canvasSize.width
        },
        color: 'white'
    })

    Engine.entities.forEach(entity => 
        Draw.rectangle({
            point: { x: entity.x, y: entity.y }, 
            size: entity.size,
            color: 'black'
        }) 
    )
}