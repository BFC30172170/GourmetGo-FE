import { UserIcon, MoonIcon, ShoppingCartIcon, SunIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

import { useLocation } from 'lib/location';
import { useAuth } from 'lib/auth';
import { useBasket } from 'lib/basket';
import useTheme from 'lib/theme';
import logodark from 'logo-dark.svg';
import logolight from 'logo-light.svg';

function Layout() {
    const [theme, setTheme] = useTheme();
    const auth = useAuth();
    const location = useLocation();
    const basket = useBasket();
    const [userDropdown, setUserDropdown] = useState(false);
    const [cartDropdown, setCartDropdown] = useState();
    const cartRef = useRef();
    const userRef = useRef();
    const toggleTheme = (e) => {
        if (theme == 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    const handleOffClick = (e) =>{
        if(cartRef && cartRef.current.contains(e.target)){
        }else{
            setCartDropdown(false);
        }
        if(userRef && userRef.current.contains(e.target)){

        }else{
            setUserDropdown(false);
        }


    }
    return (
        <div className="relative" onClick={(e) => {handleOffClick(e)}}>
            <header className="absolute inset-x-0 top-0 z-50 bg-gray-100 dark:bg-gray-900 transition duration-300">
                <nav className=" max-w-7xl mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <NavLink to={location.postcode !== null ? '/restaurants' : '/'} className="-m-1.5 p-1.5">
                            <span className="sr-only">GourmetGo</span>
                            {theme == 'light' ? <img className="h-8 w-auto" src={logolight} alt="" /> : <img className="h-8 w-auto" src={logodark} alt="" />}
                        </NavLink>
                    </div>
                    {/* User */}
                    <div className="flex gap-6 text-gray-900 dark:text-gray-50 transition duration-300">
                        <div ref={userRef} className="text-sm font-semibold leading-6 relative" onClick={(e) => setUserDropdown(true)}><UserIcon className="w-6 h-6" />
                            <div class={`absolute ${userDropdown ? "block" : "hidden"}  p-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1 flex flex-col" role="none">
                                {auth.user === null ?
                                    <>
                                    <NavLink to="/login" className="block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">Login</NavLink>
                                    <NavLink to="/signup" className="block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Signup</NavLink>
                                    </>
                                    :
                                    <>
                                    <li onClick={(e)=>{auth.logout()}}className="block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Logout</li>
                                    <NavLink to="/" className="block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">{auth.username}'s Profile</NavLink>
                                    </>
                                }
                                </div>
                            </div>
                        </div>

                        <div href="#" ref={cartRef} className="text-sm font-semibold leading-6 relative" onClick={(e) => setCartDropdown(true)}><ShoppingCartIcon className="w-6 h-6" />
                            <div class={`absolute ${cartDropdown ? "block" : "hidden"} p-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    {basket.items.map((item,i) => {
                                        return(
                                            <a href="#" class="block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">{item.name} - £{item.price}</a>
                                        )
                                    })}                       
                                </div>
                                <div class="py-1" role="none">
                                    <button href="#" className="px-4 py-2 text-sm bg-red-500 flex rounded-2xl mx-auto w-full text-center" role="menuitem" tabindex="-1" id="menu-item-2">Checkout</button>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-semibold leading-6">{theme == 'light' ? <SunIcon className="w-6 h-6" onClick={(e) => { toggleTheme() }} /> : <MoonIcon className="w-6 h-6" onClick={(e) => { toggleTheme() }} />}</a>
                    </div>
                </nav>
            </header>

           <Outlet/>

            <footer className='bg-gray-100 dark:bg-gray-900 transition duration-300 h-32 w-full'>
                footer
            </footer>

        </div>

    )
}

export default Layout;
