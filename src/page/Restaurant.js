import { useBasket } from 'lib/basket';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

function Restaurant() {
    const [restaurant, setRestaurant] = useState();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const { id } = useParams();
    const basket = useBasket();

    const getRestaurant = async () => {
        const res = await fetch(`https://654a0134e182221f8d524e9c.mockapi.io/Restaurants/${id}`);
        const json = await res.json();
        let restaurants = json;
        setRestaurant(restaurants);

        const res2 = await fetch('https://654a0134e182221f8d524e9c.mockapi.io/products')
        const json2 = await res2.json();
        let products = json2;
        products = products.filter((product) => product.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        setProducts(products);
    };

    useEffect(() => {
        const timer = setTimeout(()=>{
            getRestaurant();
            return;
            },350)
            return ()=>clearTimeout(timer);
    }, [search])

    return (
        <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 pt-32 min-h-screen">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-3 lg:grid-cols-4 gap-4">
                <div className='hidden lg:block col-span-1 row-span-1'></div>
                <div className='col-span-3 flex flex-col'> 
                <h1 className="text-4xl font-bold tracking-tight">{restaurant?.name}</h1>
                </div>
                <section aria-labelledby="products-heading" className="hidden lg:block col-span-1 row-span-4 rounded-2xl  ">
                    <form className=" bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                        <h3 className="sr-only">Basket</h3>
                        <div>
                            <h3 className="-my-3 flow-root">

                                <button type="button" className="flex w-full items-center justify-between py-3 text-sm  hover:" aria-controls="filter-section-0" aria-expanded="false">
                                    <span className="font-bold">Basket</span>
                                </button>
                                {basket.items.map((item,i) => {
                                        return(
                                            <a href="#" class="block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">{item.name} - £{item.price}</a>
                                        )
                                    })}     
                            </h3>

                            <div className="pt-6" id="filter-section-0">
                                <div className="space-y-4">


                                </div>
                            </div>
                        </div>
                    </form>
                </section>
                <section className="flex items-baseline justify-between col-span-3">
                    {/* Search*/}
                    <input className='p-2 pl-6 rounded-2xl bg-gray-100 dark:bg-gray-900 w-full' placeholder={`Search ${restaurant?.name}'s menu`} value={search} onChange={(e) => { setSearch(e.target.value) }} />

                </section>

                <section className='col-span-3'>
                    {/* Products */}
                    <div className=" col-span-3 w-full p-4 max-w-7xl mx-auto transition duration-300">
                        <div className="w-full mx-auto grid grid-cols-1 gap-4">
                            {products.map((product,i) => {
                                return (
                                    <div className="group flex" onClick={(e)=>{basket.addToBasket(restaurant,product)}}>
                                        <div>
                                        <div className=" h-full w-16 sm:w-24 lg:w-48 overflow-hidden rounded-lg bg-gray-500">
                                            <img src={product.image} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75" />
                                        </div>
                                        </div>
                                        <div className="flex flex-col column justify-start p-4">
                                            <div className='flex justify-between w-full'>
                                            <h3 className="text-lg font-bold">{product.name}</h3>
                                            <p className="text-xl font-bold text-right">£{product.price}</p>
                                            </div>
                                            
                                            <p className="text-xs">{product.description}</p>

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