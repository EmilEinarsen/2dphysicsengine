import { meterToPixel } from './Formulas'
import Canvas from '../Canvas'
import preset from '../preset'

export const distance = (v, t) => {
    t = t / 1000
    v = meterToPixel(v)

    return v * t
}

export const getCanvasSize = () => ({
    height: Canvas.element.height / preset.canvas.scale,
    width: Canvas.element.width / preset.canvas.scale
})