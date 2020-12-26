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
    radius, 
    color = 'black' 
}) => {
    Canvas.ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI)
    
    Canvas.ctx.stroke()
    Canvas.ctx.fillStyle = color
    Canvas.ctx.fill()
}

export default circle