import { twoline2satrec, propagate, degreesLong, degreesLat, gstime, eciToGeodetic } from 'satellite.js';

export const MyCustomTleParserLight = (sourceTLE: [string, string]) => {
	if (!Array.isArray(sourceTLE) || sourceTLE.length < 2)
		throw new Error('source tle is not valid, please check the input for custom parsing tle');

	const tle = sourceTLE.map(line => line.trim());

	return {
		tle,
	};
};

const defaultObserverPosition = {
	lat: 36.9613422,
	lng: -122.0308,
	height: 0.37,
};
let _DEFAULT: 'Problematic TLE with unknown error.';
const _SAT_REC_ERRORS = [
	'Mean elements, ecc >= 1.0 or ecc < -0.001 or a < 0.95 er',
	'Mean motion less than 0.0',
	'Pert elements, ecc < 0.0  or  ecc > 1.0',
	'Semi-latus rectum < 0.0',
	'Epoch elements are sub-orbital',
	'Satellite has decayed',
];
export function myCustomSatInfo(rawTLE: [string, string], rawTimestamp: number) {
	const timestamp = rawTimestamp || Date.now();
	const { tle } = MyCustomTleParserLight(rawTLE);
	// Initialize a satellite record
	const satrec = twoline2satrec(tle[0], tle[1]);
	if (satrec.error) {
		throw new Error(_SAT_REC_ERRORS[satrec.error] || _DEFAULT);
	}

	const dateObj = new Date(timestamp);

	// Propagate SGP4.
	const positionAndVelocity = propagate(satrec, dateObj);

	// The position_velocity result is a key-value pair of ECI coordinates.
	// These are the base results from which all other coordinates are derived.
	const positionEci = positionAndVelocity.position;
	// Get GMST for some coordinate transforms.
	// http://en.wikipedia.org/wiki/Sidereal_time#Definition
	const gmst = gstime(dateObj);

	// Geodetic coords are accessed via `longitude`, `latitude`, `height`.
	if (typeof positionEci === 'boolean') throw new Error('why is this positionEci boolean');
	const { longitude, latitude, height } = eciToGeodetic(positionEci, gmst);

	const output = {
		lng: degreesLong(longitude),
		lat: degreesLat(latitude),
		height,
	};

	return output;
}
