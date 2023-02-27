import { useTexture } from '@react-three/drei';
import { ThreeElements } from '@react-three/fiber';

const Earth = (props: ThreeElements['mesh']) => {
	const texture = useTexture('/earth2.jpg');
	return (
		<mesh {...props}>
			<icosahedronGeometry args={[100, 5]} />
			<meshStandardMaterial map={texture} />
		</mesh>
	);
};

export default Earth;
