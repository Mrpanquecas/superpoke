import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Pokemon } from 'pokenode-ts';
import { fetchPokeStart } from './actions/pokeActions/pokeActions';
import { RootState } from './reducers/rootReducer';
import PokeCard from './components/PokeCard';

const App = () => {
	const dispatch = useDispatch();
	const { loading, error, pokemons } = useSelector(
		(state: RootState) => state.pokemons
	);

	useEffect(() => {
		dispatch(fetchPokeStart());
	}, []);

	if (error) {
		<div>An error occurred, please try again later</div>;
	}
	if (loading) {
		<div>Loading pokemons...</div>;
	}

	return (
		<div className="flex justify-center">
			<div className="container grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
				{pokemons?.map((poke: Pokemon) => (
					<PokeCard key={poke.name} pokemon={poke} />
				))}
			</div>
		</div>
	);
};

export default App;
