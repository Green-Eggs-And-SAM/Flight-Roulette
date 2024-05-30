function GameSetup() {
    let storedList = [
        "hawaii",
        "greece",
        "scotland",
        "vancouver",
        "Thailand",
        "montreal",
        "rome",
        "paris",
    ];
    let yourList = [];

    const addToYourList = (item) => {
        const found = storedList.findIndex((storedItem) => storedItem == item);

        console.log(found);
    };

    return (
        <>
            <h1>game setup</h1>
            <section>
                <ul>
                    {storedList.map((item) => (
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
