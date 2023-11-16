import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/solid';

import { useLocation } from 'lib/location';
import { haversineDistance } from 'utils/distance';

function RestaurantIndex() {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState('');
    const location = useLocation();

    const getRestaurants = async () => {
        // Fetch restaurants
        const res = await fetch('https://654a0134e182221f8d524e9c.mockapi.io/Restaurants');
        const json = await res.json();
        let restaurants = json;
        // Get only those with search term
        restaurants = restaurants.filter((restaurant) => restaurant.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
        // If there are filters, apply them
        if (filters.length > 0) {
            restaurants = restaurants.filter((restaurant) => filters.includes(restaurant.category))
        }
        //Sort by smallest distance ascending
        restaurants.sort((a, b) => { return haversineDistance([a.longitude, a.latitude], [location.longitude, location.latitude]) - haversineDistance([b.longitude, b.latitude], [location.longitude, location.latitude]) });
        setRestaurants(restaurants);
    };

    useEffect(() => {
        //When filter or sort changes, refetch Restaurants with this criteria
        const timer = setTimeout(() => {
            getRestaurants();
            return;
        }, 350)

        return () => clearTimeout(timer);
    }, [filters, search])

    useEffect(() => {
        // When restaurants load, if there are not categories loaded yet, load each distinc tone
        if (categories.length < 1) {
            const cats = getDistinctCategories(restaurants);
            setCategories(cats);
        }
    }, [restaurants])

    const getDistinctCategories = (objects) => {
        //To get all distinct categories from restaurants
        //Get all the distinct categories
        let unique_values = objects
            .map((item) => item.category)
            .filter(
                (value, index, current_value) => current_value.indexOf(value) === index
            );
        //Then go through all of these, and get the counts of products with these categories
        const cats = [];
        unique_values.forEach(cat => {
            let newCat = {};
            newCat.name = cat;
            newCat.count = restaurants.filter((restaurant) => restaurant.category == cat).length;
            cats.push(newCat);
        });
        //Then sort them descending by count
        cats.sort((a, b) => b.count - a.count)
        return cats;
    }

    const handleFilter = async (e, i) => {
        // When a filter is clicked, check if it is active
        if (filters.includes(e.target.value)) {
            //If its active, inactivate it
            const newFilters = filters.slice();
            const index = newFilters.indexOf(e.target.value);
            newFilters.splice(index, 1);
            setFilters(newFilters);
        } else {
            // Otherwise activate it
            const newFilters = filters.slice();
            newFilters.push(e.target.value);
            setFilters(newFilters)
        }
    }

    return (
        <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 pt-32 min-h-screen">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-3 lg:grid-cols-4 gap-4">
                <div className='hidden lg:block col-span-1 row-span-1'></div>
                {/* Title */}
                <section className='col-span-3'> 
                <h1 className="text-4xl font-bold tracking-tight flex items-center">
                    Restaurants near <span className='text-red-500 flex items-center gap-1 pl-4'><Link to="/" className='duration-300 hover:-rotate-12 hover:scale-110'><PencilIcon className='w-6 h-6' /></Link>{location.area}, {location.postcode}</span>
                    </h1>
                </section>

                {/* Category sidebar */}
                <section aria-labelledby="products-heading" className="hidden lg:block col-span-1 row-span-4 rounded-2xl  ">
                    <form className=" bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
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
                                                <input id={`filter-category-${category.name}`} name="category[]" onChange={(e) => { handleFilter(e, i) }} value={category.name} type="checkbox" className="h-4 w-4 rounded border-gray-50 text-red-500 focus:ring-red-500 accent-red-500" />
                                                <label htmlFor={`filter-category-${category.name}`} className="ml-3 text-sm">{category.name} {category.count}</label>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </form>
                </section>

                {/* Search */}
                <section className="flex items-baseline justify-between col-span-3">
                    <input className='p-2 pl-6 rounded-2xl bg-gray-100 dark:bg-gray-900 w-full' placeholder='Search for a Restaurant' value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </section>

                {/* Product Grid */}
                <section className='col-span-3'>
                    <div className=" col-span-3 w-full p-4 max-w-7xl mx-auto transition duration-300">
                        <div className="w-full mx-auto grid grid-cols-2 lg:grid-cols-3 gap-4">
                            {restaurants.map((restaurant, i) => {
                                return (
                                    <Link to={`/restaurants/${restaurant.id}`} className="group" key={i}>
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-500 xl:aspect-h-8 xl:aspect-w-7">
                                            <img src={restaurant.image} alt={'food from ' + restaurant.name} className="h-full w-full object-cover object-center duration-300 group-hover:scale-105 group-hover:-rotate-1" />
                                        </div>
                                        <div className="flex justify-between mt-4 font-medium group-hover:text-red-500 duration-300">
                                            <h3 className="text-sm">{restaurant.name}</h3>
                                            <p className="text-sm text-right">{haversineDistance([restaurant.longitude, restaurant.latitude], [location.longitude, location.latitude])}km away</p>
                                        </div>
                                    </Link>
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