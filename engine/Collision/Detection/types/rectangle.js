const rectangle = (ent0, ent1) =>
	(ent0.x + ent0.size.width >= ent1.x && ent0.x <= ent1.x + ent1.size.width)
	&& ent0.y + ent0.size.height >= ent1.y && ent0.y <= ent1.y + ent1.size.height

export default rectangle