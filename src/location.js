import React, {useEffect, useState, useContext, createContext } from 'react';

const locationContext = createContext();

export function LocationProvider({ children }) {
    const location = useProvideLocation();
    return <locationContext.Provider value={location}>{children}</locationContext.Provider>;
}

export const useLocation = () => {
    return useContext(locationContext);
};

function useProvideLocation() {
    const [latitude, setLatitude] = useState(localStorage.latitude || null);
    const [longitude, setLongitude] = useState(localStorage.longitude || null);
    const [postcode, setPostcode] = useState(localStorage.postcode || null)

    const getGeolocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            localStorage.setItem('latitude', position.coords.latitude);
            localStorage.setItem('longitude', position.coords.longitude);
            console.log(position)
        }, 
        () => { alert('unable to find location, please enter postcode') },
        {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: Infinity
        }
        )
        return { postcode, latitude, longitude };
    }

    const getPostcodeFromGeolocation = async (longitude,latitude) => {
        if(longitude !== null && latitude !== null){
        const res = await fetch(`https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`);
        const json = await res.json();
        setPostcode(json.result[0].outcode + ' ' + json.result[0].incode)
        localStorage.setItem('postcode', json.result[0].outcode + ' ' + json.result[0].incode);
        }
        return { postcode, latitude, longitude };
    }

    const getLocationFromPostcode = async (postcode) => {
        const res = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
        const json = await res.json();
        return { postcode, latitude, longitude };
    }

    const getEverything = async () => {
        const {longitude,latitude} = await getGeolocation();
        const location = await getPostcodeFromGeolocation(longitude,latitude);
    }

    useEffect(() => {
        getPostcodeFromGeolocation(longitude,latitude)
    }, [latitude,longitude]);

    return{
        latitude,
        longitude,
        postcode,
        getGeolocation,
        getPostcodeFromGeolocation,
        getLocationFromPostcode,
        getEverything
    }
};