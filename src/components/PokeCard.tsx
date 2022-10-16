import { NamedAPIResource, Pokemon } from 'pokenode-ts';
import { useGetPokemonByNameQuery } from '../services/pokeapi';

interface PokeCardProps {
	pokemon: NamedAPIResource;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
	const {
		data: pokemonDetails,
		error,
		isLoading,
	} = useGetPokemonByNameQuery(pokemon.name);

	console.log(pokemonDetails);

	if (error) {
		return <div> something went wrong</div>;
	}

	if (isLoading) {
		<div className="h-32 bg-green-300 m-2 p-2 rounded-sm flex justify-between items-center hover:cursor-pointer hover:scale-105">
			...loading...
		</div>;
	}
	const pokemonTypes = pokemonDetails?.types.map((type) => type.type.name);

	return (
		<div className="h-32 bg-green-300 m-2 p-2 rounded-sm flex justify-between items-center hover:cursor-pointer hover:scale-105">
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
	);
};

export default PokeCard;
