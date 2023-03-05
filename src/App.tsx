import { createContext, lazy, useEffect, useState } from 'react';
// import FiberContainer from './components/r3f/FiberContainer';
import './App.css';
import MyComboBox, { AutoCompleteDataType, AutoCompleteSchema } from './components/ui/AutoComplete';
import { useQuery } from '@tanstack/react-query';
import { SERVER_URL } from './utils/constants';
// export const SateliteContext = createContext<{
// 	data: any[];
// }>({
// 	data: [],
// });

export const BaseContext = createContext<{
	selected: AutoCompleteSchema | undefined;
	setSelected: (s: AutoCompleteSchema) => void;
}>({
	selected: undefined,
	setSelected: s => {},
});
const FiberContainer = lazy(() =>
	import('./components/r3f/FiberContainer').then(m => ({
		default: m.default,
	}))
);
const App = () => {
	const { data, isLoading, isError } = useQuery<string[]>({
		queryKey: ['combobox_sat_names'],
		queryFn: async () => {
			const res = await fetch(`${SERVER_URL}/v1/info/satellite`);
			return await res.json();
		},
	});
	const [comboData, setComboData] = useState<AutoCompleteDataType>([]);
	useEffect(() => {
		const noData = isLoading || isError || !data;
		if (!noData) {
			const transformed: AutoCompleteDataType = data.map((name, idx) => ({
				id: idx,
				name,
			}));
			setComboData(transformed);
		}
	}, [isLoading, isError, data]);
	const [selected, setSelected] = useState<AutoCompleteSchema>();
	return (
		<BaseContext.Provider
			value={{
				selected,
				setSelected: data => setSelected(data),
			}}>
			<div className='wrapper'>
				<aside className='sidebar'>
					<div className='search_wrapper'>
						<MyComboBox data={comboData} />
						<button>search</button>
					</div>
				</aside>
				<main className='three_wrapper'>
					<FiberContainer />
				</main>
			</div>
		</BaseContext.Provider>
	);
};

export default App;
