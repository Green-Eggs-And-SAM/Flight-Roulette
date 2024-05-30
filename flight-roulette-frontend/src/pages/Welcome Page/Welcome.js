import "./Welcome.scss";
import "../../App.scss";
import bgVideo from "../../assets/earth-video.mp4";
import { useState } from "react";

function Welcome() {
    const [hiddenH2P, setHowToPlayHidden] = useState(false);
    function showHowToPlay() {
        setHowToPlayHidden(true);
    }
    return (
        <>
            <main className="main-container">
                <header className="welcome">
                    <div className="column center">
                        <h1
                            className={`welcome__title ${
                                !hiddenH2P && `welcome__title--large`
                            }`}
                        >
                            FLIGHT ROULETTE
                        </h1>
                        <h3
                            className={`welcome__subtitle frame__soft-black ${
                                hiddenH2P && "hidden"
                            }`}
                        >
                            A Vacation Planning Game
                        </h3>
                    </div>
                </header>
                <h3 className={`${!hiddenH2P && "hidden"}`}>
                    Flight Roulette is a game yay
                </h3>
                <div className="button__row">
                    <button
                        onClick={showHowToPlay}
                        className={`button  ${hiddenH2P && "hidden"}`}
                    >
                        How To Play
                    </button>
                    <button className="button">Start</button>
                </div>
            </main>
        </>
    );
}

export default Welcome;
