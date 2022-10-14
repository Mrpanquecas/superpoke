import { Pokemon } from 'pokenode-ts';

interface PokeCardProps {
	pokemon: Pokemon;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => (
	<div className="h-32 bg-green-300 m-2 p-2 rounded-sm flex">
		<div className="flex flex-col">
			<span>{`#${pokemon.id}`}</span>
			<span>{pokemon.name}</span>
		</div>
		{pokemon.sprites.front_default && (
			<img src={pokemon.sprites.front_default} />
		)}
	</div>
);

export default PokeCard;
