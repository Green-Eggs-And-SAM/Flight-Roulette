import "./CardStatic.scss";
import { useState, useEffect } from "react";

function CardStatic(props) {
    const [photoIndex, setPhotoIndex] = useState(0);

    const interval = 1000;

    useEffect(() => {
        const repeat = setInterval(() => {
            // Your function call here
            nextPhoto();
        }, interval);

        return () => clearInterval(repeat);
    }, []);

    const nextPhoto = () => {
        let nextIndex = photoIndex + 1;
        if (nextIndex >= props.obj.landscape.length) {
            nextIndex = 0;
        }
        console.log(nextIndex);
        setPhotoIndex(nextIndex);
    };

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
