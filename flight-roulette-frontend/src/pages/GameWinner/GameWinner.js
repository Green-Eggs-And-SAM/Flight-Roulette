function GameWinner(props) {
    console.log(props.winners);
    return (
        <>
            <h1>GAME WINNER</h1>
            <h3>{props.winners[0].name}</h3>
            <ul>
                {props.honorableMentionsList.map((destination) => (
                    <li>
                        name: {destination.name} points: {destination.points}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default GameWinner;
