import { useLocation } from 'lib/location';
import mapboxgl, { Map, MapboxDirections } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { useState, useRef, useEffect } from 'react';
import "mapbox-gl/dist/mapbox-gl.css"


const generateLocation = (latitude, longitude, max, min = 0) => {
    const EARTH_RADIUS = 6371; // km
    const DEGREE = EARTH_RADIUS * 2 * Math.PI / 360 * 1000; // 1° latitude in meters
  
    const r = (max * 1000) * Math.random() ** 0.5;
    const theta = Math.random() * 2 * Math.PI; // random * (360deg in radians)
  
    const dy = r * Math.sin(theta);
    const dx = r * Math.cos(theta);
  
    const newLatitude = parseFloat(String(latitude + dy / DEGREE).substring(0,8))
    const newLongitude = parseFloat(String(longitude + dx / (DEGREE * Math.cos((latitude*Math.PI) / 180))).substring(0,8))
    console.log(newLongitude);
    console.log(newLatitude);
    return {
      newLatitude,
      newLongitude,
    };
  }

mapboxgl.accessToken = 'pk.eyJ1IjoiYmZjMzAxNzIxNzAiLCJhIjoiY2xvY3k2amc3MDJ4NDJqbWVuNjEyb2Y2ayJ9.j47klGxxi9Vr8-TiJiNsAw';

const MapComp = ({ rCoords }) => {
    let d = new Date(new Date().getTime() + (1000 * 60 * 20));
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [mapBox, setMapBox] = useState();
    const location = useLocation();
    const [lng, setLng] = useState(location.longitude);
    const [lat, setLat] = useState(location.latitude);
    let newC = {newLatitude:location.latitude+0.0001, newLongitude:location.longitude+0.0001}
    let rLongitude =rCoords[0] == 0 ? newC.newLongitude : rCoords[0];
    let rLatitude = rCoords[1] == 0 ? newC.newLatitude : rCoords[1];
    const [zoom, setZoom] = useState(12);
    const [route, setRoute] = useState([]);
    const [eta, setEta] = useState(d.getHours()+':'+d.getMinutes())
    const [time, setTime] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(()=>{
        if (map.current) return;
        setMap();
    })

    const setMap = async () => {
        // initialize map only once
        const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${rLongitude}%2C${rLatitude}%3B${location.longitude}%2C${location.latitude}?alternatives=false&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoiYmZjMzAxNzIxNzAiLCJhIjoiY2xvY3k2amc3MDJ4NDJqbWVuNjEyb2Y2ayJ9.j47klGxxi9Vr8-TiJiNsAw`)
        const json = await res.json();

        const coords = json.routes[0].geometry.coordinates;

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

            map2.addLayer({
                id: 'rider',
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
                    'circle-color': '#EF4444',
                    "circle-stroke-color": "#EF4444",
                    "circle-stroke-width": 3
                }
            });

            let i = 0;
            let route = 0;
            let duration =  json.routes[0].duration
            const timer2 = setInterval(() => {
                i = i + 10
                route = coords[Math.floor((i / duration) * coords.length)];
                console.log(route);
                let d = new Date(new Date().getTime() + ((duration-i)*1000));
                setEta(d.getHours()+':'+d.getMinutes());
                setPercent(Math.floor(time / eta * 100))
                console.log(route[time])
                    map2.getSource('rider').setData({
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: route
                                }
                            }
                        ]
                    })
                    map2.panTo(route);
                    i++;
            }, 10000);
        });

        map.current = map2
    }

    return (
        <div>
            <p className='bg-gray-50 dark:bg-gray-950 mb-2 rounded-2xl p-4 text-2xl'>Arriving at <span className='text-red-500 font-bold'>{eta}</span></p>
            <div ref={mapContainer} className="map-container h-96 rounded-2xl bg-gray-50 dark:bg-gray-950" />
        </div>
    );

}

export default MapComp