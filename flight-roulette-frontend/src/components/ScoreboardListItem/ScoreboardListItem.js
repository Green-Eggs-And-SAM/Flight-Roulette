import "./ScoreboardListItem.scss";
import useWindowDimensions from "../windowDimensions";
import { useEffect, useState } from "react";

function ScoreboardListItem(props) {
    console.log(useWindowDimensions());
    // const [isMobile, setMobile] = useState(true);
    // useEffect(() => {
    //     const width = useWindowDimensions().width;
    //     if (width < 768) setMobile(true);
    //     else setMobile(false);
    //     console.log(isMobile);
    // }, useWindowDimensions().width);

    const { height, width } = useWindowDimensions();
    const linkToHotel = (
        <a
            href={`https://www.expedia.ca/Hotel-Search?destination=${props.name}`}
            target="_blank"
        >
            {`Hotels${width < 768 ? `` : ` in ${props.name}`}`}
        </a>
    );
    const linkToActivities = (
        <a
            href={`https://www.tripadvisor.ca/Search?q=${props.name}&geo=1&ssrc=A&searchNearby=false`}
            target="_blank"
        >
            {`Activities${width < 768 ? `` : ` in ${props.name}`}`}
        </a>
    );

    const linkToRestaurants = (
        <a
            href={`https://www.tripadvisor.ca/Search?q=${props.name}&geo=1&ssrc=e&searchNearby=false`}
            target="_blank"
        >
            {`Restaurants${width < 768 ? `` : ` in ${props.name}`}`}
        </a>
    );

    const hotelCategory = <p>Hotels</p>;
    const activityCategory = <p>Things To Do</p>;
    const restaurantCategory = <p>Restaurants</p>;
    return (
        <>
            <li className="score-list-item frame__soft-black">
                <h5 className="no-margin score-list-item__name">
                    {props.name}
                </h5>
                <div className="score-list-item__flag--container">
                    <img
                        className={`score-list-item__flag ${
                            props.flag || `hidden`
                        }`}
                        src={props.flag}
                        alt="Flag"
                    />
                </div>
                <div>
                    <p className="score-list-item__points">{props.points}</p>
                </div>
                <div className="score-list-item__hotel">
                    {props.flag ? linkToHotel : hotelCategory}
                </div>
                <div className="score-list-item__activity">
                    {props.flag ? linkToActivities : activityCategory}
                </div>
                <div className="score-list-item__restaurant">
                    {props.flag ? linkToRestaurants : restaurantCategory}
                </div>
            </li>
        </>
    );
}

export default ScoreboardListItem;
