import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Object3D } from 'three';
import { Position } from '../../utils/positionHelpers';
import MyWorker from '../../ww/basicWorker?worker';
import { fetchType } from './Markers';

const myWorker = new MyWorker();

const PointsMarkers = ({ data }: { data: fetchType }) => {
	const ref = useRef<THREE.Points | null>(null);
	const temp3D = useRef(new Object3D());
	const geom = useRef<THREE.BufferGeometry | null>(null);
	// const { selected } = useContext(BaseContext);

	// console.log({ selected });

	useEffect(() => {
		if (!ref.current) return;
		if (!data) return;
		console.log(ref.current, 'first');
		const listener = (event: MessageEvent<Position[]>) => {
			// let oldTs = Date.now();
			if (!ref.current) return;
			if (!event.data) return;

			let data = event.data;
			// let vertices = [];
			//@ts-ignore;
			let vertices = geom.current?.attributes.position?.array;
			// console.log(vertices);
			for (let i = 0; i < data.length; i++) {
				const [x, y, z] = data[i] ? data[i] : [0, 0, 0];
				if (vertices) {
					const vIdx = i * 3;
					vertices[vIdx] = x;
					vertices[vIdx + 1] = y;
					vertices[vIdx + 2] = z;
				}
			}
			geom.current && (geom.current.attributes.position.needsUpdate = true);
			// geom.current?.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
			// // let diff = Date.now() - oldTs;
			// // console.log('time', diff);
		};
		myWorker.postMessage(data);
		myWorker.addEventListener('message', listener);

		return () => {
			myWorker.removeEventListener('message', listener);
		};
	}, [data]);

	return (
		<points ref={ref} args={[undefined, undefined]}>
			{/* <icosahedronGeometry args={[0.5, 3]} /> */}
			{/* <planeGeometry args={[1, 1]} /> */}
			<bufferGeometry ref={geom}>
				<float32BufferAttribute
					args={[Array(data.length * 3).fill(0), 3]}
					attach='attributes-position'></float32BufferAttribute>
			</bufferGeometry>
			<pointsMaterial color={'red'} size={2} sizeAttenuation={true} />
		</points>
	);
};
export default PointsMarkers;
