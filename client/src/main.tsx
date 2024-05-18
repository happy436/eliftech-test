import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "./store/createStore";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const store = createStore();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<h1 className="hidden">Sport app</h1>
				<App />
			</BrowserRouter>
            <ToastContainer />
		</Provider>
	</React.StrictMode>
);
