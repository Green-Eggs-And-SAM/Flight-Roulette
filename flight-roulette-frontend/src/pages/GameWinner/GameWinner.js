import "./GameWinner.scss";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import CardFlip from "../../components/CardFlip/CardFlip";
import ScoreboardListItem from "../../components/ScoreboardListItem/ScoreboardListItem";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GameWinner(props) {
    const baseUrl = "http://localhost:5050";
    const [featuredVid, setFeaturedVid] = useState();
    let onlyRunOnce = true;
    const navigate = useNavigate();
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
        if (!props.winners[0]) {
            console.log("here");
            navigate("/setup");
        }
        console.table(props.honorableMentionsList);
        fetchVideo();
        addPointsToCountry();
    }, []);
    if (props.winners[0]) {
        return (
            <>
                <BackgroundVideo featuredVid={featuredVid} />
                <h1>GAME WINNER</h1>
                <h3>{props.winners[0].name}</h3>
                <CardFlip obj={props.winners[0]} imgClass={"winner"} />
                <h2>HONORABLE MENTIONS</h2>
                <ul className="winner__list">
                    <ScoreboardListItem
                        name={"City/Country"}
                        points={"Game Points"}
                    />
                    {props.honorableMentionsList.map((destination) => (
                        <ScoreboardListItem
                            name={destination.name}
                            points={destination.points}
                            flag={destination.flag}
                        />
                        // <li>
                        //     name: {destination.name} points:{" "}
                        //     {destination.points}
                        // </li>
                    ))}
                </ul>
            </>
        );
    }
}

export default GameWinner;
