import { useRef, useState, useEffect } from "react";
import { useLocation as useReactLocation } from "react-router-dom";

const useOutsideDetection = (ref, setDropdown) => {
    useEffect(() => {
        //if click outside, set dropdown to false
        function handleClick(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setDropdown(false);
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClick);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClick);
        };
      }, [ref]);
}

const Dropdown = ({icon, content}) => {
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const location = useReactLocation()
    useOutsideDetection(dropdownRef, setDropdown);

    useEffect(() => {
        setDropdown(false)
    },[location])

    return (
        <div ref={dropdownRef} className="text-sm font-semibold leading-6 relative" >
            <div onClick={(e) => setDropdown(!dropdown)} className={`cursor-pointer duration-300 hover:scale-105 hover:text-red-500 ${dropdown ? "text-red-500" : ""}`}>
                {icon}
            </div>
            
            <div className={`absolute duration-300 ${dropdown ? "top-12 right-0 opacity-1" : "opacity-0 top-16 pointer-events-none"}  p-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-2xl border-2 border-gray-50`}>
                <div className="px-1 flex flex-col">
                    {content}
                </div>
            </div>
        </div>
    )
}


export default Dropdown;