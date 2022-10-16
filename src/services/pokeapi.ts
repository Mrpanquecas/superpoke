import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NamedAPIResourceList, Pokemon } from 'pokenode-ts';

export const pokeApi = createApi({
	reducerPath: 'pokeApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
	endpoints: (builder) => ({
		getPokemons: builder.query<NamedAPIResourceList, string>({
			query: (params) => `/pokemon?${params}`,
		}),
		getPokemonByName: builder.query<Pokemon, string>({
			query: (name) => `pokemon/${name}`,
		}),
	}),
});

export const { useGetPokemonByNameQuery, useGetPokemonsQuery } = pokeApi;
