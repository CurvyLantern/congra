import { useQuery } from '@tanstack/react-query';
import PointsMarkers from './PointsMarkers';
import { SERVER_URL } from '../../utils/constants';

const fetcher = async () => {
	const resp = await fetch(`${SERVER_URL}/v1/tle`);
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

	return <PointsMarkers data={data} />;
};

export default Markers;
