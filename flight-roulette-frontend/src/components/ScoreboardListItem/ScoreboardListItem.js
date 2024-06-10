import "./ScoreboardListItem.scss";

function ScoreboardListItem(props) {
    console.log(props);
    const linkToHotel = (
        <a
            href={`https://www.expedia.ca/Hotel-Search?destination=${props.name}`}
            target="_blank"
        >
            Hotels in {props.name}
        </a>
    );

    const hotelCategory = <p>Hotels</p>;
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
            </li>
        </>
    );
}

export default ScoreboardListItem;