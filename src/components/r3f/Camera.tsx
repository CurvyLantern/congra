import { PerspectiveCamera } from '@react-three/drei';
import { camera_init_pos } from '../../utils/constants';
import { useControls } from 'leva';
const Camera = () => {
	const { far } = useControls({
		far: {
			value: 500,
			min: -5000,
			max: 5000,
			step: 10,
		},
	});
	return <PerspectiveCamera makeDefault position={camera_init_pos} far={far} />;
};
export default Camera;
