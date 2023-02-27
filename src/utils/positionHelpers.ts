export type Position = [number, number, number];
const { PI, sin, cos } = Math;
export const getPosition = ({
	latitude,
	longitude,
	radius,
}: {
	latitude: number;
	longitude: number;
	radius: number;
}): Position => {
	// const earthRadius = 6371; // in km
	let radian = PI / 180;
	const phi = -(90 - latitude) * radian;
	const theta = (longitude + 180) * radian;
	const x = -radius * sin(phi) * cos(theta);
	const y = radius * cos(phi);
	const z = radius * sin(phi) * sin(theta);
	return [x, y, z];
};
// var phi   = (90-lat)*(Math.PI/180);
//     var theta = (lon+180)*(Math.PI/180);
