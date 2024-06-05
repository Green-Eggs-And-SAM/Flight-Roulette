import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome Page/Welcome";
import GameSetup from "./pages/Game Setup/GameSetup";
import BackgroundVideo from "./pages/Background Video/BackgroundVideo";
import defaultVideo from "./assets/videos/earth-video.mp4";
import { useEffect, useState } from "react";

function App() {
    const [featuredVid, setFeaturedVid] = useState(defaultVideo);
    const [finalList, setFinalList] = useState([]);
    useEffect(() => {
        console.log(finalList);
    }, [finalList]);
    return (
        <>
            <main className="app-container">
                <BackgroundVideo featuredVid={featuredVid} />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Welcome />} />

                        <Route
                            path="/setup"
                            element={<GameSetup setFinalList={setFinalList} />}
                        />
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
