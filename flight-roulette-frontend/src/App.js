import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome Page/Welcome";
import GameSetup from "./pages/Game Setup/GameSetup";
import GamePlay from "./pages/GamePlay/GamePlay";
import GameWinner from "./pages/GameWinner/GameWinner";

function App() {
    return (
        <>
            <main className="app-container">
                <div className="bg-black"></div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Welcome />} />

                        <Route path="/setup" element={<GameSetup />} />
                        <Route path="/play" element={<GamePlay />} />
                        <Route path="/winner" element={<GameWinner />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
