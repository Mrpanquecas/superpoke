import { all, call, put, takeLatest } from 'redux-saga/effects';
import { MainClient, Pokemon } from 'pokenode-ts';
import {
	fetchPokeFail,
	fetchPokeSuccess,
} from '../../actions/pokeActions/pokeActions';
import pokeTypes from '../../ActionTypes/pokeTypes';

const getPokemons = async () => {
	let pokemons: Pokemon[] = [];
	const api = new MainClient();
	const response = await api.pokemon.listPokemons(0, 20);
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

function* fetchPokemonsSaga() {
	try {
		const response: {
			pokemons: Pokemon[];
			count: number;
			next?: string;
			previous?: string;
		} = yield call(getPokemons);
		yield put(fetchPokeSuccess(response));
	} catch (err) {
		yield put(fetchPokeFail());
	}
}

function* pokeSaga() {
	yield all([takeLatest(pokeTypes.FETCH_POKE_START, fetchPokemonsSaga)]);
}

export default pokeSaga;
