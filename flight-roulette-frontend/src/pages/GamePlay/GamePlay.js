import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import EarthLoop from "../../assets/videos/earth-loop.mp4";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import "./GamePlay.scss";

function GamePlay(finalList) {
    const [eliminatedList, setElinimatedList] = useState([]);
    const [round, setRound] = useState(1);
    const [leftIndex, setLeftIndex] = useState(0);
    const [featuredVid, setFeaturedVid] = useState();
    const [voteStatus, setVoteStatus] = useState("");

    useEffect(() => {
        console.log(finalList.finalList[0].landscape[0]);
    }, [finalList]);

    const leftVote = () => {
        console.log("left");
        setVoteStatus("l");
    };

    const rightVote = () => {
        console.log("right");
        setVoteStatus("r");
    };

    return (
        <>
            <BackgroundVideo
                featuredVid={featuredVid ? featuredVid : EarthLoop}
            />
            <header className="center column frame__soft-black">
                <h1>Choose Your Prefered Destination </h1>
                <p>
                    Round {round} of {finalList.finalList.length}
                </p>
            </header>
            <div className="choice__container center">
                <div
                    className={`column center fade-out-container 
                    ${voteStatus === "r" ? "fade-out" : ""}
                    `}
                >
                    <Card
                        obj={finalList.finalList[leftIndex]}
                        vote={leftVote}
                    />
                </div>
                <p className="frame__soft-black">OR</p>
                <div
                    className={`column center fade-out-container ${
                        voteStatus === "l" ? "fade-out" : ""
                    }`}
                >
                    <Card
                        obj={finalList.finalList[leftIndex + 1]}
                        vote={rightVote}
                    />
                </div>
            </div>
        </>
    );
}

export default GamePlay;
