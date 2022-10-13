import { all, fork } from 'redux-saga/effects';
import pokeSaga from './PokeSaga/pokeSaga';

export function* rootSaga() {
	yield all([fork(pokeSaga)]);
}
