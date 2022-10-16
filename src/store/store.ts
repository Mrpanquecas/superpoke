import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import pokemonReducer from '../features/pokemons/pokemonSlice';
import { pokeApi } from '../services/pokeapi';

export const store = configureStore({
	reducer: {
		pokemons: pokemonReducer,
		[pokeApi.reducerPath]: pokeApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(pokeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
