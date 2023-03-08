import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Lights from './Lights';
import FiberScene from './FiberScene';
import Camera from './Camera';
import { isDevMode } from '../../utils/commonHelpers';

const FiberContainer = () => {
	return (
		<div className='absolute top-0 left-0 w-full h-full'>
			<Canvas camera={{ position: [0, 0, 500] }} frameloop='always'>
				<Lights />
				<color attach='background' args={['black']}></color>
				{/* <Environment preset='night' background /> */}
				<FiberScene />
				<Camera />
				<OrbitControls />
				{isDevMode() && (
					<Perf
						className='r3f_perf r3f_perf--custom'
						overClock
						showGraph={false}
						position={'top-left'}
						matrixUpdate
					/>
				)}
			</Canvas>
		</div>
	);
};
export default FiberContainer;
