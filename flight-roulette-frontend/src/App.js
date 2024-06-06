import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome Page/Welcome";
import GameSetup from "./pages/Game Setup/GameSetup";

import defaultVideo from "./assets/videos/earth-video.mp4";
import GamePlay from "./pages/GamePlay/GamePlay";
import { useEffect, useState } from "react";

function App() {
    const [featuredVid, setFeaturedVid] = useState(defaultVideo);
    const [finalList, setFinalList] = useState([]);

    // useEffect(() => {
    //     console.log(finalList);
    // }, [finalList]);
    const gameReady = (list) => {
        setFinalList(list);
        setFeaturedVid(undefined);
    };
    return (
        <>
            <main className="app-container">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Welcome />} />

                        <Route
                            path="/setup"
                            element={<GameSetup gameReady={gameReady} />}
                        />
                        <Route
                            path="/play"
                            element={<GamePlay finalList={finalList} />}
                        />
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
