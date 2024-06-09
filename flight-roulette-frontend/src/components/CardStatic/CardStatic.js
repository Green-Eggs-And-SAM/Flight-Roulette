import "./CardStatic.scss";
import { useState, useEffect } from "react";

function CardStatic(props) {
    const [photoIndex, setPhotoIndex] = useState(0);

    const interval = 1500;
    // console.table(props.obj);
    useEffect(() => {
        // if (props.offset) {
        const repeat = setInterval(() => {
            // next photo
            setPhotoIndex(
                (prevIndex) => (prevIndex + 1) % props.obj.landscape.length
            );
        }, interval);

        return () => clearInterval(repeat);
    }, []);

    if (props.obj) {
        return (
            <>
                <article className="card-static ">
                    <div className="card-static__container">
                        <img
                            className="card-static__image"
                            src={props.obj.landscape[photoIndex]}
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
