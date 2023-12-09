import { useBasket } from "lib/basket";
import { Link } from "react-router-dom";
import Button from "./Button";

const Basket = () => {
    const basket = useBasket();
    let total = 0;
    return (
        <div className="">
            <h2 className="flex justify-between px-2 py-2 my-1 text-sm rounded-lg duration-300 dark:hover:bg-gray-800 hover:bg-gray-200 cursor-default">Basket - {basket?.restaurant?.name}</h2>
            <hr className="opacity-50 border-gray-900 dark:border-gray-50"/>
            {basket?.items.map((item, i) => {
                total += item?.price * item?.count;
                return (
                    <div className="flex justify-between px-2 py-2 my-1 text-sm rounded-lg duration-300 dark:hover:bg-gray-800 hover:bg-gray-200 cursor-default">
                        <p>{item?.count} * {item.name}</p>
                        <p>£{(item?.price * item?.count).toFixed(2)}</p>
                    </div>
                )
            })}
            <hr className="opacity-50 border-gray-900 dark:border-gray-50"/>
            <div className="flex justify-between px-2 py-2 text-sm rounded-lg duration-300 dark:hover:bg-gray-800 hover:bg-gray-200 cursor-default">
                <p className='font-bold'>total</p>
                <p>£{total.toFixed(2)}</p>
            </div>
            <Button link="/checkout">Checkout</Button>
        </div>
    )
}


export default Basket;