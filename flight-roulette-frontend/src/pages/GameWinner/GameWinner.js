import BackgroundVideo from "../Background Video/BackgroundVideo";
import Card from "../../components/Card/Card";

function GameWinner(props) {
    console.log(props.winners);
    return (
        <>
            <BackgroundVideo featuredVid={props.winners[0].video} />
            <h1>GAME WINNER</h1>
            <Card obj={props.winners[0]} />

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
