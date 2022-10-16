import { Pokemon } from 'pokenode-ts';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { pokeActions } from '../actions/pokeActions/pokeActions';
import { useAppDispatch } from '../hooks/redux-hooks';

interface AddPokemonProps {}

const AddPokemon: React.FC<AddPokemonProps> = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Pokemon>();

	const dispatch = useAppDispatch();

	const handlePokemonCreation: SubmitHandler<Pokemon> = (data) => {
		console.log(data);

		dispatch(
			pokeActions.addPokemon({
				...data,
				id: 123123123,
				types: [{ type: { name: 'wooow', url: 'super url' }, slot: 1 }],
			})
		);
		navigate('/');
	};

	return (
		<div className="container flex py-28 justify-center items-center w-full h-full mx-auto">
			<div className="w-full h-full bg-green-300 m-2 p-2 rounded-sm flex flex-col justify-start">
				<form onSubmit={handleSubmit(handlePokemonCreation)}>
					<div className="flex flex-col">
						<span>Please input a name for your pokemon:</span>
						<input
							aria-invalid={errors.name ? 'true' : 'false'}
							className="w-40 mt-2"
							placeholder="name"
							{...register('name', {
								required: { value: true, message: 'This field is required' },
								maxLength: { value: 50, message: 'The maximum length is 50' },
								pattern: {
									value: /^[a-zA-Z]+$/,
									message: 'Only characters are accepted',
								},
							})}
						/>
						{errors.name && (
							<span className="text-red-500">{errors.name?.message}</span>
						)}
					</div>
					<button type="submit">Create pokemon!</button>
				</form>
			</div>
		</div>
	);
};

export default AddPokemon;
