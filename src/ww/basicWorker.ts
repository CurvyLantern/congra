/// <reference lib="webworker" />

import { myCustomSatInfo } from '../utils/parser';
import { getPosition } from '../utils/positionHelpers';

let intervalId = 0;
let timeout = 1000;
const main = (tleArr: [string, string][]) => {
	clearInterval(intervalId);
	intervalId = setInterval(() => {
		let ts = Date.now();
		const data = [];
		data.length = tleArr.length;
		for (let i = 0; i < tleArr.length; i++) {
			try {
				const tle = tleArr[i];
				// const { lat, lng } = getLatLngObj(tle, ts);
				const { lat, lng } = myCustomSatInfo(tle, ts);
				data[i] = getPosition({
					latitude: lat,
					longitude: lng,
					radius: 100,
				});
			} catch (error) {
				//console.error(error);
			}
		}
		postMessage(data);
	}, timeout);
};

onmessage = (event: MessageEvent<[string, string][]>) => {
	main(event.data);
};
