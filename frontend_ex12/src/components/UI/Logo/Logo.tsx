import './Logo.css';
import Logotype from '../../../assets/img/logo.svg';
import { Link } from "react-router-dom";

const Logo: React.FunctionComponent = () => {
    return (
        <Link to={'/'} className={"Logo"}>
            <img className="Logo-img" src={Logotype} alt="Photos" />
        </Link>
    );
};

export default Logo;