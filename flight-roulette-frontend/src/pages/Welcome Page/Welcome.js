import "./Welcome.scss";
import "../../App.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import featuredVid from "../../assets/videos/earth-sim.mp4";

function Welcome() {
    const [hiddenH2P, setHowToPlayHidden] = useState(false);
    const navigate = useNavigate();
    function showHowToPlay() {
        setHowToPlayHidden(true);
    }

    function start() {
        navigate("/setup");
    }
    return (
        <>
            <BackgroundVideo featuredVid={featuredVid} />
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
                    <button onClick={start} className="button">
                        Start
                    </button>
                </div>
            </main>
        </>
    );
}

export default Welcome;
