import bgVideo from "../../assets/earth-video.mp4";

function BackgroundVideo() {
    return (
        <div className="video-container">
            <video
                src={bgVideo}
                autoPlay
                muted
                loop
                id="earthVideo"
                typeof="video/mp4"
            >
                Your browser does not support HTML5 video.
            </video>
        </div>
    );
}
export default BackgroundVideo;
