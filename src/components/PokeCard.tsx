import { Pokemon } from 'pokenode-ts';
import { Link } from 'react-router-dom';

interface PokeCardProps {
	pokemon: Pokemon;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
	const pokemonTypes = pokemon?.types.map((type) => type.type.name);

	return (
		// Using react router to redirect the user
		<Link to={`pokemon/${pokemon.name}`}>
			<div className="h-32 bg-green-300 m-2 p-2 rounded-sm flex justify-between items-center hover:cursor-pointer hover:scale-105">
				<div className="flex flex-col">
					<span>
						{`#${pokemon.id}`} {pokemon.name}
					</span>
					<div>
						<p>type(s):</p>
						<span>{pokemonTypes?.join('/')}</span>
					</div>
				</div>
				{pokemon.sprites && pokemon.sprites.front_default && (
					<img
						src={pokemon?.sprites.front_default}
						alt={`${pokemon?.name}-sprite`}
					/>
				)}
			</div>
		</Link>
	);
};

export default PokeCard;
