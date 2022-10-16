import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSpecificPokemon } from '../actions/pokeActions/pokeActions';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

interface PokemonDetailsProps {}

const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
	const { name } = useParams<'name'>();
	const dispatch = useAppDispatch();
	const { pokemonDetails, loading, error } = useAppSelector(
		(state) => state.pokemons
	);

	useEffect(() => {
		if (name) {
			dispatch(fetchSpecificPokemon(name));
		}
	}, []);

	const pokemonTypes = pokemonDetails?.types.map((type) => type.type.name);

	if (error) {
		return <div>An error occurred, please try again later</div>;
	}
	if (loading) {
		return <div>Loading pokemon details...</div>;
	}

	return (
		<div className="container flex py-28 justify-center items-center w-full h-full mx-auto">
			<div className="w-full h-full bg-green-300 m-2 p-2 rounded-sm flex justify-between items-center">
				<div className="flex flex-col">
					<span>
						{`#${pokemonDetails?.id}`} {pokemonDetails?.name}
					</span>
					<div>
						<p>type(s):</p>
						<span>{pokemonTypes?.join('/')}</span>
					</div>
				</div>
				{pokemonDetails?.sprites.front_default && (
					<img
						src={pokemonDetails?.sprites.front_default}
						alt={`${pokemonDetails?.name}-sprite`}
					/>
				)}
			</div>
		</div>
	);
};

export default PokemonDetails;
