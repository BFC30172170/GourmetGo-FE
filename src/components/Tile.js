import { Link } from "react-router-dom";

const Tile = ({link,image,title,subtitle}) => {
    return (
        <Link to={link} className="group">
            <div className="h-32 min-h-32 w-full overflow-hidden rounded-lg bg-gray-500">
                <img src={image || "https://www.bookmychefs.com/uploads/dish/default_food.jpg"} alt={'image of ' + title} className="h-full w-full bg-gray-300 object-cover object-center duration-300 group-hover:scale-105 group-hover:-rotate-1" />
            </div>
            <div className="flex justify-between mt-4 font-medium group-hover:text-red-500 duration-300">
                <h3 className="text-sm">{title}</h3>
                <p className="text-sm text-right">{subtitle}</p>
            </div>
        </Link>
    )
}

export default Tile;