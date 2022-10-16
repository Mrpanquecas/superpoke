import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';

export interface PokeState {
	loading: boolean;
	error: boolean;
	pokemons: Pokemon[];
	previous: string | undefined;
	next: string | undefined;
}
const initialState: PokeState = {
	loading: false,
	pokemons: [],
	error: false,
	previous: undefined,
	next: undefined,
};

export const pokemonSlice = createSlice({
	name: 'pokemons',
	initialState,
	reducers: {
		addPokemon: (state, action: PayloadAction<number>) => {},
	},
});

export const { addPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
