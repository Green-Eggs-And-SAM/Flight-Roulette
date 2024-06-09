import "./Footer.scss";

function Footer(props) {
    return (
        <>
            <footer className="row footer center">
                {props.leftButton || ``}
                {props.rightButton || ``}
            </footer>
        </>
    );
}

export default Footer;
