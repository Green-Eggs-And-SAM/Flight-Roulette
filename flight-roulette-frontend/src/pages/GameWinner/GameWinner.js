import "./GameWinner.scss";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import CardFlip from "../../components/CardFlip/CardFlip";
import ScoreboardListItem from "../../components/ScoreboardListItem/ScoreboardListItem";
import Footer from "../../components/Footer/Footer";
import Credit from "../../components/Credit/Credit.js";
import Leaderboard from "../../components/Leaderboard/Leaderboard.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function GameWinner(props) {
    const baseUrl = "http://localhost:5050";
    const [featuredVid, setFeaturedVid] = useState();
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    let onlyRunOnce = true;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const targetURL = `${baseUrl}/destinations/${props.winner.name}/video`;
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
                    name: props.winner.name,
                    newPoint: props.winner.points + winnerBonus,
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
        if (!props.winner) {
            backToSetup();
        }
        console.table(props.honorableMentionsList);
        fetchVideo();
        addPointsToCountry();
    }, []);

    const toggleLeaderboard = () => {
        setShowLeaderboard(!showLeaderboard);
    };
    const backToSetup = () => {
        navigate("/setup");
    };

    const navButtons = (
        <div className="row game-scoreboard__bottom-space center">
            <button
                className="button footer__button"
                onClick={toggleLeaderboard}
            >
                {showLeaderboard
                    ? `BACK TO ${props.winner.name}`
                    : "GLOBAL LEADERBOARD"}
            </button>
            <button
                className="button footer__button button-yellow"
                onClick={backToSetup}
            >
                PLAY AGAIN
            </button>
        </div>
    );

    if (showLeaderboard) {
        return (
            <>
                <BackgroundVideo featuredVid={featuredVid} />

                <Leaderboard />
                {navButtons}
                <Credit />
            </>
        );
    } else if (props.winner) {
        return (
            <>
                <div className="column center">
                    <BackgroundVideo featuredVid={featuredVid} />
                    <h1 className="frame__hard-yellow ">
                        GAME WINNER - {props.winner.name}
                    </h1>
                    <CardFlip obj={props.winner} imgClass={"winner"} />
                    <h2 className="frame__soft-white game-scoreboard__subheader">
                        GAME SCOREBOARD
                    </h2>
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
                        ))}
                    </ul>
                    {navButtons}
                    <Credit />
                </div>
            </>
        );
    }
}

export default GameWinner;
