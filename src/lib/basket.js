import React, { useEffect, useState, useContext, createContext } from 'react';

const basketContext = createContext();

export function BasketProvider({ children }) {
    const basket = useProvideBasket();
    return <basketContext.Provider value={basket}>{children}</basketContext.Provider>;
}

export const useBasket = () => {
    return useContext(basketContext);
};

function useProvideBasket() {
    const [items, setItems] = useState(JSON.parse(localStorage.items) || []);
    const [restaurant, setRestaurant] = useState(JSON.parse(localStorage.restaurant) || null);

    const addToBasket = (itemRestaurant, item) => {
        let newItems = items.slice();
        //If item is from a new restaurant, clear the basket first
        if (restaurant.id !== itemRestaurant.id){
            newItems = [];
        }
        newItems.push(item)
        setItems(newItems);
        setRestaurant(itemRestaurant);
        localStorage.setItem('items',JSON.stringify(newItems));
        localStorage.setItem('restaurant',JSON.stringify(itemRestaurant));
    }


    return {
        items,
        restaurant,
        addToBasket,
    }
};