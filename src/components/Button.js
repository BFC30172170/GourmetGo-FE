import { Link } from "react-router-dom";

const Button = ({link,children,onClick}) => {

    return (
        <Link to={link} onClick={onClick} className="p-2 mt-2 w-full flex items-center justify-center bg-red-500 rounded-lg w-full duration-300 hover:scale-105 hover:bg-red-600" role="none">
            <p className="">{children}</p>
        </Link>
    )
}


export default Button;