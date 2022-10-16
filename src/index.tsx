import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import Home from "./pages/Home";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";
import PokemonDetails from "./pages/PokemonDetails";
import AddPokemon from "./pages/AddPokemon";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/addPokemon" element={<AddPokemon />} />
					<Route path="/pokemon/:name" element={<PokemonDetails />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
