import circle from './geometric/circle'
import rectangle from './geometric/rectangle'
import text from './text'

export default function Draw({
	form,
    ...properties
}) {
	
	Draw[form.type]({ ...form, ...properties })

}

Object.assign(Draw, {
	[circle.form]: circle,
	[rectangle.form]: rectangle
})

Draw.forms = {
	[circle.form]: circle.form,
	[rectangle.form]: rectangle.form
}

Draw.text = text

