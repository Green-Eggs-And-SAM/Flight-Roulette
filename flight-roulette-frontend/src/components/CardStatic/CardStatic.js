import "./CardStatic.scss";

function CardStatic(props) {
    if (props.obj) {
        return (
            <>
                <article className="card">
                    <div className="card-container">
                        <div className="card-front">
                            <img src={props.obj.landscape[0]} />
                        </div>

                        <button
                            className={`button ${props.vote ? "" : "hidden"}`}
                            onClick={props.vote}
                        >
                            Vote
                        </button>
                    </div>
                </article>
            </>
        );
    }
}

export default CardStatic;
