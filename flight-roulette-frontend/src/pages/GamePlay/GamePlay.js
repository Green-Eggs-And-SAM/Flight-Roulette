import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/CardStatic/CardStatic";
import EarthLoop from "../../assets/videos/earth-loop.mp4";
import BackgroundVideo from "../Background Video/BackgroundVideo";
import "./GamePlay.scss";

function GamePlay(props) {
    const [eliminatedList, setEliminatedList] = useState([]);
    const [round, setRound] = useState(1);
    const [totalRounds, setTotalRounds] = useState(1);
    const [leftIndex, setLeftIndex] = useState(0); //left card index starts at 0, right card index is leftCardIndex + 1
    //increment left index + 1 on each round.
    const [featuredVid, setFeaturedVid] = useState();
    const [voteStatus, setVoteStatus] = useState("");
    const [cardsHidden, setHidden] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        console.table("finalList", props.finalList);
        console.table("eliminatedList", eliminatedList);
        if (props.finalList.length <= 1) {
            // end of game. this is the winning vote
            props.setWinners(props.finalList); //winner is last remaining item.
            props.setHonorableMentionsList(eliminatedList);
            navigate("/winner");
        } else if (voteStatus !== "") {
            startNextRound();
        }
    }, [props.finalList]);

    useEffect(() => {
        setTotalRounds(props.finalList.length - 1);
    }, []);

    //if voted for left, then delete right
    const leftVote = () => {
        setVoteStatus("l");
        const cardIndexWinner = leftIndex;
        const cardIndexLoser = leftIndex + 1; //eliminate the other card
        props.finalList[cardIndexWinner].points++;
        endOfRound(cardIndexLoser, cardIndexWinner);
    };

    //if voted for right then delete left.
    const rightVote = () => {
        setVoteStatus("r");
        const cardIndexWinner = leftIndex + 1;
        const cardIndexLoser = leftIndex; //eliminate the other card
        props.finalList[cardIndexWinner].points++;
        endOfRound(cardIndexLoser, cardIndexWinner);
    };

    function addToEliminatedList(index) {
        const elimatedObj = props.finalList[index];
        const obj = {};
        obj.name = elimatedObj.name;
        obj.points = elimatedObj.points;
        setEliminatedList([obj, ...eliminatedList]);
    }

    const wait = async (waitTime) => {
        await new Promise((dummy) => setTimeout(dummy, waitTime));
    };

    const endOfRound = async (cardIndexLoser, cardIndexWinner) => {
        await wait(600); // show winning card for a bit
        setHidden(true); //slide cards down.
        await wait(300); // wait for cards to be off screen
        addToEliminatedList(cardIndexLoser);
        props.deleteItemFromList(cardIndexLoser);
    };

    //exmaple logic
    //using tournament style single elimination bracket
    //example starting list:
    //
    // [0] hawaii < user votes between these two on round 1
    // [1] greece < user votes between these two
    // [2] scotland
    // [3] vietnam

    // // round 1

    // [0] hawaii (+1) < user votes to keep hawaii. hawaii stays. and gets +1 point
    // [1] greece < user did not vote for greece. greece is eliminated
    // [2] scotland
    // [3] vietnam

    // [0] hawaii (+1)
    // [1] scotland <next round
    // [2] vietnam <next round

    // // round 2
    // [0] hawaii (+1)
    // [1] scotland <
    // [2] vietnam (+1)< user votes to keep vietnam. vietnam stays and gets +1 point. scotland eliminated

    // // round 3
    // [0] hawaii (+2) < user votes to keep hawaii. vietnam eliminated
    // [1] vietnam (+1) <

    // winner
    // hawaii is the winner.
    // vietnam in 2nd place with 1 point.
    // scotland and greece tied for 3rd with 0 points.

    const startNextRound = async () => {
        console.log("props.finalList", props.finalList);
        await wait(500);
        const nextRound = round + 1;
        setRound(nextRound);
        let nextIndex = leftIndex + 1;
        if (nextIndex >= props.finalList.length - 1) nextIndex = 0; // don't go out of bounds
        setLeftIndex(nextIndex);
        setVoteStatus("");
        setHidden(false);
    };

    return (
        <>
            <BackgroundVideo
                featuredVid={featuredVid ? featuredVid : EarthLoop}
            />
            <header className="center column frame__soft-black">
                <h1>Choose Your Prefered Destination </h1>
                <p>
                    Round {round} of {totalRounds}
                </p>
            </header>
            <div
                className={`choice__container center hide-container ${
                    cardsHidden ? "hide" : ""
                }`}
            >
                <div
                    className={`column center fade-out-container 
                    ${voteStatus === "r" ? "fade-out" : ""}
                    `}
                >
                    <Card obj={props.finalList[leftIndex]} vote={leftVote} />
                </div>
                <p className="frame__soft-black">OR</p>
                <div
                    className={`column center fade-out-container ${
                        voteStatus === "l" ? "fade-out" : ""
                    }`}
                >
                    <Card
                        obj={props.finalList[leftIndex + 1]}
                        vote={rightVote}
                    />
                </div>
            </div>
        </>
    );
}

export default GamePlay;
