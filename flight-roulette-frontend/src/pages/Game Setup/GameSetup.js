import { useState, useEffect } from "react";
import "./GameSetup.scss";
import axios from "axios";

function GameSetup() {
    let startingList = [
        "hawaii",
        "greece",
        "scotland",
        "vancouver",
        "Thailand",
        "montreal",
        "rome",
        "paris",
    ];
    const baseUrl = "http://localhost:5050/";
    useEffect(() => {
        const fetchNames = async () => {
            try {
                const targetURL = `${baseUrl}destinations/names`;

                console.log(targetURL);
                const response = await axios.get(targetURL);
                console.log(response);

                // setVideoLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        // setVideoLoading(true);
        fetchNames();
    }, []);

    const [availableList, setAvailableList] = useState(startingList);
    const [yourList, setYourList] = useState([]);
    // console.log(availableList);
    // console.log(yourList);

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

    return (
        <>
            <h1>game setup</h1>
            <section className="selection__container">
                <ul>
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
                        <h1>Your list </h1>
                        <h3>of vacation destinations:</h3>
                    </li>
                    {yourList.map((item) => (
                        <li>
                            <h5>{item}</h5>
                            <button onClick={() => removeFromYourList(item)}>
                                -
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default GameSetup;
