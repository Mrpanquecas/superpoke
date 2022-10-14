import pokeTypes from '../ActionTypes/pokeTypes';
import { PokeActions, PokeState } from '../types/types';

const initialstate: PokeState = {
	loading: false,
	pokemons: [],
	error: false,
};

export const pokeReducer = (state = initialstate, action: PokeActions) => {
	switch (action.type) {
		case pokeTypes.FETCH_POKE_START:
			return {
				...state,
				loading: true,
			};
		case pokeTypes.FETCH_POKE_FAIL:
			return {
				...state,
				loading: false,
				pokemons: [],
				error: true,
			};
		case pokeTypes.FETCH_POKE_SUCCESS:
			return {
				...state,
				loading: false,
				pokemons: action.payload.pokemons,
				count: action.payload.count,
				next: action.payload.next,
				previous: action.payload.previous,
			};

		default:
			return {
				...state,
			};
	}
};
