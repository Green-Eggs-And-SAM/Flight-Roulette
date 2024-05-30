import "./BackgroundVideo.scss";

function BackgroundVideo(props) {
    console.log(props);
    return (
        <div className="video-container">
            <video
                src={props.featuredVid}
                autoPlay
                muted
                loop
                className="videoPos "
                typeof="video/mp4"
            >
                Your browser does not support HTML5 video.
            </video>
        </div>
    );
}
export default BackgroundVideo;
