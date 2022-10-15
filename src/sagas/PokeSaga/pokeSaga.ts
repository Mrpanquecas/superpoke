import { all, call, put, takeLatest } from 'redux-saga/effects';
import { MainClient, Pokemon } from 'pokenode-ts';
import {
	fetchPokeFail,
	fetchPokeSuccess,
} from '../../actions/pokeActions/pokeActions';
import pokeTypes from '../../ActionTypes/pokeTypes';
import { FetchPokeStart } from '../../types/types';

const getPokemons = async (offset: number) => {
	let pokemons: Pokemon[] = [];
	const api = new MainClient();
	const response = await api.pokemon.listPokemons(offset || 0, 20);
	return Promise.all(
		response.results.map(async (pokemon) => {
			const result: Pokemon = await api.pokemon.getPokemonByName(pokemon.name);
			pokemons.push(result);
		})
	).then(() => {
		return {
			pokemons,
			count: response.count,
			next: response.next,
			previous: response.previous,
		};
	});
};

function* fetchPokemonsSaga(action: FetchPokeStart) {
	try {
		const response: {
			pokemons: Pokemon[];
			count: number;
			next: string | undefined;
			previous: string | undefined;
		} = yield call(getPokemons, action.offset);
		yield put(fetchPokeSuccess(response));
	} catch (err) {
		yield put(fetchPokeFail());
	}
}

function* pokeSaga() {
	yield all([takeLatest(pokeTypes.FETCH_POKE_START, fetchPokemonsSaga)]);
}

export default pokeSaga;
