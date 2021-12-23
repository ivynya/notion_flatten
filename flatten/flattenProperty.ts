
export function flattenProperty(property: any): any {
	if (property && property.constructor === Array)
		if (property.every(p => p.type === "text"))
			return property.map(p => flattenProperty(p).content).join('');
		else return property.map(p => flattenProperty(p));

	switch (property?.type) {
		case undefined:
			return property;
		default:
			return flattenProperty(property[property.type]);
	}
}