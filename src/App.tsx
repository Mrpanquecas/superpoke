import React, { useEffect } from 'react';
import './App.css';
import { Pokemon } from 'pokenode-ts';
import PokeCard from './components/PokeCard';
import { fetchPokemonList } from './actions/pokeActions/pokeActions';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';

const App = () => {
	const dispatch = useAppDispatch();
	const { pokemons, loading, error, next, previous } = useAppSelector(
		(state) => state.pokemons
	);

	useEffect(() => {
		dispatch(fetchPokemonList(0));
	}, []);

	const handlePrevious = (previous: string | undefined | null) => {
		if (!previous) return;
		// why?
		// unfortunately when I started I was not aware I was not going to be able to simply
		// pass the next/previous string to the api wrapper I am using here
		// so I extract only the offset. Ideally it would not be needed
		const queryParams = new URLSearchParams(previous.split('?')[1]);
		dispatch(fetchPokemonList(Number(queryParams.get('offset'))));
	};

	const handleNext = (next: string | undefined | null) => {
		if (!next) return;
		// why?
		// unfortunately when I started I was not aware I was not going to be able to simply
		// pass the next/previous string to the api wrapper I am using here
		// so I extract only the offset. Ideally it would not be needed
		const queryParams = new URLSearchParams(next.split('?')[1]);
		dispatch(fetchPokemonList(Number(queryParams.get('offset'))));
	};

	if (error) {
		return <div>An error occurred, please try again later</div>;
	}
	if (loading) {
		return <div>Loading pokemons...</div>;
	}

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="container grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols2 grid-cols-1">
				{pokemons?.map((pokemon: Pokemon) => (
					<PokeCard key={pokemon.name} pokemon={pokemon} />
				))}
			</div>
			<div>
				<button
					aria-label="previous"
					// class concatenation is easier to read using a tool like
					// classnames. For sake of simplicity I'm using string interpolation
					className={`p-2 rounded-sm ${
						!previous ? 'bg-gray-300' : 'bg-blue-300'
					}`}
					disabled={!previous}
					onClick={() => handlePrevious(previous)}
				>
					Prev
				</button>
				<button
					aria-label="next"
					className={`ml-2 p-2 rounded-sm ${
						!next ? 'bg-gray-300' : 'bg-blue-300'
					}`}
					disabled={!next}
					onClick={() => handleNext(next)}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default App;
