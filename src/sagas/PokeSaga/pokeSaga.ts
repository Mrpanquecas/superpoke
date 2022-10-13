import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
	fetchPokeFail,
	fetchPokeSuccess,
} from '../../actions/pokeActions/pokeActions';
import pokeTypes from '../../ActionTypes/pokeTypes';
import { Pokemon } from '../../types/types';

const getPokemons = () =>
	axios.get<Pokemon[]>(
		'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
	);

function* fetchPokemonsSaga() {
	try {
		const response: { data: Pokemon[] } = yield call(getPokemons);
		yield put(fetchPokeSuccess(response.data));
	} catch (err) {
		yield put(fetchPokeFail());
	}
}

function* pokeSaga() {
	yield all([takeLatest(pokeTypes.FETCH_POKE_START, fetchPokemonsSaga)]);
}

export default pokeSaga;
