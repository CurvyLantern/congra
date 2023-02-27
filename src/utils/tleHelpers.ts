const trim = (s: string) => s.trim();

export const batchTleToArray = (rawTle: string) => {
	let tleArr = rawTle.split('\n').map(s => s.trim());
	const arr: Array<[string, string]> = [];
	for (let i = 0, len = tleArr.length; i < len; i += 3) {
		let idx = i;
		let satellite_name = tleArr[idx];
		let first = tleArr[idx + 1];
		let second = tleArr[idx + 2];
		// let str = `${satellite_name}
		// ${first}
		// ${second}`;
		// let str = [satellite_name, first, second].join('\n');
		arr.push([first, second]);
	}
	// console.log(arr[arr.length - 1], 'len');

	return arr;
};
