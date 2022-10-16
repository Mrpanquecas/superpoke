import React, { useEffect, useState } from 'react';
import './App.css';
import { NamedAPIResource } from 'pokenode-ts';
//import { fetchPokeStart } from './actions/pokeActions/pokeActions';
import PokeCard from './components/PokeCard';
import { useGetPokemonsQuery } from './services/pokeapi';

const App = () => {
	const [queryParams, setQueryParams] = useState('offset=0&limit=20');
	const { data, error, isLoading } = useGetPokemonsQuery(queryParams);

	useEffect(() => {}, []);

	const handlePrevious = (previous: string | undefined | null) => {
		if (!previous) return;
		setQueryParams(previous.split('?')[1]);
	};

	const handleNext = (next: string | undefined | null) => {
		if (!next) return;
		setQueryParams(next.split('?')[1]);
	};

	if (error) {
		return <div>An error occurred, please try again later</div>;
	}
	if (isLoading) {
		return <div>Loading pokemons...</div>;
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="container grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols2 grid-cols-1">
				{data?.results?.map((pokemon: NamedAPIResource) => (
					<PokeCard key={pokemon.name} pokemon={pokemon} />
				))}
			</div>
			<div>
				<button
					// class concatenation is easier to read using a tool like
					// classnames. For sake of simplicity I'm using string interpolation
					className={`p-2 rounded-sm ${
						!data?.previous ? 'bg-gray-300' : 'bg-blue-300'
					}`}
					disabled={!data?.previous}
					onClick={() => handlePrevious(data?.previous)}
				>
					Prev
				</button>
				<button
					className={`ml-2 p-2 rounded-sm ${
						!data?.next ? 'bg-gray-300' : 'bg-blue-300'
					}`}
					disabled={!data?.next}
					onClick={() => handleNext(data?.next)}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default App;
