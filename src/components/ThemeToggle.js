import { useTheme } from "lib/theme";
import { SunIcon, MoonIcon} from '@heroicons/react/24/solid';

const ThemeToggle = () => {
    const theme = useTheme();
    const toggleTheme = (e) => {
        if (theme.theme == 'light') {
            theme.setTheme('dark');
        } else {
            theme.setTheme('light');
        }
    };

    return (
        <div 
        className="text-sm font-semibold leading-6 hover:scale-105 hover:text-red-500 duration-300 cursor-pointer">
        {theme.theme == 'light' ? <SunIcon className="w-6 h-6" onClick={(e) => { toggleTheme() }} /> : 
                            <MoonIcon className="w-6 h-6" onClick={(e) => { toggleTheme() }} />}
        </div>
    )
}

export default ThemeToggle;