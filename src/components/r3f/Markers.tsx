import { useEffect, useRef, useState } from 'react';
import { Object3D } from 'three/src/core/Object3D';
import { rawTle as rawTle2 } from '../../../gp2';
import { Position } from '../../utils/positionHelpers';
import { batchTleToArray } from '../../utils/tleHelpers';
import MyWorker from '../../ww/basicWorker?worker';

const myWorker = new MyWorker();
const Markers = () => {
	const temp3D = useRef(new Object3D());
	const ref = useRef<THREE.InstancedMesh>(null);
	const [tleArr] = useState(batchTleToArray(rawTle2));

	useEffect(() => {
		if (!ref.current || !tleArr) return;
		myWorker.postMessage(tleArr);
		myWorker.onmessage = event => {
			// let oldTs = Date.now();
			if (!ref.current) return;
			let data = event.data as Position[];
			for (let i = 0; i < data.length; i++) {
				const [x, y, z] = data[i] ? data[i] : [0, 0, 0];
				temp3D.current.position.set(x, y, z);
				temp3D.current.updateMatrix();
				ref.current?.setMatrixAt(i, temp3D.current.matrix);
			}
			ref.current.instanceMatrix.needsUpdate = true;
			// let diff = Date.now() - oldTs;
			// console.log('time', diff);
		};
	}, []);

	return (
		<instancedMesh ref={ref} args={[undefined, undefined, tleArr.length]}>
			<icosahedronGeometry args={[0.5, 3]} />
			<meshBasicMaterial color={'red'} />
		</instancedMesh>
	);
};

export default Markers;
