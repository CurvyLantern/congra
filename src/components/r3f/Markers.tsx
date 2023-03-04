import { useEffect, useRef, useState } from 'react';
import { Object3D } from 'three/src/core/Object3D';
import * as THREE from 'three';
import { useQuery } from '@tanstack/react-query';
import { Position } from '../../utils/positionHelpers';
import MyWorker from '../../ww/basicWorker?worker';
import { Instances, Instance } from '@react-three/drei';
import PointsMarkers from './PointsMarkers';
import { pack, unpack } from 'msgpackr';
import { encode, decode } from '@msgpack/msgpack';
//@ts-ignore
import msgPackLite from 'msgpack-lite';

const iterCount = 10;
const trackMsg1 = (obj: any) => {
	return new Promise(resolve => {
		const old = performance.now();
		for (let i = 0; i < iterCount; i++) {
			JSON.stringify(obj);
		}
		const diff = performance.now() - old;
		console.log({ normal: diff });
		resolve(obj);
	});
};
const trackMsg2 = (obj: any) => {
	return new Promise(resolve => {
		const old = performance.now();
		for (let i = 0; i < iterCount; i++) {
			pack(obj);
		}
		const diff = performance.now() - old;
		console.log({ modern: diff });
		resolve(obj);
	});
};

const trackMsg3 = (obj: any) => {
	return new Promise(resolve => {
		const old = performance.now();
		for (let i = 0; i < iterCount; i++) {
			encode(obj);
		}
		const diff = performance.now() - old;
		console.log({ modern2: diff });
		resolve(obj);
	});
};
const trackMsgLite = (obj: any) => {
	return new Promise(resolve => {
		const old = performance.now();
		for (let i = 0; i < iterCount; i++) {
			msgPackLite.encode(obj);
		}
		const diff = performance.now() - old;
		console.log({ modernLite: diff });
		resolve(obj);
	});
};
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
	trackMsg1(data);
	// .then(d => trackMsg2(d))
	// .then(d => trackMsg3(d));

	return <PointsMarkers data={data} />;
	// return <MarkerInstance data={data} />;
	// return <MarkerInstanceDrei data={data} />;
};
const MarkerInstance = ({ data }: { data: fetchType }) => {
	const ref = useRef<THREE.InstancedMesh>(null);
	const temp3D = useRef(new Object3D());

	useEffect(() => {
		if (!ref.current) return;
		if (!data) return;
		console.log(ref.current, 'first');
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
			{/* <icosahedronGeometry args={[0.5, 3]} /> */}
			<planeGeometry args={[1, 1]} />
			<meshBasicMaterial color={'red'} />
		</instancedMesh>
	);
};

const MarkerInstanceDrei = ({ data }: { data: fetchType }) => {
	console.log('how many times am I getting logged');
	// const filteredData = data.filter(Boolean);
	const ref = useRef<THREE.InstancedMesh | null>(null);
	useEffect(() => {
		if (!data) return;
		console.log(ref.current, 'second');
		const temp3D = new Object3D();

		const listener = (event: MessageEvent<Position[]>) => {
			// let oldTs = Date.now();
			if (!event.data) return;
			if (!ref.current) return;

			let data = event.data;

			for (let i = 0; i < data.length; i++) {
				const [x, y, z] = data[i] ? data[i] : [0, 0, 0];
				// temp3D.position.set(pos[0], pos[1], pos[2]);
				// temp3D.updateMatrix();
				// ref.current.setMatrixAt(i, temp3D.matrix);
				ref.current.children[i].position.set(x, y, z);
			}

			// ref.current.instanceMatrix.needsUpdate = true;
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
		<Instances
			limit={data.length} // Optional: max amount of items (for calculating buffer size)
			ref={ref}
			onClick={evt => {
				console.log(evt);
			}}>
			<boxGeometry />
			<meshStandardMaterial />
			{/* rotation={[Math.PI / 3, 0, 0]} */}
			{data.map((p, idx) => {
				return <Instance key={idx} color='red' scale={1} />;
				// return <Instance key={idx} color='red' scale={2} position={p} />;
			})}
		</Instances>
	);
};

export default Markers;
