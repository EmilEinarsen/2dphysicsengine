import rectanglePoint from './types/rectanglePoint'
import circle from './types/circle'
import rectangle from './types/rectangle'
import { getPointsOfRectangle } from '../../Calculations'
import circleRectangle from './types/circleRectangle'

function Detection(ent0, ent1, type) {

	return isIntersection(ent0, ent1, type)
	
}

const isIntersection = (ent0, ent1, type) => 
	type === Detection.types.RECTANGLE_POINT || Detection.types.POINT_RECTANGLE ?
		getPointsOfRectangle(ent.a).forEach(point => {
			
			return rectanglePoint(...getPointsOfRectangle(ent.b), point) 

		})
	: type === Detection.types.CIRCLE_CIRCLE ?
		circle(ent0, ent1)
	: type === Detection.types.RECTANGLE_RECTANGLE ?
		rectangle(ent0, ent1)
	: type === Detection.types.CIRCLE_RECTANGLE || Detection.types.RECTANGLE_CIRCLE ?
		circleRectangle(ent0, ent1)
	: false

Detection.types = {
	CIRCLE_CIRCLE: 'CIRCLE_CIRCLE',
	RECTANGLE_RECTANGLE: 'RECTANGLE_RECTANGLE',
	CIRCLE_RECTANGLE: 'CIRCLE_RECTANGLE',
	RECTANGLE_CIRCLE: 'RECTANGLE_CIRCLE',
	POINT_POINT: 'POINT_POINT',
	CIRCLE_POINT: 'CIRCLE_POINT',
	POINT_CIRCLE: 'POINT_CIRCLE',
	RECTANGLE_POINT: 'RECTANGLE_POINT',
}

export default Detection