import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Pokemon } from 'pokenode-ts';
import { fetchPokeStart } from './actions/pokeActions/pokeActions';
import { RootState } from './reducers/rootReducer';
import PokeCard from './components/PokeCard';

const App = () => {
	const dispatch = useDispatch();
	const { loading, error, pokemons, next, previous } = useSelector(
		(state: RootState) => state.pokemons
	);

	useEffect(() => {
		dispatch(fetchPokeStart(0));
	}, []);

	const handlePrevious = (previous: string | undefined) => {
		if (!previous) return;

		// why?
		// unfortunately when I started I was not aware I was not going to be able to simply
		// pass the next/previous string to the api wrapper I am using here
		// so I extract only the offset. Ideally it would not be needed
		const queryParams = new URLSearchParams(previous.split('?')[1]);
		dispatch(fetchPokeStart(Number(queryParams.get('offset'))));
	};

	const handleNext = (next: string | undefined) => {
		if (!next) return;

		// why?
		// unfortunately when I started I was not aware I was not going to be able to simply
		// pass the next/previous string to the api wrapper I am using here
		// so I extract only the offset. Ideally it would not be needed
		const queryParams = new URLSearchParams(next.split('?')[1]);
		dispatch(fetchPokeStart(Number(queryParams.get('offset'))));
	};

	console.log(loading);

	if (error) {
		return <div>An error occurred, please try again later</div>;
	}
	if (loading) {
		return <div>Loading pokemons...</div>;
	}

	return (
		<div className="flex flex-col justify-center">
			<div className="container grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols2 grid-cols-1">
				{pokemons?.map((poke: Pokemon) => (
					<PokeCard key={poke.name} pokemon={poke} />
				))}
			</div>
			<div>
				<button disabled={!previous} onClick={() => handlePrevious(previous)}>
					Prev
				</button>
				<button disabled={!next} onClick={() => handleNext(next)}>
					Next
				</button>
			</div>
		</div>
	);
};

export default App;
