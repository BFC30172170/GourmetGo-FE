import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/solid';

import { useLocation } from 'lib/location';
import { haversineDistance } from 'utils/distance';
import Tile from 'components/Tile';
import apiClient from 'lib/api';
import { useToast } from 'lib/toast';
import useApiClient from 'lib/api';

function RestaurantIndex() {
    const [restaurants, setRestaurants] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState([]);
    const [search, setSearch] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const toast = useToast();
    const apiClient = useApiClient();

    const getRestaurants = async () => {
        // Fetch restaurants
        let [restaurants,err] = await apiClient.restaurant.getByRange(10000, location.postcode);
        if(!err){
        if (restaurants.length > 0) {
            // Get only those with search term
            restaurants = restaurants.filter((restaurant) => restaurant.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
            // If there are filters, apply them
            if (filters.length > 0) {
                restaurants = restaurants.filter((restaurant) => filters.includes(restaurant.restaurantType))
            }
            //Sort by smallest distance ascending
            restaurants.sort((a, b) => { return haversineDistance([a.longitude, a.latitude], [location.longitude, location.latitude]) - haversineDistance([b.longitude, b.latitude], [location.longitude, location.latitude]) });
            setRestaurants(restaurants);
        }
        }else{
            if (err.redirect !== false) {
                navigate(err.redirect);
            }
            toast.addToast({ message: err.message, status: err.status })
        }
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
            .map((item) => item.restaurantType)
            .filter(
                (value, index, current_value) => current_value.indexOf(value) === index
            );
        //Then go through all of these, and get the counts of products with these categories
        const cats = [];
        unique_values.forEach(cat => {
            let newCat = {};
            newCat.name = cat;
            newCat.count = restaurants.filter((restaurant) => restaurant.restaurantType == cat).length;
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
                    <h1 className="text-md sm:text-3xl font-bold tracking-tight flex items-center">
                        Restaurants near <span className='text-red-500 flex items-center gap-1 pl-2 sm:pl-4'><Link to="/" className='duration-300 hover:-rotate-12 hover:scale-110'><PencilIcon className='w-6 h-6' /></Link>{location.area}, {location.postcode}</span>
                    </h1>
                </section>

                {/* Category sidebar */}
                <section aria-labelledby="products-heading" className="hidden lg:block col-span-1 row-span-4 rounded-2xl  ">
                    <form className=" bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                        <h2 className="sr-only">Categories</h2>
                        <div>
                            <h2 className="-my-3 flow-root">

                                <button type="button" className="flex w-full items-center justify-between py-3 text-sm  hover:" aria-controls="filter-section-0" aria-expanded="false">
                                    <span className="font-bold">Categories</span>
                                </button>
                            </h2>

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
                                console.log(restaurant)
                                return (
                                    <Tile
                                        key={i}
                                        link={`/restaurants/${restaurant.id}`}
                                        image={restaurant.image}
                                        title={restaurant.name}
                                        subtitle={haversineDistance([restaurant.longitude, restaurant.latitude], [location.longitude, location.latitude]) + 'km away'}
                                    />
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