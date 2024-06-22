import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GameSetup.scss";
import axios from "axios";
import featuredVid from "../../assets/videos/earth-video.mp4";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import Footer from "../../components/Footer/Footer";
import Leaderboard from "../../components/Leaderboard/Leaderboard";

function GameSetup() {
    const [availableList, setAvailableList] = useState([]);
    const [yourList, setYourList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const baseUrl = "http://localhost:5050";
    const navigate = useNavigate();
    var listKey = 0;

    useEffect(() => {
        const fetchNamesAndFlags = async () => {
            try {
                const targetURL = `${baseUrl}/destinations/names-flags-list`;
                const response = await axios.get(targetURL);
                const data = response.data;
                shuffleList(data);
                setAvailableList(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        setLoading(true);
        fetchNamesAndFlags();
    }, []);

    //============= array manipulation ================
    //shuffle the list
    function shuffleList(data) {
        const len = data.length;
        for (let i = 0; i < len; i++) {
            const randomIndex = Math.floor(Math.random() * len);
            //swap
            if (randomIndex != i) {
                let temp = data[i];
                data[i] = data[randomIndex];
                data[randomIndex] = temp;
            }
        }
    }
    function deleteItemFromArray(itemToDelete, array) {
        const foundIndex = array.findIndex((item) => item == itemToDelete);
        const updatedList = [
            ...array.slice(0, foundIndex),
            ...array.slice(foundIndex + 1),
        ];
        return updatedList;
    }
    //add to your list
    //remove from availableList
    const addToYourList = (item) => {
        setAvailableList(deleteItemFromArray(item, availableList));
        setYourList([...yourList, item]);
    };

    const removeFromYourList = (item) => {
        setAvailableList([...availableList, item]);
        setYourList(deleteItemFromArray(item, yourList));
    };

    //==================== populate final list ===========
    const fetchDestinationObj = async (name) => {
        try {
            const targetURL = `${baseUrl}/destinations/${name}`;
            const response = await axios.get(targetURL);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    const createFinalList = async () => {
        if (yourList.length < 4) {
            alert("Please add at least 4 destinations to your list");
            return;
        }
        let final = [];

        for (let i = 0; i < yourList.length; i++) {
            const obj = await fetchDestinationObj(yourList[i].name);
            obj.points = 0;
            final = [...final, obj];
        }

        shuffleList(final);
        sessionStorage.clear();
        sessionStorage.setItem("list", JSON.stringify(final));
        navigate("/play");
    };

    const navBack = () => {
        navigate("/");
    };
    const toggleLeaderboard = () => {
        setShowLeaderboard(!showLeaderboard);
    };

    function getListKey() {
        listKey++;
        return listKey;
    }
    //================= HTML ====================
    const backButton = (
        <button className="button footer__button" onClick={navBack}>
            BACK
        </button>
    );
    const leaderboardButton = (
        <button
            className="button footer__button center margin-II"
            onClick={toggleLeaderboard}
        >
            {`${showLeaderboard ? "BACK TO SETUP" : "GLOBAL LEADERBOARD"}`}
        </button>
    );
    const playButton = (
        <button
            className="button footer__button button-yellow"
            onClick={createFinalList}
        >
            PLAY
        </button>
    );

    if (loading) {
        return (
            <>
                <BackgroundVideo featuredVid={featuredVid} />
                <h1 className="center frame__soft-black">
                    LOADING DESTINATIONS...
                </h1>
            </>
        );
    } else if (showLeaderboard) {
        return (
            <>
                <BackgroundVideo featuredVid={featuredVid} />
                <Leaderboard />
                <div className="center">{leaderboardButton}</div>
            </>
        );
    } else {
        return (
            <>
                <BackgroundVideo featuredVid={featuredVid} />
                <div className="center column">
                    <h1 className="frame__hard-yellow">GAME SETUP</h1>
                    <section className="selection__container">
                        <article className="country">
                            <h1 className="frame__soft-black">
                                Available Destinations:{" "}
                            </h1>
                            <ul className="country__ul">
                                {availableList.map((item) => (
                                    <li
                                        className="frame__soft-black country__li"
                                        key={getListKey()}
                                    >
                                        <h5 className="no-margin">
                                            {item.name}
                                        </h5>
                                        <img
                                            className="country__li--flag"
                                            src={item.flag}
                                        />
                                        <button
                                            onClick={() => addToYourList(item)}
                                            className="setup-button setup-button__green"
                                        >
                                            +
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </article>
                        <article className="your-list">
                            <h1 className="frame__soft-blue">Your List </h1>
                            <ul className="frame__soft-blue your-list__ul">
                                <li
                                    className={`${
                                        yourList.length == 0
                                            ? `no-margin`
                                            : `hidden `
                                    }`}
                                >
                                    <p
                                        className={`${
                                            yourList.length == 0
                                                ? `no-margin`
                                                : `hidden `
                                        }`}
                                    >
                                        Add all cities/countries you are
                                        interested in visiting.
                                    </p>
                                </li>
                                {yourList.map((item) => (
                                    <li
                                        className="country__li your-list__li"
                                        key={getListKey()}
                                    >
                                        <h5 className="no-margin">
                                            {item.name}
                                        </h5>
                                        <img
                                            className="country__li--flag"
                                            src={item.flag}
                                        />
                                        <button
                                            onClick={() =>
                                                removeFromYourList(item)
                                            }
                                            className="setup-button__red "
                                        >
                                            -
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </section>

                    <Footer
                        leftButton={backButton}
                        middleButton={leaderboardButton}
                        rightButton={playButton}
                        hide={true}
                    />
                </div>
            </>
        );
    }
}

export default GameSetup;
