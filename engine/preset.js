export default {
    canvas: {
        scale: .5
	},
	physics: {
		constants: {
			g: 9.82
		},
		speed: 1/4,
		entityOutOfBoundsTolerance: 100
	},
	text: {
		font: {
			family: "Arial",
			size: {
				number: 15,
				scale: {
					max: 3,
					min: 1
				},
				unit: "px"
			},
		},
		color: "black",
		alignment: "left",
		additionalStyling: [
			"bold"
		]
	},
}