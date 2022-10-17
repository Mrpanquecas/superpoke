import { Pokemon } from "pokenode-ts";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
	fetchAllPokemonNames,
	pokeActions,
} from "../actions/pokeActions/pokeActions";
import { PokeBallLoading } from "../components/PokeBallLoading";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";

const AddPokemon: React.FC<{}> = () => {
	const navigate = useNavigate();
	const { pokemonNames, loading, error } = useAppSelector(
		(state) => state.pokemons
	);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<Pokemon>();

	useEffect(() => {
		dispatch(fetchAllPokemonNames());
	}, []);

	const dispatch = useAppDispatch();

	const handlePokemonCreation: SubmitHandler<Pokemon> = (data) => {
		const pokemonNameExists = pokemonNames.find(
			(poke) => poke.name === data.name
		);

		// Check if a pokemon with this name already exists
		if (pokemonNameExists) {
			setError(
				"name",
				{ message: "A pokemon with this name already exists!" },
				{ shouldFocus: true }
			);
			return;
		}

		dispatch(
			// using some default data as I ran out of time to add more fields.
			pokeActions.addPokemon({
				...data,
				// Simple way of generating a random ID
				// Not fool proof but does the job here as pokemon ID's are not always linear
				// Casting to string, shortening it and casting it to number again.
				// Could also divide by 100000 (for ex) and round it
				id: Number(Date.now().toString().slice(0, 6)),
				custom: true,
				moves: [
					{
						move: { name: "custom move", url: "custom url" },
						version_group_details: [],
					},
				],
				abilities: [
					{
						ability: { name: "custom abiity", url: "custom url" },
						is_hidden: false,
						slot: 1,
					},
				],
				types: [{ type: { name: "wooow", url: "custom url" }, slot: 1 }],
			})
		);

		// Instead of redirecting to the home page we could display
		// The pokemon details page with the information
		// Of this pokemon. I prefer to redirect to the homepage
		// To show that the pagination still works
		navigate("/");
	};

	if (error) {
		return <div>An error occurred, please try again later</div>;
	}
	if (loading) {
		return <PokeBallLoading />;
	}

	return (
		<div className="container flex py-28 justify-center items-center w-full h-full mx-auto">
			<div className="w-full h-full bg-green-300 m-2 p-2 rounded-sm flex flex-col justify-start">
				<form onSubmit={handleSubmit(handlePokemonCreation)}>
					<div className="flex flex-col">
						<span>Please input a name for your pokemon:</span>
						<input
							aria-invalid={errors.name ? "true" : "false"}
							className="w-40 mt-2 p-2"
							placeholder="name"
							{...register("name", {
								required: { value: true, message: "This field is required" },
								maxLength: { value: 50, message: "The maximum length is 50" },
								pattern: {
									value: /^[a-zA-Z]+$/,
									message: "Only characters are accepted",
								},
							})}
						/>
						{errors.name && (
							<span className="text-red-500">{errors.name?.message}</span>
						)}
					</div>
					<button className="bg-white rounded-sm p-2 mt-2" type="submit">
						Create pokemon!
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddPokemon;
