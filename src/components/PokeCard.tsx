import { Link } from "react-router-dom";
import { CustomPokemon } from "../features/pokemons/pokemonSlice";

interface PokeCardProps {
	pokemon: CustomPokemon;
}

const PokeCard: React.FC<PokeCardProps> = ({ pokemon }) => {
	const pokemonTypes = pokemon.types?.map((type) => type.type.name);

	return (
		// Using react router to redirect the user
		// with a specific state in case we have a custom pokemon
		// because we won't be able to fetch it's information remotely
		<Link
			data-testid={pokemon.name}
			to={`pokemon/${pokemon.name}`}
			state={pokemon?.custom ? pokemon : null}
		>
			<div className="h-32 bg-green-300 m-2 p-2 rounded-sm flex justify-between items-center hover:cursor-pointer hover:scale-105">
				<div className="flex flex-col">
					<span className="font-semibold text-md">
						{`#${pokemon.id}`} {pokemon.name}
					</span>
					<div>
						<p>type(s):</p>
						<span>{pokemonTypes?.join("/")}</span>
					</div>
				</div>
				{pokemon.sprites?.front_default ? (
					<img
						src={pokemon.sprites.front_default}
						alt={`${pokemon.name}-sprite`}
					/>
				) : (
					<img
						className="w-10 h-10"
						src="/assets/pokeball.png"
						alt={`${pokemon.name}-sprite`}
					/>
				)}
			</div>
		</Link>
	);
};

export default PokeCard;
