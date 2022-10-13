import { combineReducers } from 'redux';
import { pokeReducer } from './pokeReducer';

const rootReducer = combineReducers({
	pokemons: pokeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
