import { Pokemon } from 'pokenode-ts';

interface PokeCardProps {
	pokemon: Pokemon;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
	const pokemonTypes = pokemon.types.map((type) => type.type.name);

	return (
		<div className="h-32 bg-green-300 m-2 p-2 rounded-sm flex justify-between items-center hover:cursor-pointer hover:scale-105">
			<div className="flex flex-col">
				<span>
					{`#${pokemon.id}`} {pokemon.name}
				</span>
				<div>
					<p>type(s):</p>
					<span>{pokemonTypes.join('/')}</span>
				</div>
			</div>
			{pokemon.sprites.front_default && (
				<img
					src={pokemon.sprites.front_default}
					alt={`${pokemon.name}-sprite`}
				/>
			)}
		</div>
	);
};

export default PokeCard;
