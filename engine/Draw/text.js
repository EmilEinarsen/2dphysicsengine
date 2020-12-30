import preset from '../preset'
import Canvas from '../Canvas'

export default function text(text, x, y) {
	style()

	Canvas.ctx.fillText(text, x, (y - preset.text.font.size.number))
}

text.form = 'TEXT'

const style = () => {
	Canvas.ctx.font = `
		${preset.text.additionalStyling.join(' ')} 
		${fontSize()}${preset.text.font.size.unit} 
		${preset.text.font.family} 
	`,
	Canvas.ctx.fillStyle = preset.text.color,
	Canvas.ctx.textAlign = preset.text.alignment
}

const fontSize = () => {
	let size = preset.text.font.size.number / preset.canvas.scale

	size = 
		// Checks for max font-size
		size > preset.text.font.size.number * preset.text.font.size.scale.max
		? preset.text.font.size.number * preset.text.font.size.scale.max

		// Checks for min font-size
		: size < preset.text.font.size.number  * preset.text.font.size.scale.min
		? preset.text.font.size.number 
		
		: size
	
	return size
}