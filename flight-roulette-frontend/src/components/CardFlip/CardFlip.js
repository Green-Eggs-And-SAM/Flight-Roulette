import "./CardFlip.scss";
import { useState, useEffect } from "react";

function CardFlip(props) {
    const [photoIndex, setPhotoIndex] = useState(0);
    const interval = 3500;
    useEffect(() => {
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
                <article className="card">
                    <div className="card-container">
                        <div className="card-front">
                            <img
                                src={props.obj.landscape[photoIndex]}
                                className={`${props.imgClass} card__img`}
                            />
                        </div>
                        <div className="card-back column center">
                            <img className="card__flag" src={props.obj.flag} />
                            <h1>{props.obj.name}</h1>
                            <a
                                href={`https://www.expedia.ca/Hotel-Search?destination=${props.obj.name}`}
                                target="_blank"
                            >
                                Hotels in {props.obj.name}{" "}
                            </a>
                            <br />
                            <a
                                href={`https://www.tripadvisor.ca/Search?q=${props.obj.name}&geo=1&ssrc=A&searchNearby=false`}
                                target="_blank"
                            >
                                Activities in {props.obj.name}
                            </a>
                            <br />
                            <a
                                href={`https://www.tripadvisor.ca/Search?q=${props.obj.name}&geo=1&ssrc=e&searchNearby=false`}
                                target="_blank"
                            >
                                Restaurants in {props.obj.name}
                            </a>
                        </div>
                    </div>
                </article>
            </>
        );
    }
}

export default CardFlip;
