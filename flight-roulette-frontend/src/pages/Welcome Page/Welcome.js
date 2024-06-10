import "./Welcome.scss";
import "../../App.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import featuredVid from "../../assets/videos/earth-sim.mp4";
import Footer from "../../components/Footer/Footer";

function Welcome() {
    const [hiddenH2P, setHowToPlayHidden] = useState(false);
    const navigate = useNavigate();
    const howToPlayButton = (
        <button
            onClick={showHowToPlay}
            className={`button  ${hiddenH2P && "hidden"}`}
        >
            How To Play
        </button>
    );

    const startButton = (
        <button onClick={start} className="button">
            Start
        </button>
    );
    function showHowToPlay() {
        setHowToPlayHidden(true);
    }

    function start() {
        navigate("/setup");
    }
    return (
        <>
            <BackgroundVideo
                featuredVid={featuredVid}
                widthfit={true}
                center={true}
            />
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
                <main
                    className={`description frame__soft-black ${
                        !hiddenH2P && "hidden"
                    }`}
                >
                    <h2 className={`${!hiddenH2P && "hidden"}`}>HOW TO PLAY</h2>
                    <h3 className={`${!hiddenH2P && "hidden"}`}>
                        One of the most fun parts of a vacation is the planning
                        stage. However, with all the wonderful vacation
                        destinations all over the world, it can be difficult for
                        one to decide on a destination to visit. Flight Roulette
                        is a game designed to help you decide which country you
                        are most passionate about visiting.
                    </h3>

                    <h3 className={`${!hiddenH2P && "hidden"}`}>
                        PART 1 - SETUP <br /> Populate a list of possible
                        vacation destinations you are interested in visiting.
                    </h3>
                    <h3 className={`${!hiddenH2P && "hidden"}`}>
                        PART 2 - PLAY <br /> Play the game to narrow down the
                        list of vacations. Each round, two destinations will be
                        presented to you. Simply choose your prefered
                        destination. The destination you choose will stay in the
                        game, while the other is eliminated. Repeat until only
                        one destination, your favorite, remains.
                    </h3>
                </main>
                <div className="button__row"></div>
                <Footer
                    hide={true}
                    leftButton={howToPlayButton}
                    rightButton={startButton}
                />
            </main>
        </>
    );
}

export default Welcome;
