import Canvas from '../Canvas'
import preset from '../preset'

export const getCanvasSize = () => ({
    height: Canvas.element.height / preset.canvas.scale,
    width: Canvas.element.width / preset.canvas.scale
})

/**
 * 
 * @returns {function | number}
 */
export const timer = () => {
    const start = new Date().getTime()

    return () => {
        const end = new Date().getTime()

        return ( end - start ) * preset.physics.speed
    } 
}

export const getPointsOfRectangle = entity => [
	{ x: entity.x, y: entity.y },
	{ x: entity.x, y: entity.y + entity.size.height },
	{ x: entity.x + entity.size.width, y: entity.y },
	{ x: entity.x + entity.size.width, y: entity.y + entity.size.height},
]

export const getEntityLastPoint = entity => {
	let 
		canvasSize = getCanvasSize(),
		vd = {
			x: entity.vx === 0 ? 0 : entity.vx < 0 ? -1 : 1,
			y: entity.vy === 0 ? 0 : entity.vy < 0 ? -1 : 1
		},
		t = {
			x: vd.x === 0 ? 0 : ((vd.x === -1 ? 0 : canvasSize.width) - (entity.x < 0 ? 0 : entity.x)) / entity.vx,
			y: vd.y === 0 ? 0 : ((vd.y === -1 ? 0 : canvasSize.height) - (entity.y < 0 ? 0 : entity.y)) / entity.vy
		}

	return t.x < t.y 
			? t.x === 0 ? undefined : { x: (entity.vx * t.x) + entity.x, y: (entity.vy * t.x) + entity.y }
			: t.y === 0 ? undefined : { x: (entity.vx * t.y) + entity.x, y: (entity.vy * t.y) + entity.y }
}

export const isLinesIntersecting = (line0, line1) =>
	line0.a.x - line1.a.x <= 0 && line1.b.x - line0.b.x <= 0
	&& line0.a.y - line1.a.y <= 0 && line1.b.y - line0.b.y <= 0
