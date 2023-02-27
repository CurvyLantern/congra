import { getPosition } from '../../utils/positionHelpers';
import Earth from './Earth';
import Markers from './Markers';

const bd_coords = {
	lat: 23.777176,
	long: 90.399452,
};
const taj_coords = {
	lat: 27.1751,
	long: 78.0421,
};
const FiberScene = () => {
	// const pos = getPosition({
	// 	latitude: bd_coords.lat,
	// 	longitude: bd_coords.long,
	// 	radius: 100,
	// });
	return (
		<>
			<Earth position={[0, 0, 0]} />
			{/* <mesh position={[...pos]}>
				<meshBasicMaterial color='red'></meshBasicMaterial>
				<boxGeometry args={[1, 1, 1]}></boxGeometry>
			</mesh> */}
			<Markers />
		</>
	);
};

export default FiberScene;
