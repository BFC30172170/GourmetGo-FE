import { UserIcon, ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useLocation } from 'lib/location';
import { useAuth } from 'lib/auth';
import { useBasket } from 'lib/basket';
import { useTheme } from 'lib/theme';
import Offline from 'components/Offline';
import Logo from 'components/Logo';
import ThemeToggle from 'components/ThemeToggle';
import Dropdown from 'components/Dropdown';
import Basket from 'components/Basket';
import { useToast } from 'lib/toast';

function Layout() {
    const auth = useAuth();
    const basket = useBasket();
    const toast = useToast();
    const navigate = useNavigate();

    return (
        <div className="relative">
            <Offline />
            {toast.show()}
            <header className="fixed inset-x-0 top-0 z-50 bg-gray-100 dark:bg-gray-900 transition duration-300">
                <nav className=" max-w-7xl mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    {/* Nav Left */}
                    <Logo />
                    {/* Nav Right */}
                    <div className="flex gap-6 text-gray-900 dark:text-gray-50 transition duration-300">
                        {/* User Menu */}
                        <Dropdown
                            icon={<UserIcon className="w-6 h-6" />}
                            content={auth.username === null ?
                                <>
                                    <NavLink to="/login" className="block px-2 py-2 my-1 text-sm rounded-lg duration-300 dark:hover:bg-gray-800 hover:bg-gray-200">Login</NavLink>
                                    <NavLink to="/signup" className="block px-2 py-2 my-1 text-sm rounded-lg duration-300 dark:hover:bg-gray-800 hover:bg-gray-200">Signup</NavLink>
                                </>
                                :
                                <>
                                    <li onClick={(e) => { auth.logout(); navigate('/'); }} className="block px-2 py-2 my-1 text-sm rounded-lg cursor-pointer duration-300 dark:hover:bg-gray-800 hover:bg-gray-200">Logout</li>
                                    <NavLink to="/profile" className="block px-2 py-2 my-1 text-sm rounded-lg duration-300 dark:hover:bg-gray-800 hover:bg-gray-200">{auth.username}'s Profile</NavLink>
                                </>
                            }
                        />

                        {/* Basket Menu */}
                        <Dropdown
                            icon={<div className='relative'><ShoppingCartIcon className="w-6 h-6">

                            </ShoppingCartIcon>
                            <div className='absolute -right-2 -top-3'>
                                {basket?.items?.reduce((n, { count }) => n + count, 0)}
                            </div></div>}
                            content={<Basket/>}
                        />

                        {/* Theme Menu */}
                        <ThemeToggle />
                    </div>
                </nav>
            </header>

            <Outlet />

            <footer className='h-32 pt-16 w-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 '>
                <div className="w-full bg-gray-100 dark:bg-gray-900 transition duration-300  mx-auto p-4 md:py-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <Logo />
                        <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                <a href="https://github.com/BFC30172170/GourmetGo-FE" className="hover:underline me-4 md:me-6">Github</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <p className='inline'>GourmetGo™</p>. All Rights Reserved.</span>
                </div>
            </footer>

        </div>

    )
}

export default Layout;
