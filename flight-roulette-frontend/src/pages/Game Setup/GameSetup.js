import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GameSetup.scss";
import axios from "axios";
import featuredVid from "../../assets/videos/earth-video.mp4";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import Footer from "../../components/Footer/Footer";

function GameSetup(props) {
    const [availableList, setAvailableList] = useState([]);
    const [yourList, setYourList] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = "http://localhost:5050";
    const navigate = useNavigate();
    useEffect(() => {
        const fetchNamesAndFlags = async () => {
            try {
                const targetURL = `${baseUrl}/destinations/names-flags-list`;

                // console.log(targetURL);
                const response = await axios.get(targetURL);
                const data = response.data;
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
        console.log(final);
        props.gameReady(final);
        navigate("/play");
    };

    const navBack = () => {
        navigate("/");
    };

    //================= HTML ====================
    const backButton = (
        <button className="button footer__button" onClick={navBack}>
            BACK
        </button>
    );
    const playButton = (
        <button className="button footer__button " onClick={createFinalList}>
            PLAY FLIGHT ROULETTE
        </button>
    );

    if (loading) {
        return <h1>LOADING...</h1>;
    } else {
        console.log(availableList.length);
        return (
            <>
                <BackgroundVideo featuredVid={featuredVid} />
                <div className="center column">
                    <h1>game setup</h1>
                    <section className="selection__container">
                        <article className="country">
                            <h1 className="frame__soft-black">
                                Available Destinations:{" "}
                            </h1>
                            <ul className="country__ul">
                                {availableList.map((item) => (
                                    <li className="frame__soft-black country__li">
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
                                        Add any countries you are interested in
                                        visiting.
                                    </p>
                                </li>
                                {yourList.map((item) => (
                                    <li className="country__li your-list__li">
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
                                            className="setup-button "
                                        >
                                            -
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </section>
                    {/* <section className="row">
                        <button className="button">BACK</button>
                        <button className="button " onClick={createFinalList}>
                            PLAY FLIGHT ROULETTE
                        </button>
                    </section> */}
                    <Footer leftButton={backButton} rightButton={playButton} />
                </div>
            </>
        );
    }
}

export default GameSetup;
