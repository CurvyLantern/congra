import { createContext } from 'react';
import FiberContainer from './components/r3f/FiberContainer';
import './App.css';
// export const SateliteContext = createContext<{
// 	data: any[];
// }>({
// 	data: [],
// });

const App = () => {
	return (
		<div className='wrapper'>
			<aside className='sidebar'></aside>
			<main className='three_wrapper'>
				<FiberContainer />
			</main>
		</div>
	);
};

export default App;
