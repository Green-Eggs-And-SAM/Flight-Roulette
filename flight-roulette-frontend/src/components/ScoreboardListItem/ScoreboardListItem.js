import "./ScoreboardListItem.scss";

function ScoreboardListItem(props) {
    console.log(props);
    return (
        <>
            <li className="score-list-item frame__soft-black">
                <h5 className="no-margin score-list-item__name">
                    {props.name}
                </h5>
                <img
                    className={`score-list-item__flag ${
                        props.flag || `hidden`
                    }`}
                    src={props.flag}
                    alt="Flag"
                />
                <p className="score-list-item__points">{props.points}</p>
            </li>
        </>
    );
}

export default ScoreboardListItem;
