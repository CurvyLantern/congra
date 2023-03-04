/// <reference lib="webworker" />

import { myCustomSatInfo } from '../utils/parser';
import { getPosition } from '../utils/positionHelpers';
import { intervalTimer } from '../utils/constants';
import { fetchType } from '../components/r3f/Markers';
function getPercentage(number: number, total: number) {
	return (number / total) * 100;
}
function cutPercentage(total: number, percent: number) {
	return (total * percent) / 100;
}

let intervalId = 0;
const earthRad = 6371; // in km
const main = (tleData: fetchType) => {
	clearInterval(intervalId);
	intervalId = setInterval(() => {
		let ts = Date.now();
		const data = [];
		data.length = tleData.length;
		for (let i = 0; i < tleData.length; i++) {
			try {
				const { tle } = tleData[i];
				// const { lat, lng } = getLatLngObj(tle, ts);
				const { lat, lng, height } = myCustomSatInfo(tle, ts);
				let heightPercentage = getPercentage(height, earthRad);
				let transformedHeight = cutPercentage(100, heightPercentage);
				data[i] = getPosition({
					latitude: lat,
					longitude: lng,
					radius: 100 + transformedHeight,
				});
			} catch (error) {
				//console.error(error);
			}
		}
		postMessage(data);
		const diff = Date.now() - ts;
		// console.log('time takes ', diff);
	}, intervalTimer);
};

onmessage = (event: MessageEvent<fetchType>) => {
	main(event.data);
};
