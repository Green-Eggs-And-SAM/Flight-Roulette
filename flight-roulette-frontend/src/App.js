import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome Page/Welcome";
import GameSetup from "./pages/Game Setup/GameSetup";
import GamePlay from "./pages/GamePlay/GamePlay";
import GameWinner from "./pages/GameWinner/GameWinner";
import { useEffect, useState } from "react";

function App() {
    const [finalList, setFinalList] = useState([]);
    const [winners, setWinners] = useState([]);
    const [honorableMentionsList, setHonorableMentionsList] = useState([]);
    // useEffect(() => {
    //     console.log(finalList);
    // }, [finalList]);
    const gameReady = (list) => {
        setFinalList(list);
    };

    function deleteItemFromList(index) {
        const updatedList = [
            ...finalList.slice(0, index),
            ...finalList.slice(index + 1),
        ];
        setFinalList(updatedList);
    }
    return (
        <>
            <main className="app-container">
                <div className="bg-black"></div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Welcome />} />

                        <Route
                            path="/setup"
                            element={<GameSetup gameReady={gameReady} />}
                        />
                        <Route
                            path="/play"
                            element={
                                <GamePlay
                                    finalList={finalList}
                                    deleteItemFromList={deleteItemFromList}
                                    setWinners={setWinners}
                                    setHonorableMentionsList={
                                        setHonorableMentionsList
                                    }
                                />
                            }
                        />

                        <Route
                            path="/winner"
                            element={
                                <GameWinner
                                    winners={winners}
                                    honorableMentionsList={
                                        honorableMentionsList
                                    }
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
