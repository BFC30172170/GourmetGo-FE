import React, { useEffect, useState, useContext, createContext } from 'react';
import { Link } from 'react-router-dom';

const basketContext = createContext();

export function BasketProvider({ children }) {
    const basket = useProvideBasket();
    return <basketContext.Provider value={basket}>{children}</basketContext.Provider>;
}

export const useBasket = () => {
    return useContext(basketContext);
};

function useProvideBasket() {
    const [items, setItems] = useState(localStorage.items ? JSON.parse(localStorage.items) : []);
    const [restaurant, setRestaurant] = useState(localStorage.items ? JSON.parse(localStorage.restaurant) : null);

    const addToBasket = (itemRestaurant, item) => {
        let newItems = items.slice();
        //If item is from a new restaurant, clear the basket first
        if (restaurant?.id !== itemRestaurant?.id) {
            newItems = [];
        }
        if (newItems.filter(i => i.name == item?.name).length > 0) {
            let newItem = items.find(i => i.name == item?.name);
            newItem.count = newItem.count + 1;
        } else {
            newItems.push({ count: 1, ...item })
        }
        setItems(newItems);
        setRestaurant(itemRestaurant);
        localStorage.setItem('items', JSON.stringify(newItems));
        localStorage.setItem('restaurant', JSON.stringify(itemRestaurant));
    }

    const show = () => {
        let total = 0;
        return (
            <div className="py-1">
                <h3 className="flex text-sm pb-2 font-bold border-b-2 border-gray-50/30">Basket - {restaurant?.name}</h3>
                {items.map((item, i) => {
                    total += item?.price * item?.count;
                    return (
                        <div className="flex py-2 px-1 text-sm justify-between">
                            <p>{item?.count} * {item.name}</p>
                            <p>£{item?.price * item?.count}</p>
                        </div>
                    )
                })}
                <div className="flex py-2 text-sm justify-between border-t-2 border-gray-50/30">
                    <p className='font-bold'>total</p>
                    <p>£{total}</p>
                </div>
                <Link to="/checkout" className="py-2 flex items-center justify-center bg-red-500 rounded-lg w-full duration-300 hover:scale-105 hover:bg-red-600" role="none">
                    <p className="">Checkout</p>
                </Link>
            </div>
        )
    }


    return {
        items,
        restaurant,
        addToBasket,
        show
    }
};