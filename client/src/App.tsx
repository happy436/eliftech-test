import { Route, Routes } from "react-router-dom";
import Events from "./pages/board/Board";
import Participants from "./pages/participants/Participants";
import Register from "./pages/register/Register";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Events />} />
				<Route path="/:id/register" element={<Register />} />
				<Route path="/:id/viewers" element={<Participants />} />
			</Routes>
		</>
	);
}

export default App;
