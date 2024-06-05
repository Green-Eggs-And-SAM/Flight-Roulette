import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GameSetup.scss";
import axios from "axios";

function GameSetup(props) {
    const [availableList, setAvailableList] = useState([]);
    const [yourList, setYourList] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = "http://localhost:5050";
    useEffect(() => {
        const fetchNames = async () => {
            try {
                const targetURL = `${baseUrl}/destinations/names`;

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
        fetchNames();
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
            final = [...final, obj];
        }
        console.log(final);
        props.setFinalList(final);
    };

    //================= HTML ====================
    if (loading) {
        return <h1>LOADING...</h1>;
    } else {
        console.log(availableList.length);
        return (
            <>
                <div className="center column">
                    <h1>game setup</h1>
                    <section className="selection__container">
                        <ul>
                            <li className="frame__soft-black">
                                <h1>Available Destinations: </h1>
                            </li>
                            {availableList.map((item) => (
                                <li className="frame__soft-black">
                                    <h5>{item}</h5>
                                    <button onClick={() => addToYourList(item)}>
                                        +
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <ul className="frame__soft-blue">
                            <li>
                                <h1>Your Destinations: </h1>
                            </li>
                            {yourList.map((item) => (
                                <li>
                                    <h5>{item}</h5>
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
