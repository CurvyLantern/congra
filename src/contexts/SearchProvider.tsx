import { createContext, useState } from 'react';

export const SearchContext = createContext({});

interface SearchProviderProps {
	children: React.ReactNode;
}
const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
	const [selectedSat, setSelectedSat] = useState({
		index: -1,
		sat_name: '',
	});
	return (
		<SearchContext.Provider
			value={{
				selectedSat,
				setSelection: (v: typeof selectedSat) => setSelectedSat(v),
			}}>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchProvider;
