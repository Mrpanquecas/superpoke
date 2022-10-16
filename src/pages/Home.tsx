import React, { useEffect } from "react";
import { Pokemon } from "pokenode-ts";
import PokeCard from "../components/PokeCard";
import { fetchPokemonList } from "../actions/pokeActions/pokeActions";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";
import { PokeBallLoading } from "../components/PokeBallLoading";

const Home: React.FC<{}> = (props) => {
	console.log(props);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { pokemons, loading, error, next, previous, count } = useAppSelector(
		(state) => state.pokemons
	);

	useEffect(() => {
		dispatch(fetchPokemonList(0));
	}, []);

	const handlePage = (url: string | undefined | null) => {
		if (!url) return;
		// why?
		// unfortunately when I started I was not aware I was not going to be able to simply
		// pass the next/previous string to the api wrapper I am using here
		// so I extract only the offset. Ideally it would not be needed
		const queryParams = new URLSearchParams(url.split("?")[1]);
		dispatch(fetchPokemonList(Number(queryParams.get("offset"))));
	};

	const handleFirstLast = (count: number) => {
		dispatch(fetchPokemonList(count));
	};

	if (error) {
		return <div>An error occurred, please try again later</div>;
	}
	if (loading) {
		return <PokeBallLoading />;
	}

	// Pagination could go more in depth by using number to skip to each page direcly
	// but in my opinion this already shows the basics of it's usage.
	return (
		<div className="flex flex-col justify-center items-center">
			<button
				// Using navigate method to redirect the user
				// same functionality could be achieved with the Link component
				onClick={() => navigate("addPokemon")}
				className="bg-green-300 rounded-sm p-2"
			>
				ADD A NEW POKEMON
			</button>
			<div className="container grid lg:grid-cols-4 md:grid-cols-3 xs:grid-cols2 grid-cols-1">
				{pokemons?.map((pokemon: Pokemon) => (
					<PokeCard key={pokemon.name} pokemon={pokemon} />
				))}
			</div>
			<div className="space-x-2">
				<button
					aria-label="previous"
					className="p-2 rounded-sm bg-blue-300"
					disabled={!previous}
					onClick={() => handleFirstLast(0)}
				>
					First
				</button>
				<button
					aria-label="previous"
					// class concatenation is easier to read using a tool like
					// classnames. For sake of simplicity I'm using string interpolation
					className={`p-2 rounded-sm ${
						!previous ? "bg-gray-300" : "bg-blue-300"
					}`}
					disabled={!previous}
					onClick={() => handlePage(previous)}
				>
					Prev
				</button>
				<button
					aria-label="next"
					className={`p-2 rounded-sm ${!next ? "bg-gray-300" : "bg-blue-300"}`}
					disabled={!next}
					onClick={() => handlePage(next)}
				>
					Next
				</button>
				<button
					aria-label="next"
					className="p-2 rounded-sm bg-blue-300"
					disabled={!next}
					onClick={() => handleFirstLast(count - 20)}
				>
					Last
				</button>
			</div>
		</div>
	);
};

export default Home;
