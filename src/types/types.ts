import pokeTypes from '../ActionTypes/pokeTypes';

// taken from https://pokeapi.co/docs/v2#pokemon
export interface Pokemon {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	weigth: number;
	is_default: boolean;
	order: number;
	abilities: Ability[];
	forms: ApiResource[];
	held_items: {
		location_area_encounters: string;
		item: ApiResource;
		version_details: {
			rarity: string;
			version: ApiResource;
		}[];
	};
	moves: PokeMove[];
	species: ApiResource;
	sprites: {
		back_default?: string;
		back_female?: string;
		back_shiny?: string;
		back_shiny_female?: string;
		front_default?: string;
		front_female?: string;
		front_shiny?: string;
		front_shiny_female?: string;
		other: {
			dream_world: {
				front_default?: string;
				front_female?: string;
			};
			home: {
				front_default?: string;
				front_female?: string;
				front_shiny?: string;
				front_shiny_female?: string;
			};
			'official-art': {
				front_default: string;
			};
		};
		// omitting versions as I am not going to use these ones
		//versions: {}
	};
	stats: Stat[];
	types: Type[];
	// omitting past_types as they are not relevant for gen1
	//past_types: {}
}

interface Type {
	slot: number;
	type: ApiResource;
}

interface Stat {
	base_stat: number;
	effort: number;
	state: ApiResource;
}

interface PokeMove {
	move: ApiResource;
	version_group_details: {
		version_group: ApiResource;
		move_learn_method: ApiResource;
	};
}

interface Ability {
	is_hidden: boolean;
	slot: number;
	ability: ApiResource;
}

interface ApiResource {
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
	payload: Pokemon[];
}

export type PokeActions = FetchPokeStart | FetchPokeFail | FetchPokeSuccess;
