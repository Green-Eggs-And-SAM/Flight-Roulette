import "./GameWinner.scss";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import CardFlip from "../../components/CardFlip/CardFlip";
import { useEffect, useState } from "react";
import axios from "axios";

function GameWinner(props) {
    const baseUrl = "http://localhost:5050";
    const [featuredVid, setFeaturedVid] = useState();
    let onlyRunOnce = true;
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

        const addPointsToCountry = async () => {
            if (onlyRunOnce == false) return;
            else onlyRunOnce = false; //fix a bug where points are added more than once on load.
            try {
                // const data = {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({
                //         pointsToAdd: parseInt(country.points),
                //     }),
                // };
                const data = [];
                console.table(props.honorableMentionsList);
                const winnerBonus = 2;
                data.push({
                    name: props.winners[0].name,
                    newPoint: props.winners[0].points + winnerBonus,
                });
                for (let i = 0; i < props.honorableMentionsList.length; i++) {
                    if (props.honorableMentionsList[i].points < 1) continue; //skip if no points to add.
                    const obj = {
                        name: props.honorableMentionsList[i].name,
                        newPoint: props.honorableMentionsList[i].points,
                    };
                    data.push(obj);
                }
                console.log(data);
                const targetURL = `${baseUrl}/destinations/add-points`;

                await axios.put(targetURL, data);

                // console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchVideo();
        addPointsToCountry();
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
