import pexels from "../../assets/icons/pngwing.com.png";
import expedia from "../../assets/icons/2023-Logo-Expedia.png";
import tripAdvisor from "../../assets/icons/TripAdvisor_Logo.svg.png";
import "./Credit.scss";

function Credit() {
    return (
        <section className="credit__container center frame__soft-black">
            <p className="credit__subheader">Powered By:</p>
            <div className="credit__img-container">
                <a href="https://www.pexels.com/" target="_blank">
                    <img src={pexels} alt="Pexels" className="credit__icon" />
                </a>
                <a href="https://www.expedia.ca/" target="_blank">
                    <img src={expedia} alt="Expedia" className="credit__icon" />
                </a>
                <a href="https://www.tripadvisor.ca/" target="_blank">
                    <img
                        src={tripAdvisor}
                        alt="TripAdvisor"
                        className="credit__icon"
                    />
                </a>
            </div>
        </section>
    );
}

export default Credit;
