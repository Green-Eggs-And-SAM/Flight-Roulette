import { useState, useEffect } from "react";
import ScoreboardListItem from "../ScoreboardListItem/ScoreboardListItem";
import axios from "axios";

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const baseUrl = "http://localhost:5050";
    useEffect(() => {
        const fetchNamesAndFlags = async () => {
            try {
                const targetURL = `${baseUrl}/destinations/names-flags-list`;

                const response = await axios.get(targetURL);
                const data = response.data;
                data.sort((a, b) => b.points - a.points);
                console.table(data);
                setLeaderboard(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        setLoading(true);
        fetchNamesAndFlags();
    }, []);
    if (loading) return <h1>LOADING...</h1>;
    return (
        <div className="column">
            <h1 className="center frame__hard-yellow">GLOBAL LEADERBOARD</h1>
            <p className="center frame__soft-black">
                Here are the total scores added up from every user around the
                world
            </p>
            <ScoreboardListItem
                name={"City/Country"}
                points={"Global Points Total"}
            />
            {leaderboard.map((destination) => (
                <ScoreboardListItem
                    name={destination.name}
                    points={destination.points}
                    flag={destination.flag}
                />
            ))}
        </div>
    );
}

export default Leaderboard;
