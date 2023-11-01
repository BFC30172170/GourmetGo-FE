import { useState } from "react";
import {MapPinIcon} from '@heroicons/react/24/solid';

function HomePage() {
    const [postcode, setPostcode] = useState('');

    const getPostcode = async () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position)
            const res = await fetch(`https://api.postcodes.io/postcodes?lon=${position.coords.longitude}&lat=${position.coords.latitude}`);
            const json = await res.json();
            setPostcode(json.result[0].outcode + ' ' + json.result[0].incode)
        });
    };

    const updatePostcode = async (e) => {
        e.preventDefault();
        setPostcode(e.target.value);
    }

    return (
        <div class="text-gray-900 dark:text-gray-50 p-4 pt-64 max-w-7xl mx-auto transition duration-300">
            <div>
                <h1 class="text-4xl font-bold tracking-tight sm:text-6xl font-bold">Gourmet <span className="text-red-600">Go</span></h1>
                <p class="mt-2 mb-2 text-lg leading-8">Order delivery near you.</p>
                <div class="h-12 w-full bg-gray-50 dark:bg-gray-900 rounded-2xl flex pl-2 max-w-2xl"><button onClick={() => getPostcode()}><MapPinIcon class="h-6 w-6 text-red-600 mr-2" /></button> <input value={postcode} class="font-bold w-full bg-gray-50 dark:bg-gray-900 uppercase" onInput={(e)=>updatePostcode(e)} /> <button className="bg-red-600 text-gray-50 px-8 rounded-r-2xl ml-auto">Search</button></div>
                <p class="mt-2 mb-2 text-lg leading-8"><a className="underline">Login</a> or <a className="underline">Sign Up</a></p>
            </div>
            <div className="absolute h-full w-full top-0 left-0 right-0 bg-gray-200/70 dark:bg-gray-800/80 -z-10 backdrop-blur-xs"></div>
            <img className="absolute h-full w-full top-0 left-0 right-0 object-cover -z-20" src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
        </div>
    )
}

export default HomePage;