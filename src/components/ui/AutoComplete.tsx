import { Fragment, useCallback, useContext, useEffect, useRef, useState, useTransition } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { IconCheck, IconArrowsUpDown } from '@tabler/icons-react';
import { BaseContext } from '../../App';
import { debounce } from 'lodash-es';
export interface AutoCompleteSchema {
	id: number;
	name: string;
}
export type AutoCompleteDataType = AutoCompleteSchema[];
export interface AutoCompleteProps {
	data: AutoCompleteDataType;
}

// const debounce = (cb: () => void, timeout: number = 0) => {
// 	let time = {
// 		old: Date.now(),
// 	};

// 	return () => {
// 		const diff = Date.now() - time.old;
// 		console.log({ diff, old: time.old });
// 		if (diff > timeout) {
// 			time.old = Date.now();
// 			cb();
// 		}
// 	};
// };
const MyComboBox: React.FC<AutoCompleteProps> = ({ data }) => {
	const { selected, setSelected } = useContext(BaseContext);
	const [query, setQuery] = useState('');
	const [filteredData, setFilteredData] = useState<typeof data>([]);
	const [isPending, startTransition] = useTransition();
	const timer = useRef(0);
	const expensiveFilter = useCallback(
		debounce((qry: string) => {
			console.log('i am executing properly');
			const _filteredData =
				qry === ''
					? data
					: data.filter(satData =>
							satData.name.toLowerCase().replace(/\s+/g, '').includes(qry.toLowerCase().replace(/\s+/g, ''))
					  );
			setFilteredData([..._filteredData]);
		}, 500),
		[data]
	);
	useEffect(() => {
		expensiveFilter(query);
	}, [query]);

	return (
		<div className=' w-72'>
			{isPending ? 'pending' : ''}
			<Combobox value={selected ? selected : {}} onChange={setSelected}>
				<div className='relative mt-1'>
					<div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
						<Combobox.Input
							className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
							displayValue={(satData: AutoCompleteSchema) => (satData ? satData.name : '')}
							onChange={event => {
								setQuery(event.target.value);
							}}
						/>
						<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
							<IconArrowsUpDown className='h-5 w-5 text-gray-400' aria-hidden='true' />
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
						afterLeave={() => {
							setQuery('');
						}}>
						<Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
							{filteredData.length === 0 && query !== '' ? (
								<div className='relative cursor-default select-none py-2 px-4 text-gray-700'>
									Nothing found.
								</div>
							) : (
								filteredData.map(satData => (
									<Combobox.Option
										key={satData.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? 'bg-teal-600 text-white' : 'text-gray-900'
											}`
										}
										value={satData}>
										{({ selected, active }) => (
											<>
												<span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
													{satData.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? 'text-white' : 'text-teal-600'
														}`}>
														<IconCheck className='h-5 w-5' aria-hidden='true' />
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
};

export default MyComboBox;
