import "./Footer.scss";

function Footer(props) {
    return (
        <>
            <div className="footer-padding"></div>
            <div
                className={`${
                    props.hide && `hidden`
                } footer__xtra-page-padding`}
            ></div>
            <footer className="row footer center">
                {props.leftButton || ``}
                {props.middleButton || ``}
                {props.rightButton || ``}
            </footer>
        </>
    );
}

export default Footer;
