import { lazy } from 'react';
// import FiberContainer from './components/r3f/FiberContainer';
import './App.css';
import Leftbar from './components/Sidebar/Leftbar';
import SearchProvider from './contexts/SearchProvider';

const FiberContainer = lazy(() =>
	import('./components/r3f/FiberContainer').then(m => ({
		default: m.default,
	}))
);

const App = () => {
	// const { data, isLoading, isError } = useQuery<string[]>({
	// 	queryKey: ['combobox_sat_names'],
	// 	queryFn: async () => {
	// 		const res = await fetch(`${SERVER_URL}/v1/info/satellite`);
	// 		return await res.json();
	// 	},
	// });

	return (
		<SearchProvider>
			<div className='flex'>
				<div className='h-screen pt-6'>
					<Leftbar />
				</div>
				<div className='h-screen w-full container overflow-hidden'>
					<FiberContainer />
				</div>
			</div>
		</SearchProvider>
	);
};

export default App;
