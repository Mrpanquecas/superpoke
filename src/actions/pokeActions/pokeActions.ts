import pokeTypes from '../../ActionTypes/pokeTypes';
import {
	FetchPokeFail,
	fetchPokemonSucessPayload,
	FetchPokeStart,
	FetchPokeSuccess,
} from '../../types/types';

export const fetchPokeStart = (): FetchPokeStart => ({
	type: pokeTypes.FETCH_POKE_START,
});

export const fetchPokeFail = (): FetchPokeFail => ({
	type: pokeTypes.FETCH_POKE_FAIL,
});

export const fetchPokeSuccess = (
	payload: fetchPokemonSucessPayload
): FetchPokeSuccess => ({
	type: pokeTypes.FETCH_POKE_SUCCESS,
	payload,
});
