import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Lights from './Lights';
import FiberScene from './FiberScene';
import Camera from './Camera';

// const geometry = new THREE.IcosahedronGeometry(0.5, 5);
// const material = new THREE.MeshBasicMaterial({ color: 'red' });
// const Marker = (props: ThreeElements['mesh']) => {
// 	return (
// 		<mesh {...props} geometry={geometry} material={material}>
// 			{/* <icosahedronGeometry args={[.5, 5]} />
//       <meshBasicMaterial color={'red'} /> */}
// 		</mesh>
// 	);
// };

const FiberContainer = () => {
	return (
		<Canvas camera={{ position: [0, 0, 500] }} frameloop='always'>
			<Lights />
			<color attach='background' args={['black']}></color>
			{/* <Environment preset='night' background /> */}
			<FiberScene />
			<Camera />
			<OrbitControls />
			<Perf className='my_perf_container' overClock position={'top-left'} matrixUpdate />
		</Canvas>
	);
};
export default FiberContainer;
