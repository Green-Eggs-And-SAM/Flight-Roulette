import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GameSetup.scss";
import axios from "axios";
import featuredVid from "../../assets/videos/earth-video.mp4";
import BackgroundVideo from "../Background Video/BackgroundVideo";

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
        let final = [];

        for (let i = 0; i < yourList.length; i++) {
            const obj = await fetchDestinationObj(yourList[i]);
            obj.points = 0;
            final = [...final, obj];
        }
        console.log(final);
        props.gameReady(final);
        navigate("/play");
    };

    //================= HTML ====================
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
                        <article>
                            <h1 className="frame__soft-black">
                                Available Destinations:{" "}
                            </h1>
                            <ul className="country__ul">
                                {availableList.map((item) => (
                                    <li className="frame__soft-black country__li">
                                        <h5>{item.name}</h5>
                                        <img
                                            className="country__li--flag"
                                            src={item.flag}
                                        />
                                        <button
                                            onClick={() => addToYourList(item)}
                                        >
                                            +
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </article>
                        <ul className="frame__soft-blue your-list__ul">
                            <li>
                                <h1>Your Destinations: </h1>
                            </li>
                            {yourList.map((item) => (
                                <li>
                                    <h5>{item.name}</h5>
                                    <button
                                        onClick={() => removeFromYourList(item)}
                                    >
                                        -
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                    <section className="row">
                        <button className="button">BACK</button>
                        <button className="button" onClick={createFinalList}>
                            PLAY FLIGHT ROULETTE
                        </button>
                    </section>
                </div>
            </>
        );
    }
}

export default GameSetup;
