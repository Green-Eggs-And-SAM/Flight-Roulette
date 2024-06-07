import BackgroundVideo from "../Background Video/BackgroundVideo";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";
import axios from "axios";

function GameWinner(props) {
    console.log(props.winners);
    const baseUrl = "http://localhost:5050";
    const [featuredVid, setFeaturedVid] = useState();
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const targetURL = `${baseUrl}/destinations/${props.winners[0].name}/video`;
                console.log(targetURL);
                const response = await axios.get(targetURL);
                const data = response.data;
                console.log(data);
                setFeaturedVid(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchVideo();
    }, []);
    return (
        <>
            <BackgroundVideo featuredVid={featuredVid} />
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
