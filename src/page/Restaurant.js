import { PhoneIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import Basket from 'components/Basket';
import { useBasket } from 'lib/basket';
import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import apiClient from 'lib/api';
import useApiClient from 'lib/api';
import Dropdown from 'components/Dropdown';


function Restaurant() {
    const [restaurant, setRestaurant] = useState();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const { id } = useParams();
    const basket = useBasket();
    const apiClient = useApiClient();

    const getRestaurant = async () => {
        const [data,err] = await apiClient.restaurant.getByID(id);

        const res = await fetch(`https://api.postcodes.io/postcodes/${data.postcode}`);
        const json = await res.json();
        console.log(data);
        console.log(json);
        if (json.status == 200) {
            data.longitude = json.result.longitude
            data.latitude = json.result.latitude
        }

        setRestaurant(data);

        let products = data.menu
        console.log(products);
        products = products.filter((product) => product?.name?.toLowerCase().indexOf(search.toLowerCase()) > -1)
        setProducts(products);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            getRestaurant();
            return;
        }, 350)
        return () => clearTimeout(timer);
    }, [search])

    return (
        <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 pt-32 min-h-screen">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-3 lg:grid-cols-4 gap-4">
                <div className='hidden lg:block col-span-1 row-span-1'></div>
                <section className='col-span-3 flex items-center justify-between'>
                    <h1 className="text-4xl font-bold tracking-tight">{restaurant?.name}</h1>
                    <Dropdown icon={<PhoneIcon className='w-6 h-6'/>} content={
                    <div className='flex flex-col'>
                        <p>{restaurant?.contactInfo}</p>
                        <p>{restaurant?.address}, {restaurant?.postcode}</p>
                    </div>}>                      
                    </Dropdown>
                </section>
                <section className="hidden lg:block col-span-1 row-span-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg h-fit ">
                    <Basket/>
                </section>

                <section className="flex items-baseline justify-between col-span-3">
                    {/* Search*/}
                    <input className='p-2 pl-6 rounded-2xl bg-gray-100 dark:bg-gray-900 w-full' placeholder={`Search ${restaurant?.name}'s menu`} value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </section>

                <section className='col-span-3'>
                    {/* Products */}
                    <div className=" col-span-3 w-full p-4 max-w-7xl mx-auto transition duration-300">
                        <div className="w-full mx-auto grid grid-cols-1 gap-4">
                            {products.map((product, i) => {
                                return (
                                    <div key={i} className="group flex cursor-pointer" onClick={(e) => { basket.addToBasket(restaurant, product); }}>
                                        <div>
                                            <div className=" h-full w-16 sm:w-24 lg:w-48 overflow-hidden rounded-lg bg-gray-500">
                                                <img src={product.imageUrl || "https://www.bookmychefs.com/uploads/dish/default_food.jpg"} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full max-h-32 min-h-24 object-cover object-center duration-300 group-hover:scale-105 group-hover:-rotate-1" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col column justify-start p-4 pt-1 w-full">
                                            <div className='flex justify-between w-full'>
                                                <h3 className="flex text-lg font-bold group-hover:text-red-500">{product.name}<PlusCircleIcon className='ml-2 w-6 h-6 text-red-500 duration-300 opacity-0 group-hover:opacity-100 '/></h3>
                                                <p className="text-xl font-bold text-right">£{product.price}</p>
                                            </div>

                                            <p className="text-xs">{product?.description}</p>

                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Restaurant;