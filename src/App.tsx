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

	console.log();
	if (error) {
		<div>An error occurred, please try again later</div>;
	}
	if (loading) {
		<div>Loading pokemons...</div>;
	}

	return (
		<div className="flex justify-center">
			<div className="container grid grid-cols-4">
				{pokemons?.map((poke: Pokemon) => (
					<div key={poke.name}>
						<PokeCard pokemon={poke} />
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
