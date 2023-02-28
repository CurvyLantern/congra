import { useEffect, useRef } from 'react';
import { Object3D } from 'three/src/core/Object3D';
import { useQuery } from '@tanstack/react-query';
import { Position } from '../../utils/positionHelpers';
import MyWorker from '../../ww/basicWorker?worker';

const myWorker = new MyWorker();
const fetcher = async () => {
	const resp = await fetch('http://localhost:8000/v1/tle');
	const data = await resp.json();
	return data;
};
export type fetchType = { sat_name: string; tle: [string, string] }[];
const Markers = () => {
	const { data, isLoading, isError } = useQuery<fetchType>({
		queryKey: ['get_all_tle'],
		queryFn: fetcher,
		staleTime: 1000 * 60 * 60 * 24,
	});

	if (isError || isLoading || !data) {
		return null;
	}

	return <MarkerInstance data={data} />;
};
const MarkerInstance = ({ data }: { data: fetchType }) => {
	const ref = useRef<THREE.InstancedMesh>(null);
	const temp3D = useRef(new Object3D());

	useEffect(() => {
		if (!ref.current) return;
		if (!data) return;
		const listener = (event: MessageEvent<Position[]>) => {
			// let oldTs = Date.now();
			if (!ref.current) return;
			if (!event.data) return;

			let data = event.data;
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
		myWorker.postMessage(data);
		myWorker.addEventListener('message', listener);

		return () => {
			myWorker.removeEventListener('message', listener);
		};
	}, [data]);

	return (
		<instancedMesh ref={ref} args={[undefined, undefined, data.length]}>
			<icosahedronGeometry args={[0.5, 3]} />
			<meshBasicMaterial color={'red'} />
		</instancedMesh>
	);
};

export default Markers;
