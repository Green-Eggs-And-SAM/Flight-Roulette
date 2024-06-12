import "./Welcome.scss";
import "../../App.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import featuredVid from "../../assets/videos/earth-sim.mp4";
import Footer from "../../components/Footer/Footer";
import Credit from "../../components/Credit/Credit";

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
        <button onClick={start} className="button button-yellow">
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
                <br />
                <main
                    className={`description frame__soft-black ${
                        !hiddenH2P && "hidden"
                    }`}
                >
                    <h2 className={`${!hiddenH2P && "hidden"} center`}>
                        A FUN PROBLEM
                    </h2>
                    <h4 className={`${!hiddenH2P && "hidden"}`}>
                        One of the most fun parts of a vacation is the planning
                        stage. However, given that there are doznes of amazing
                        places to visit around the world, it can be difficult
                        for you to decide on one to visit. Flight Roulette is a
                        game designed to help you decide which country you are
                        most passionate about visiting. Flight Roulette can also
                        help you discover new places to visit.
                    </h4>
                    <h2 className={`${!hiddenH2P && "hidden"} center`}>
                        HOW TO PLAY
                    </h2>
                    <h4 className={`${!hiddenH2P && "hidden"}`}>
                        PART 1 - SETUP <br /> Populate a list of possible
                        vacation destinations you are interested in visiting.
                    </h4>
                    <h4 className={`${!hiddenH2P && "hidden"}`}>
                        PART 2 - PLAY <br /> Play the game to narrow down the
                        list of vacations. Each round, two destinations will be
                        presented to you. Simply choose your prefered
                        destination. The destination you choose will stay in the
                        game, while the other is eliminated. Repeat until only
                        one destination, your favorite, remains.
                    </h4>
                </main>
                <div className="button__row"></div>
                <br />
                <Credit />
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
