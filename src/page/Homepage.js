import { useEffect, useState } from "react";
import { CheckIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { Link } from "react-router-dom";

import { useLocation } from "lib/location";

function HomePage() {
    const location = useLocation();
    const [input, setInput] = useState();

    //Immediatly set the Input 
    const handleInput = (e) => {
        e.preventDefault();
        setInput(e.target.value);
        location.updatePostcode(e.target.value);
    }

    //Debounce the input to verify
    useEffect(() => {
        const timer = setTimeout(() => {
            location.getLocationFromPostcode(input)
            return;
        }, 500)
        return () => clearTimeout(timer);
    }, [input])


    return (
        <div className="relative text-gray-900 dark:text-gray-50 pt-64 mx-auto transition duration-300 h-screen">
            <div className="max-w-7xl mx-auto  p-6 lg:px-8">
                <h1 className="text-4xl tracking-tight sm:text-6xl font-bold">Gourmet <span className="text-red-600">Go</span></h1>
                <p className="mt-2 mb-2 text-lg leading-8">Order delivery near you.</p>
                <div className="h-12 w-full bg-gray-50 dark:bg-gray-900 rounded-2xl flex pl-2 max-w-2xl">
                    {/* Geolocation button */}
                    <button className="hover:scale-110 duration-300" onClick={() => { location.getGeolocation() }}>
                        <MapPinIcon className="h-6 w-6 text-red-600 mr-2" />
                        </button>
                    {/* Postcode Input */}
                    <input id="postcode-search" placeholder="Enter your Postcode" value={`${location.postcode}`} className="font-bold w-full bg-gray-50 dark:bg-gray-900 uppercase relative" onChange={(e) => handleInput(e)} />
                    {/* Postcode Verification marker*/}
                    <CheckIcon className={`w-8 text-red-500 mr-2 duration-300 ${location.confirmed ? "opacity-100" : "opacity-0"}`} />
                    {/* Search Button */}
                    <Link to="/restaurants" className={`${location.confirmed ? "pointer-events-auto bg-red-500 hover:bg-red-600 opacity-100" : "pointer-events-none opacity-0"} text-gray-50 px-8 rounded-r-2xl ml-auto flex items-center duration-300`}>Search</Link>
                </div>
                <p className="mt-2 mb-2 text-lg leading-8"><Link to="/login" className="underline hover:font-bold hover:text-red-500 duration-300">Login</Link> or <Link to="/signup" className="underline hover:font-bold hover:text-red-500 duration-300">Sign Up</Link></p>
            </div>
            <div className="absolute h-full w-full top-0 left-0 right-0 bg-gray-200/70 dark:bg-gray-800/80 -z-10 backdrop-blur-xs"></div>
            <img className="absolute h-full w-full top-0 left-0 right-0 object-cover -z-20" src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
    )
}

export default HomePage;