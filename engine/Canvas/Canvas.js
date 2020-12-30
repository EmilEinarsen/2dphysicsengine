import preset from '../preset'

export default function Canvas({ id, settings }) {
    Canvas.element = document.getElementById(id)
    Canvas.ctx = canvas.getContext('2d')
    
    const {
        height = () => Canvas.element.parentElement.offsetHeight,
        width = () => Canvas.element.parentElement.offsetWidth
    } = settings

    if(!Canvas.element) {
        console.log('no canvas')
        return
	}

    Canvas.element.height = height()
    Canvas.element.width = width()
    Canvas.ctx.scale(preset.canvas.scale, preset.canvas.scale)
}