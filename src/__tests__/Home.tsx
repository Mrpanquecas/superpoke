import React, { PropsWithChildren } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Home from "../pages/Home";
import userEvent from "@testing-library/user-event";
import PokemonDetails from "../pages/PokemonDetails";

const Wrapper = ({ children }: PropsWithChildren<{}>) => (
	<Provider store={store}>
		<BrowserRouter>{children}</BrowserRouter>
	</Provider>
);

const waitForArgs = {
	timeout: 2000,
};

test("Renders the home page", async () => {
	render(
		<Wrapper>
			<Home />
		</Wrapper>
	);

	// Fetch needs to be mocked
	await waitFor(() => {
		expect(screen.getByText(/ADD A NEW POKEMON/i)).toBeInTheDocument();
	}, waitForArgs);
});

test("Displays bulbasaur details page", async () => {
	render(
		<Provider store={store}>
			<MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
				<Routes>
					<Route path="/pokemon/:name" element={<PokemonDetails />} />
				</Routes>
			</MemoryRouter>
		</Provider>
	);

	// Fetch needs to be mocked
	await waitFor(() => {
		expect(screen.getByTestId("pokemonDetails")).toBeInTheDocument();
	}, waitForArgs);

	expect(screen.getByText("#1 bulbasaur")).toBeInTheDocument();
});
