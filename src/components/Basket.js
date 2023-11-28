import { useBasket } from "lib/basket";
import { Link } from "react-router-dom";

const Basket = () => {
    const basket = useBasket();
    let total = 0;
    return (
        <div className="">
            <h3 className="flex justify-between px-2 py-2 my-1 text-sm rounded-lg duration-300 dark:hover:bg-gray-800 hover:bg-gray-200 cursor-default">Basket - {basket?.restaurant?.name}</h3>
            <hr className="opacity-50 border-gray-900 dark:border-gray-50"/>
            {basket?.items.map((item, i) => {
                total += item?.price * item?.count;
                return (
                    <div class="flex justify-between px-2 py-2 my-1 text-sm rounded-lg duration-300 dark:hover:bg-gray-800 hover:bg-gray-200 cursor-default">
                        <p>{item?.count} * {item.name}</p>
                        <p>£{item?.price * item?.count}</p>
                    </div>
                )
            })}
            <hr className="opacity-50 border-gray-900 dark:border-gray-50"/>
            <div class="flex justify-between px-2 py-2 text-sm rounded-lg duration-300 dark:hover:bg-gray-800 hover:bg-gray-200 cursor-default">
                <p className='font-bold'>total</p>
                <p>£{total}</p>
            </div>
            <Link to="/checkout" className="p-2 mt-2 flex items-center justify-center bg-red-500 rounded-lg w-full duration-300 hover:scale-105 hover:bg-red-600" role="none">
                <p className="">Checkout</p>
            </Link>
        </div>
    )
}


export default Basket;