import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';

export interface PokeState {
	loading: boolean;
	error: boolean;
	pokemons: Pokemon[];
	pokemonDetails: Pokemon | undefined;
	previous: string | undefined;
	next: string | undefined;
}
const initialState: PokeState = {
	loading: false,
	pokemons: [],
	error: false,
	pokemonDetails: undefined,
	previous: undefined,
	next: undefined,
};

export const pokemonSlice = createSlice({
	name: 'pokemons',
	initialState,
	reducers: {
		setPokemonListFail: (state) => {
			state.error = true;
			state.loading = false;
			state.pokemons = [];
		},
		setPokemonListStart: (state) => {
			state.loading = true;
		},
		setPokemonListSuccess: (state, action) => {
			state.pokemons = action.payload.pokemons;
			state.previous = action.payload.previous;
			state.next = action.payload.next;
			state.loading = false;
		},
		setPokemonDetailsStart: (state) => {
			state.loading = true;
		},
		setPokemonDetailsFail: (state) => {
			state.loading = false;
			state.error = true;
		},
		setPokemonDetailsSuccess: (state, action) => {
			state.pokemonDetails = action.payload;
			state.loading = false;
		},
		addPokemon: (state, action: PayloadAction<number>) => {},
	},
});

export const { addPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
