import { useEffect, useState } from "react"

const TabsWrapper = ({ children }) => {
    return (
        <div className="flex relative sm:flex-col justify-between w-full" >
            {children}
        </div>
    )
}


const TabsLine = ({ max, current }) => {
    const [percent, setPercent] = useState('w-[100%]')
    useEffect(() => {
        // Get the percent completion, and set this to the line indicator with.
        let p = (current / max * 100)
        p = p.toFixed(0);
        if (p == 0) p = 1;
        setPercent(p);
    }, [current, max]);

    return (
        // Back line
        <div className='absolute sm:hidden z-0 left-0 right-0 top-0 bottom-0 mx-2 my-auto h-3 bg-gray-700 rounded-lg'>
            {/* Front Indicator Line */}
            <div className={`duration-500 absolute sm:hidden z-10 left-0 top-0 origin-left bottom-0 ml-1 mr-1 my-auto h-3 bg-red-500 rounded-lg`} style={{width:`${percent}%`}} />
        </div>
    )
}

const TabIcon = ({ name, icon, operation, active }) => {
    return (
        <>
            {/* Desktop */}
            <div onClick={() => operation()} className='cursor-pointer hidden sm:flex h-6 mt-2'>
                <div className={`w-6 h-6 rounded-full duration-300 border dark:bg-gray-700 bg-gray-300 border-4 ${active ? 'border-red-500' : 'dark:border-gray-700 border-gray-300'}`}>
                    {icon}
                </div>
                <div className='pl-2'>
                    {name}
                </div>
            </div>
            {/* Mobile */}
            <div onClick={() => operation()} className={`z-10 flex justify-center items-center sm:hidden h-10 w-10 xs:h-16 xs:w-16 rounded-full duration-300 border dark:bg-gray-700 bg-gray-300 border-8 cursor-pointer hover:scale-105 active:scale-125 ${active ? 'border-red-500' : 'border-0 dark:border-gray-700 border-gray-300'}`}>
                {icon}
            </div>
        </>
    )
}

const Tab = ({ children, active }) => {
    if (!active) return'';
    return (
        <section className='col-span-4 sm:col-span-3'>
            <div className=" w-full p-4 max-w-7xl mx-auto transition duration-300 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                {children}
            </div>
        </section>
    )
};

export { TabsWrapper, TabsLine, TabIcon, Tab }