import "./CardStatic.scss";

function CardStatic(props) {
    if (props.obj) {
        return (
            <>
                <article className="card-static ">
                    <div className="card-static__container">
                        <img
                            className="card-static__image"
                            src={props.obj.landscape[0]}
                        />
                        <div className="card-static__overlay center">
                            <button className="button" onClick={props.vote}>
                                Vote
                            </button>
                        </div>
                    </div>
                </article>
            </>
        );
    }
}

export default CardStatic;
