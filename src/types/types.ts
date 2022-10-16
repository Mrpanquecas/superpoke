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
	previous: string | undefined;
	next: string | undefined;
}
