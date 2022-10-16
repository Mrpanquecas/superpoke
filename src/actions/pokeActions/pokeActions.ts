import { ThunkAction } from '@reduxjs/toolkit';
import { MainClient, Pokemon } from 'pokenode-ts';
import { AnyAction } from 'redux';
import { pokemonSlice } from '../../features/pokemons/pokemonSlice';
import { RootState } from '../../store/store';

export const pokeActions = pokemonSlice.actions;

export const fetchPokemonList = (
	offset: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		let pokemons: Pokemon[] = [];
		const api = new MainClient();
		try {
			dispatch(pokeActions.setPokemonListStart());
			const response = await api.pokemon.listPokemons(offset, 20);
			return Promise.all(
				response.results.map(async (pokemon) => {
					const result: Pokemon = await api.pokemon.getPokemonByName(
						pokemon.name
					);
					pokemons.push(result);
				})
			).then(() => {
				dispatch(
					pokeActions.setPokemonListSuccess({
						pokemons,
						count: response.count,
						next: response.next,
						previous: response.previous,
					})
				);
			});
		} catch (error) {
			dispatch(pokeActions.setPokemonListFail());
		}
	};
};

export const fetchSpecificPokemon = (
	name: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		const api = new MainClient();
		try {
			dispatch(pokeActions.setPokemonDetailsStart());
			const response = await api.pokemon.getPokemonByName(name);
			dispatch(pokeActions.setPokemonDetailsSuccess(response));
		} catch (error) {
			dispatch(pokeActions.setPokemonDetailsFail());
		}
	};
};
