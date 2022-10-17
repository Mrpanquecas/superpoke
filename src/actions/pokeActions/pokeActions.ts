import { ThunkAction } from "@reduxjs/toolkit";
import { MainClient, Pokemon, PokemonClient } from "pokenode-ts";
import { AnyAction } from "redux";
import { pokemonSlice } from "../../features/pokemons/pokemonSlice";
import { RootState } from "../../store/store";

export const pokeActions = pokemonSlice.actions;

export const fetchPokemonList = (
	offset: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
	return async (dispatch) => {
		let pokemons: Pokemon[] = [];
		const api = new PokemonClient();
		try {
			dispatch(pokeActions.setPokemonListStart());
			const response = await api.listPokemons(offset, 20);
			return Promise.allSettled(
				response.results.map(async (pokemon) => {
					const result: Pokemon = await api.getPokemonByName(pokemon.name);
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
		const api = new PokemonClient();
		try {
			dispatch(pokeActions.setPokemonDetailsStart());
			const response = await api.getPokemonByName(name);
			dispatch(pokeActions.setPokemonDetailsSuccess(response));
		} catch (error) {
			dispatch(pokeActions.setPokemonDetailsFail());
		}
	};
};

export const fetchAllPokemonNames = (): ThunkAction<
	void,
	RootState,
	unknown,
	AnyAction
> => {
	return async (dispatch) => {
		const api = new PokemonClient();
		try {
			dispatch(pokeActions.setAllPokemonNamesStart());
			const response = await api.listPokemons(0, 10000);
			dispatch(pokeActions.setAllPokemonNamesSuccess(response.results));
		} catch (error) {
			dispatch(pokeActions.setAllPokemonNamesFail());
		}
	};
};

export const fetchAllAbilities = (): ThunkAction<
	void,
	RootState,
	unknown,
	AnyAction
> => {
	return async (dispatch) => {
		const api = new MainClient();
		try {
			const response = await api.pokemon.listAbilities(0, 10000);
		} catch (error) {}
	};
};
