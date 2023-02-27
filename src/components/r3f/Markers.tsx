import { useRef, useState, useEffect } from 'react';
import { Object3D } from 'three/src/core/Object3D';
import { getLatLngObj } from 'tle.js';
import { rawTle as rawTle2 } from '../../../gp2';
import { Position, getPosition } from '../../utils/positionHelpers';
import { batchTleToArray } from '../../utils/tleHelpers';
import { invalidate } from '@react-three/fiber';
import { myCustomSatInfo } from '../../utils/parser';
import MyWorker from '../../ww/basicWorker?worker';

const myWorker = new MyWorker();
const Markers = () => {
	const temp3D = useRef(new Object3D());
	const ref = useRef<THREE.InstancedMesh>(null);
	const [tleArr] = useState(batchTleToArray(rawTle2));

	const test_count = useRef(0);
	useEffect(() => {
		if (!ref.current || !tleArr) return;
		myWorker.postMessage(tleArr);
		myWorker.onmessage = event => {
			let oldTs = Date.now();
			if (!ref.current) return;
			let data = event.data as Position[];
			for (let i = 0; i < data.length; i++) {
				const [x, y, z] = data[i] ? data[i] : [0, 0, 0];
				temp3D.current.position.set(x, y, z);
				temp3D.current.updateMatrix();
				ref.current?.setMatrixAt(i, temp3D.current.matrix);
			}
			ref.current.instanceMatrix.needsUpdate = true;
			let diff = Date.now() - oldTs;
			console.log('time', diff);
		};

		// const timeout = 1000;
		// const intervalId = window.setInterval(() => {
		// 	let oldTs = Date.now();
		// 	if (!ref.current) return;

		// 	let ts = Date.now();

		// 	for (let i = 0; i < tleArr.length; i++) {
		// 		try {
		// 			const tle = tleArr[i];
		// 			// const { lat, lng } = getLatLngObj(tle, ts);
		// 			const { lat, lng } = myCustomSatInfo(tle, ts);
		// 			const [x, y, z] = getPosition({
		// 				latitude: lat,
		// 				longitude: lng,
		// 				radius: 100,
		// 			});

		// 			temp3D.current.position.set(x, y, z);
		// 			temp3D.current.updateMatrix();
		// 			ref.current?.setMatrixAt(i, temp3D.current.matrix);
		// 		} catch (error) {
		// 			// console.error(error);
		// 		}

		// 		// something is wrong with 2984 index
		// 	}

		// 	ref.current.instanceMatrix.needsUpdate = true;
		// 	// invalidate();
		// 	let diff = Date.now() - oldTs;
		// 	console.log('time', diff);
		// }, timeout);

		// return () => {
		// 	window.clearInterval(intervalId);
		// };
	}, []);

	return (
		<instancedMesh ref={ref} args={[undefined, undefined, tleArr.length]}>
			<icosahedronGeometry args={[0.5, 3]} />
			<meshBasicMaterial color={'red'} />
		</instancedMesh>
	);
};

export default Markers;
