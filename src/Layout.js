import logodark from './logo-dark.svg';
import logolight from './logo-light.svg';
import {UserIcon,MoonIcon,ShoppingCartIcon,SunIcon} from '@heroicons/react/24/solid';
import useTheme from './hook/Theme';

function HomePage({children}) {
    const [theme, setTheme] = useTheme();
    const toggleTheme = (e) => {
        if (theme == 'light') {
            setTheme('dark');
        }else{
            setTheme('light');
        }
      };
    return (
        <div className="">
            <div >
                <header className="absolute inset-x-0 top-0 z-50 bg-gray-100 dark:bg-gray-900 transition duration-300">
                    <nav className=" max-w-7xl mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                        <div className="flex lg:flex-1">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                {theme == 'light' ? <img className="h-8 w-auto" src={logolight} alt="" /> : <img className="h-8 w-auto" src={logodark} alt="" />}
                            </a>
                        </div>
                        <div className="flex gap-6 text-gray-900 dark:text-gray-50 transition duration-300">
                            <a href="#" className="text-sm font-semibold leading-6"><UserIcon className="w-6 h-6"/></a>
                            <a href="#" className="text-sm font-semibold leading-6">{theme == 'light' ? <SunIcon className="w-6 h-6" onClick={(e)=>{toggleTheme()}}/> : <MoonIcon className="w-6 h-6" onClick={(e)=>{toggleTheme()}}/>}</a>
                            <a href="#" className="text-sm font-semibold leading-6"><ShoppingCartIcon className="w-6 h-6"/></a>
                        </div>
                    </nav>
                </header>

                {children}
            </div>

        </div>

    )
}

export default HomePage;
