import { useEffect, useState } from 'react';
import { useLocation } from '../location';

function RestaurantIndex() {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState(null);
    const location = useLocation();

    const getRestaurants = async () => {
        const res = await fetch('https://654a0134e182221f8d524e9c.mockapi.io/Restaurants');
        const json = await res.json();
        let restaurants = json;
        restaurants = restaurants.filter((restaurant) => restaurant.name.indexOf(search) > -1)
        if (filters.length > 0) {
            restaurants = restaurants.filter((restaurant) => filters.includes(restaurant.category))
        }
        restaurants.sort((a, b) => { return a.name.localeCompare(b.name) });
        setRestaurants(restaurants);
    };

    useEffect(() => {
        getRestaurants();
    }, [filters, search, sort])

    useEffect(() => {
        const cats = getDistinctCategories(restaurants);
        setCategories(cats);
    }, [restaurants])

    function haversineDistance(coords1, coords2, isMiles) {
        function toRad(x) {
            return x * Math.PI / 180;
        }
        var lon1 = coords1[0];
        var lat1 = coords1[1];

        var lon2 = coords2[0];
        var lat2 = coords2[1];

        var R = 6371; // km

        var x1 = lat2 - lat1;
        var dLat = toRad(x1);
        var x2 = lon2 - lon1;
        var dLon = toRad(x2)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        if (isMiles) d /= 1.60934;

        return d.toFixed(0);
    }

    function getDistinctCategories(objects) {
        let unique_values = objects
            .map((item) => item.category)
            .filter(
                (value, index, current_value) => current_value.indexOf(value) === index
            );
        const cats = [];
        unique_values.forEach(cat => {
            let newCat = {};
            newCat.name = cat;
            newCat.count = restaurants.filter((restaurant) => restaurant.category == cat).length;
            cats.push(newCat);
        });
        return cats;
    }

    async function handleFilter(e, i) {
        if (filters.includes(e.target.value)) {
            const newFilters = filters.slice();
            const index = newFilters.indexOf(e.target.value);
            newFilters.splice(index, 1);
            setFilters(newFilters);
        } else {
            const newFilters = filters.slice();
            newFilters.push(e.target.value);
            setFilters(newFilters)
        }
        console.log(filters);
    }

    return (
        <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 pt-32 min-h-screen">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-3 lg:grid-cols-4 gap-4">
                <div className='hidden lg:block col-span-1 row-span-1'></div>
                <div className='col-span-3'> <h1 className="text-4xl font-bold tracking-tight">Restaurants near <span className='text-red-500'>{location.postcode}</span></h1></div>

                <section aria-labelledby="products-heading" className="hidden lg:block col-span-1 row-span-4 rounded-2xl  ">
                    <form className=" bg-white dark:bg-gray-900 p-4 rounded-lg">
                        <h3 className="sr-only">Categories</h3>
                        <div>
                            <h3 className="-my-3 flow-root">

                                <button type="button" className="flex w-full items-center justify-between py-3 text-sm  hover:" aria-controls="filter-section-0" aria-expanded="false">
                                    <span className="font-bold">Categories</span>
                                </button>
                            </h3>

                            <div className="pt-6" id="filter-section-0">
                                <div className="space-y-4">
                                    {categories.map((category, i) => {
                                        return (
                                            <div className="flex items-center" key={category.name}>
                                                <input id="filter-color-0" name="color[]" onChange={(e) => { handleFilter(e, i) }} value={category.name} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                                <label htmlFor="filter-color-0" className="ml-3 text-sm">{category.name} {category.count}</label>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </form>
                </section>
                <section className="flex items-baseline justify-between col-span-3">
                    {/* Search*/}
                    <input className='p-2 pl-6 rounded-2xl bg-gray-50 dark:bg-gray-900 w-full' placeholder='Search for a Restaurant' value={search} onChange={(e) => { setSearch(e.target.value) }} />

                </section>



                <section className='col-span-3'>
                    {/* Products */}
                    <div className=" col-span-3 w-full p-4 max-w-7xl mx-auto transition duration-300">
                        <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {restaurants.map((restaurant, i) => {
                                return (
                                    <a href="#" className="group" key={i}>
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-500 xl:aspect-h-8 xl:aspect-w-7">
                                            <img src={restaurant.image} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="h-full w-full object-cover object-center group-hover:opacity-75" />
                                        </div>
                                        <div className="flex justify-between mt-4">
                                            <h3 className="text-sm">{restaurant.name}</h3>
                                            <p className="text-sm font-medium text-right">{haversineDistance([restaurant.longitude, restaurant.latitude], [-3.020520, 53.809350])}km away</p>
                                        </div>
                                    </a>
                                )
                            })}
                        </div>
                    </div>


                </section>
            </main>
        </div>

    )
}

export default RestaurantIndex;