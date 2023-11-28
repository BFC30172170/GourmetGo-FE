import { useTheme } from "lib/theme";
import { NavLink } from "react-router-dom";
import { useLocation } from 'lib/location';
import logodark from 'logo-dark.svg';
import logolight from 'logo-light.svg';

const Logo = () => {
    const theme = useTheme();
    const location = useLocation();
    return (
        <div className="flex lg:flex-1">
            <NavLink to={location.postcode !== null ? '/restaurants' : '/'} className="-m-1.5 p-1.5">
                <span className="sr-only">GourmetGo</span>
                {theme.theme == 'light' ? <img className="h-8 w-auto" src={logolight} alt="" /> : <img className="h-8 w-auto" src={logodark} alt="" />}
            </NavLink>
        </div>
    )
}

export default Logo;