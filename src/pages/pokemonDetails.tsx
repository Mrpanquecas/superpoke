import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSpecificPokemon } from "../actions/pokeActions/pokeActions";
import { PokeBallLoading } from "../components/PokeBallLoading";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

interface PokemonDetailsProps {}

const PokemonDetails: React.FC<PokemonDetailsProps> = () => {
	const { name } = useParams<"name">();
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
		return <PokeBallLoading />;
	}

	return (
		<div
			data-testid="pokemonDetails"
			className="container flex py-28 justify-center items-center w-full h-full mx-auto"
		>
			<div className="w-full h-full bg-green-300 m-2 p-2 rounded-sm flex flex-col justify-start">
				<h1 className="font-semibold text-xl">
					{`#${pokemonDetails?.id}`} {pokemonDetails?.name}
				</h1>
				<div className="grid grid-cols-3 space-x-2">
					<div className="bg-white p-2 rounded-sm">
						<p className="bg-gray-300 rounded-sm px-2 py-1">Type(s):</p>
						<p>{pokemonTypes?.join("/")}</p>
					</div>
					<div className="bg-white p-2 rounded-sm">
						<p className="bg-gray-300 rounded-sm px-2 py-1">Abilities:</p>
						{pokemonDetails?.abilities.map((ability) => (
							// It is possible to further next request to get
							// relevant flavor text or more information for these abilities
							<p key={ability.ability.name}>
								{ability.ability.name} {ability.is_hidden && "(Hidden ability)"}
							</p>
						))}
					</div>
					<div className="bg-white p-2 rounded-sm">
						<p className="bg-gray-300 rounded-sm px-2 py-1">
							List of possible Moves:
						</p>
						<ul className="h-40 overflow-y-scroll">
							{pokemonDetails?.moves.map((move) => (
								<p key={move.move.name}>{move.move.name}</p>
							))}
						</ul>
					</div>
				</div>
				{pokemonDetails?.sprites.front_default ? (
					<div className="h-40 w-full flex justify-center">
						<img
							src={pokemonDetails.sprites.front_default}
							alt={`${pokemonDetails.name}-sprite`}
						/>
					</div>
				) : (
					<div className="h-40 w-full flex justify-center">
						<img
							className="w-20 h-20"
							src={"/assets/pokeball.png"}
							alt={`${pokemonDetails?.name}-sprite`}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default PokemonDetails;
