import { useLocation } from 'lib/location';
import mapboxgl, { Map, MapboxDirections } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { useState, useRef, useEffect } from 'react';
import "mapbox-gl/dist/mapbox-gl.css"

mapboxgl.accessToken = 'pk.eyJ1IjoiYmZjMzAxNzIxNzAiLCJhIjoiY2xvY3k2amc3MDJ4NDJqbWVuNjEyb2Y2ayJ9.j47klGxxi9Vr8-TiJiNsAw';

const MapComp = ({rCoords}) => {
    let [rLongitude,rLatitude] = rCoords
    // const map = new mapboxgl.Map({
    // 	container: 'map', // container ID
    // 	style: 'mapbox://styles/mapbox/streets-v12', // style URL
    // 	center: [-74.5, 40], // starting position [lng, lat]
    // 	zoom: 9, // starting zoom
    // });

    const mapContainer = useRef(null);
    const map = useRef(null);
    const location = useLocation();
    const [lng, setLng] = useState(location.longitude);
    const [lat, setLat] = useState(location.latitude);
    const [zoom, setZoom] = useState(9);
    const [route, setRoute] = useState([]);
    const [eta, setEta] = useState(20 * 60);

    const setMap = async () => {
        // initialize map only once
        const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${location.longitude}%2C${location.latitude}%3B${rLongitude}%2C${rLatitude}?alternatives=false&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoiYmZjMzAxNzIxNzAiLCJhIjoiY2xvY3k2amc3MDJ4NDJqbWVuNjEyb2Y2ayJ9.j47klGxxi9Vr8-TiJiNsAw`)
        const json = await res.json();

        const coords = json.routes[0].geometry.coordinates;
        setRoute(coords);
        setEta(Math.floor(json.routes[0].duration/60))
        console.log(json)


        const map2 = new Map({
            container: mapContainer.current,
            style: 'mapbox://styles/bfc30172170/clpwlyc2l00j801r513hiaktq',
            center: [lng, lat],
            zoom: zoom
        });
        map2.on('load', () => {
            map2.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': coords
                    }
                }
            });

            map2.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#EF4444',
                    'line-width': 4
                }
            });

            map2.addLayer({
                id: 'point',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: [location.longitude, location.latitude]
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 7,
                    'circle-color': '#374151',
                    "circle-stroke-color": "#EF4444",
                    "circle-stroke-width": 3
                }
            });

            map2.addLayer({
                id: 'rPoint',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: [rLongitude, rLatitude]
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 7,
                    'circle-color': '#374151',
                    "circle-stroke-color": "#EF4444",
                    "circle-stroke-width": 3
                }
            });
        });




        map.current = map2
    }
    useEffect(() => {
        if (map.current) return;
        setMap()

    }, []);

    return (
        <div>
            <p>Arriving in {eta} minutes </p>
            <div ref={mapContainer} className="map-container h-96 rounded-2xl" />
        </div>
    );

}

export default MapComp