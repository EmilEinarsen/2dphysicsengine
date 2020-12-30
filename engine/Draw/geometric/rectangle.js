import Canvas from '../../Canvas'


/**
 * @param {object} param0 
 * @param {object} param0.point
 * @param {number} param0.point.x
 * @param {number} param0.point.y
 * @param {object} param0.size
 * @param {number} param0.size.height
 * @param {number} param0.size.width
 * @param {string=} [param0.color]
 * @param {string=} [param0.type]
 */
const rectangle = ({ 
    point,
    size,
    color = 'black',
    type = rectangle.types.fill
}) => {
	rectangle.types[type] ?? (type = rectangle.types.fill)

    Canvas.ctx.beginPath()
    Canvas.ctx.rect(point.x, point.y, size.width, size.height)
    Canvas.ctx.fillStyle = color 
    Canvas.ctx[type]()
}

rectangle.types = {
	fill: 'fill',
	stroke: 'stroke'
}

rectangle.form = 'RECTANGLE'

export default rectangle