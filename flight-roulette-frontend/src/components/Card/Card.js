import "./Card.scss";

function Card(props) {
    if (props.obj) {
        return (
            <>
                <article className="card">
                    <div className="card-container">
                        <div className="card-front">
                            <img src={props.obj.landscape[0]} />
                        </div>
                        <div className="card-back column center">
                            <h1>{props.obj.name}</h1>
                            <a
                                href={`https://www.expedia.ca/Hotel-Search?destination=${props.obj.name}`}
                                target="_blank"
                            >
                                Hotels in {props.obj.name}{" "}
                            </a>
                            <button
                                className={`button ${
                                    props.vote ? "" : "hidden"
                                }`}
                                onClick={props.vote}
                            >
                                Vote
                            </button>
                        </div>
                    </div>
                </article>
            </>
        );
    }
}

export default Card;
