import { useEffect, useState } from "react";
import {CheckIcon, MapPinIcon} from '@heroicons/react/24/solid';
import { useLocation } from "../location";
import { Link } from "react-router-dom";

function HomePage() {
    const location = useLocation();
    const [input,setInput] = useState();

    //Immediatly set the 
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
        <div class="relative text-gray-900 dark:text-gray-50 pt-64 mx-auto transition duration-300 h-screen w-screen">
            <div className="max-w-7xl mx-auto  p-6 lg:px-8">
                <h1 class="text-4xl font-bold tracking-tight sm:text-6xl font-bold">Gourmet <span className="text-red-600">Go</span></h1>
                <p class="mt-2 mb-2 text-lg leading-8">Order delivery near you.</p>
                <div class="h-12 w-full bg-gray-50 dark:bg-gray-900 rounded-2xl flex pl-2 max-w-2xl">
                    <button className="hover:scale-110 duration-300"onClick={() => {location.getGeolocation()}}><MapPinIcon class="h-6 w-6 text-red-600 mr-2" /></button> 
                    <input value={`${location.postcode}`} class="font-bold w-full bg-gray-50 dark:bg-gray-900 uppercase relative" onInput={(e)=>handleInput(e)} />
                    <CheckIcon className={`w-8 text-red-500 mr-2 duration-300 ${location.confirmed ? "opacity-100" : "opacity-0"}`}/>
                    <Link to="/restaurants" className={`${location.confirmed ? "pointer-events-auto bg-red-600":"pointer-events-none bg-gray-500"} text-gray-50 px-8 rounded-r-2xl ml-auto flex items-center duration-300`}>Search</Link>
                    </div>
                <p class="mt-2 mb-2 text-lg leading-8"><a className="underline">Login</a> or <a className="underline">Sign Up</a></p>
            </div>
            <div className="absolute h-full w-full top-0 left-0 right-0 bg-gray-200/70 dark:bg-gray-800/80 -z-10 backdrop-blur-xs"></div>
            <img className="absolute h-full w-full top-0 left-0 right-0 object-cover -z-20" src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
    )
}

export default HomePage;