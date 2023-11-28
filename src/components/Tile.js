import { Link } from "react-router-dom";

const Tile = ({link,image,title,subtitle}) => {
    return (
        <Link to={link} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-500 xl:aspect-h-8 xl:aspect-w-7">
                <img src={image} alt={'image of ' + title} className="h-full w-full object-cover object-center duration-300 group-hover:scale-105 group-hover:-rotate-1" />
            </div>
            <div className="flex justify-between mt-4 font-medium group-hover:text-red-500 duration-300">
                <h3 className="text-sm">{title}</h3>
                <p className="text-sm text-right">{subtitle}</p>
            </div>
        </Link>
    )
}

export default Tile;