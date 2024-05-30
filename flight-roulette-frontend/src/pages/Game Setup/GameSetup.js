import { useState } from "react";

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
    const [availableList, setAvailableList] = useState(startingList);
    const [yourList, setYourList] = useState([]);

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
            <section>
                <ul>
                    {availableList.map((item) => (
                        <li className="frame__soft-black">
                            <h3>{item}</h3>
                            <button onClick={() => addToYourList(item)}>
                                +
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default GameSetup;
