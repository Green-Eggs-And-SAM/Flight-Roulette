import "./GameWinner.scss";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import CardFlip from "../../components/CardFlip/CardFlip";
import { useEffect, useState } from "react";
import axios from "axios";

function GameWinner(props) {
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

        const addPointsToCountry = async (country) => {
            try {
                const data = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        pointsToAdd: parseInt(country.points),
                    }),
                };
                const targetURL = `${baseUrl}/destinations/${country.name}/points`;

                await axios.put(targetURL, data);

                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        const updatePoints = async () => {
            const obj = props.honorableMentionsList[0];
            console.log(`adding points to ${obj}`);
            addPointsToCountry(obj);
        };
        fetchVideo();
        updatePoints();
    }, []);
    return (
        <>
            <BackgroundVideo featuredVid={featuredVid} />
            <h1>GAME WINNER</h1>
            <h3>{props.winners[0].name}</h3>
            <CardFlip obj={props.winners[0]} imgClass={"winner"} />

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
