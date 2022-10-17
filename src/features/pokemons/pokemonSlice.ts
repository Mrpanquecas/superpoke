import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NamedAPIResource, Pokemon, PokemonSprites } from "pokenode-ts";

export interface PokeState {
	loading: boolean;
	error: boolean;
	pokemons: Pokemon[];
	customPokemons: CustomPokemon[];
	pokemonNames: NamedAPIResource[];
	pokemonDetails: Pokemon | undefined;
	previous: string | undefined;
	next: string | undefined;
	count: number;
}
const initialState: PokeState = {
	loading: false,
	pokemons: [],
	customPokemons: [],
	pokemonNames: [],
	error: false,
	pokemonDetails: undefined,
	previous: undefined,
	next: undefined,
	count: 0,
};

export interface CustomPokemon extends Omit<Pokemon, "sprites"> {
	custom?: boolean;
	// make sprites optional
	sprites?: PokemonSprites;
}

export const pokemonSlice = createSlice({
	name: "pokemons",
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
			if (!action.payload.next) {
				// if there are no pokemons in te list (next)
				// we spread the custom ones
				state.pokemons = [...action.payload.pokemons, ...state.customPokemons];
			}
			state.count = action.payload.count + state.customPokemons.length;
			state.previous = action.payload.previous;
			state.next = action.payload.next;
			//state.count = action.payload.count;
			// if it's no the first request we have to take in
			// consideration the fact we might have custom pokemons added
			state.loading = false;
		},
		setPokemonDetailsStart: (state) => {
			state.loading = true;
		},
		setPokemonDetailsFail: (state) => {
			state.loading = false;
			state.error = true;
		},
		setPokemonDetailsSuccess: (state, action: PayloadAction<Pokemon>) => {
			state.pokemonDetails = action.payload;
			state.loading = false;
		},
		setAllPokemonNamesStart: (state) => {
			state.loading = true;
		},
		setAllPokemonNamesFail: (state) => {
			state.loading = false;
			state.error = true;
		},
		setAllPokemonNamesSuccess: (
			state,
			action: PayloadAction<NamedAPIResource[]>
		) => {
			state.pokemonNames = action.payload;
			state.loading = false;
		},
		addPokemon: (state, action: PayloadAction<CustomPokemon>) => {
			state.count += 1;
			state.customPokemons.push(action.payload);
		},
	},
});

export default pokemonSlice.reducer;
