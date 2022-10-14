import pokeTypes from '../ActionTypes/pokeTypes';
import { Pokemon } from 'pokenode-ts';

export interface fetchPokemonSucessPayload {
	pokemons: Pokemon[];
	count: number;
	next?: string | undefined;
	previous?: string | undefined;
}

export interface ApiResource {
	name: string;
	url: string;
}

export interface PokeState {
	loading: boolean;
	error: boolean;
	pokemons: Pokemon[];
}

export interface FetchPokeStart {
	type: typeof pokeTypes.FETCH_POKE_START;
}

export interface FetchPokeFail {
	type: typeof pokeTypes.FETCH_POKE_FAIL;
}

export interface FetchPokeSuccess {
	type: typeof pokeTypes.FETCH_POKE_SUCCESS;
	payload: fetchPokemonSucessPayload;
}

export type PokeActions = FetchPokeStart | FetchPokeFail | FetchPokeSuccess;
