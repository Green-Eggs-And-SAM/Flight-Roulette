import "./CardStatic.scss";
import { useState, useEffect } from "react";

function CardStatic(props) {
    const [photoIndex, setPhotoIndex] = useState(0);

    const interval = 2000;

    //alternate between left and right photos.
    var alternate = false;
    if (props.offset) alternate = !alternate;

    useEffect(() => {
        const repeat = setInterval(() => {
            // next photo
            if (alternate) {
                setPhotoIndex(
                    (prevIndex) => (prevIndex + 1) % props.obj.landscape.length
                );
            }
            alternate = !alternate;
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
