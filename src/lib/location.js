import React, { useEffect, useState, useContext, createContext } from 'react';

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
    const [postcode, setPostcode] = useState(localStorage.postcode || '')
    const [area, setArea] = useState(localStorage.area || null)
    const [confirmed, setConfirmed] = useState(localStorage.confirmed || null)

    const getGeolocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            localStorage.setItem('latitude', position.coords.latitude);
            localStorage.setItem('longitude', position.coords.longitude);
            getPostcodeFromGeolocation(position.coords.longitude, position.coords.latitude);
        },
            () => { alert('unable to find location, please enter postcode') },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: Infinity
            }
        )
        return { postcode, area, latitude, longitude };
    }

    const getPostcodeFromGeolocation = async (longitude, latitude) => {
        if (longitude !== null && latitude !== null) {
            const res = await fetch(`https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`);
            const json = await res.json();
            if (json.status == 200) {
                setPostcode(json.result[0].outcode + ' ' + json.result[0].incode)
                setArea(json.result[0].admin_district);
                setConfirmed(true);
                localStorage.setItem('postcode', json.result[0].outcode + ' ' + json.result[0].incode);
                localStorage.setItem('area', json.result[0].admin_district);
                localStorage.setItem('confirmed', true);
            }
        }
        return { postcode, area, latitude, longitude };
    }

    const getLocationFromPostcode = async (postcode) => {
        const res = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
        const json = await res.json();

        if (json.status == 200) {
            setPostcode(json.result.outcode + ' ' + json.result.incode)
            setArea(json.result.admin_district);
            setLongitude(json.result.longitude);
            setLatitude(json.result.latitude);
            setConfirmed(true);
            localStorage.setItem('postcode', json.result.outcode + ' ' + json.result.incode);
            localStorage.setItem('area', json.result.admin_district);
            localStorage.setItem('longitude', json.result.longitude);
            localStorage.setItem('latitude', json.result.latitude);
            localStorage.setItem('confirmed', true);
        }
        return { postcode, area, latitude, longitude };
    }

    const updatePostcode = (postcode) => {
        setPostcode(postcode);
        setConfirmed(false);
        localStorage.setItem('confirmed', false);
    }

    const debounce = (func, delay=300) => {
        let timer;
        console.log('here')
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, delay);
        };
    }

    return {
        latitude,
        longitude,
        postcode,
        area,
        confirmed,
        getGeolocation,
        getPostcodeFromGeolocation,
        getLocationFromPostcode,
        updatePostcode
    }
};