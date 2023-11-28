import React, { useState, useEffect } from "react";

const Offline = () => {
  	const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [active, setActive] = useState(false);

    let timer;
  		
  	useEffect(() => {
    	function onlineHandler() {
      		setIsOnline(true);
            setActive(true)
            clearTimeout(timer);
            timer = setTimeout(() => {
                setActive(false);
            }, 4000);
    	}
	
    	function offlineHandler() {
      		setIsOnline(false);
              setActive(true)
              clearTimeout(timer);
              timer = setTimeout(() => {
                  setActive(false);
              }, 10000);
    	}
	
    	window.addEventListener("online", onlineHandler);
    	window.addEventListener("offline", offlineHandler);

	
    	return () => {
      		window.removeEventListener("online", onlineHandler);
      		window.removeEventListener("offline", offlineHandler);
    	};
  	}, []);

	
  	return (
    	<div>
      		<p className={`fixed duration-300 ${!active ? '-bottom-24' : 'bottom-0'} w-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} text-center py-2 z-50`}>
           {isOnline ? 'You are online.':
           'You are offline. You can continue to checkout, and your order will be made when you come back online.'} </p>
           
    	</div>
  	);
}

export default Offline;