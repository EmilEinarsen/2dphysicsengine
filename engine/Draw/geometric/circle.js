import Canvas from '../../Canvas'


/**
 * 
 * @param {object} param0 
 * @param {object} param0.point
 * @param {number} param0.point.x
 * @param {number} param0.point.y
 * @param {number} param0.radius
 * @param {string=} [param0.color]
 */
const circle = ({ 
    point, 
    size, 
	color = 'black',
	type = circle.types.fill
}) => {
	circle.types[type] ?? (type = circle.types.fill)
	
	Canvas.ctx.beginPath()
    Canvas.ctx.arc(point.x, point.y, size.radius, 0, 2 * Math.PI)
    Canvas.ctx.fillStyle = color
    Canvas.ctx[type]()
}

circle.types = {
	fill: 'fill',
	stroke: 'stroke'
}

circle.form = 'CIRCLE'

export default circle