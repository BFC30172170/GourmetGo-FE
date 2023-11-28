import { CreditCardIcon, HomeIcon, UserIcon } from '@heroicons/react/24/solid';
import Basket from 'components/Basket';
import { useEffect, useState } from 'react';


function Checkout() {
    const [menu, setMenu] = useState('confirm order');
    const [fullName, setFullName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [flatDetails, setFlatDetails] = useState('');
    const [postcode, setPostcode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardSecurityCode, setCardSecurityCode] = useState('');

    const menus = [
        {
            step: 1,
            name: 'confirm order'
        },
        {
            step: 2,
            name: 'preparing order'
        },
        {
            step: 3,
            name: 'ready to collect'
        },
        {
            step: 4,
            name: 'at the restaurant'
        },
        {
            step: 5,
            name: 'out for delivery'
        },
        {
            step: 6,
            name: 'delivered'
        }
    ];

    const getUser = async () => {
        // Fetch User
        //const res = await fetch('https://654a0134e182221f8d524e9c.mockapi.io/Restaurants');
        //const json = await res.json();
        let account = {
            firstName: 'Brian',
            lastName: 'Test',
            username: 'Brian Test Account',
            email: 'Brian@email.com',
            houseNumber: '50a',
            streetName: 'Test Place',
            flatDetails: '',
            postcode: 'FY1 1AB',
            cardNumber: '1234 1234 1234 1234',
            cardSecurityCode: '123'
        }

        setFullName(account.firstName + ' ' + account.lastName);
        setHouseNumber(account.houseNumber);
        setStreetName(account.streetName);
        setFlatDetails(account.flatDetails);
        setPostcode(account.postcode);
        setCardNumber(account.cardNumber);
        setCardSecurityCode(account.cardSecurityCode);
    };

    const saveUser = async () => {
        // Save user
        //const res = await fetch('https://654a0134e182221f8d524e9c.mockapi.io/Restaurants');
        //const json = await res.json();
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 pt-32 min-h-screen">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 sm:px-8 grid grid-cols-3 sm:grid-cols-4 gap-4">
                <div className='hidden sm:block col-span-1 row-span-1'></div>
                {/* Title */}
                <section className='col-span-3'>
                    <h1 className="text-4xl font-bold tracking-tight flex items-center">
                        Your Order
                    </h1>
                </section>

                {/* menu sidebar*/}
                <section className="block sm:block col-span-4 row-span-4 sm:col-span-1 rounded-2xl">
                    <div className="flex bg-gray-100 dark:bg-gray-900 p-4 rounded-lg max-w-7xl w-full mx-auto">
                        <div className='flex sm:flex-col w-full mx-auto'>
                            <h3 className="font-bold hidden sm:block">Progress</h3>
                            <div className="flex sm:flex-col justify-around w-full" >
                                {menus.map((m, i) => {
                                    return (
                                        <>
                                            {/* Desktop */}
                                            <div onClick={() => setMenu(m.name)} className='relative items-center justify-start hidden sm:flex h-6 mt-2'>
                                                <div className={`w-6 h-6 rounded-full duration-300 border dark:bg-gray-700 bg-gray-300 border-4 ${m.name == menu ? 'border-red-500' : 'dark:border-gray-700 border-gray-300'}`}>

                                                </div>
                                                <div className='pl-2'>
                                                    {m.name}
                                                </div>
                                            </div>
                                            {/* Mobile */}
                                            <div onClick={() => setMenu(m.name)} className='flex sm:hidden w-full mx-auto'>
                                                <div className={`flex h-12 w-12 rounded-full duration-300 mx-auto border dark:bg-gray-700 bg-gray-300 border-8 ${m.name == menu ? 'border-red-500' : 'border-0 dark:border-gray-700 border-gray-300'}`}>

                                                </div>
                                                <p className='flex pl-2 pt-2 hidden sm:block'>
                                                    {m.name}
                                                </p>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </section>
                <h2 className='text-xl ml-2 w-full sm:hidden'>{menu}</h2>

                {/* Form Section */}
                <section className='col-span-4 sm:col-span-3'>
                    <div className=" w-full p-4 max-w-7xl mx-auto transition duration-300 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                        {/* Confirm Order form */}
                        {menu == 'confirm order' ?
                            <form className="w-full mx-auto grid grid-cols-4 gap-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                                {/* Username Input */}
                                <div className='w-full col-span-4'>
                                    <label htmlFor='fullName'>Full Name</label>
                                    <input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value) }} className="w-full rounded-lg bg-white dark:bg-black p-2 pl-4" id="fullName" />
                                </div>

                                {/* House Number Input */}
                                <div className='w-full col-span-4 sm:col-span-1'>
                                    <label htmlFor='houseNumber'>House Number</label>
                                    <input type="text" value={houseNumber} onChange={(e) => { setCardSecurityCode(e.target.value) }} className="w-full rounded-lg bg-white dark:bg-black p-2 pl-4" id="houseNumber" />
                                </div>

                                {/* Street Name Input */}
                                <div className='w-full col-span-4 sm:col-span-2'>
                                    <label htmlFor='streetName'>Street Name</label>
                                    <input type="text" value={streetName} onChange={(e) => { setCardSecurityCode(e.target.value) }} className="w-full rounded-lg bg-white dark:bg-black p-2 pl-4" id="streetName" />
                                </div>

                                {/* Street Name Input */}
                                <div className='w-full col-span-4 sm:col-span-1'>
                                    <label htmlFor='postcode'>Postcode</label>
                                    <input type="text" value={postcode} onChange={(e) => { setCardSecurityCode(e.target.value) }} className="w-full rounded-lg bg-white dark:bg-black p-2 pl-4" id="postcode" />
                                </div>
                                {/* Card Input */}
                                <div className='w-full col-span-4 sm:col-span-3'>
                                    <label htmlFor='cardNumber'>Card Number</label>
                                    <input type="text" value={cardNumber} onChange={(e) => { setCardNumber(e.target.value) }} className="w-full rounded-lg bg-white dark:bg-black p-2 pl-4" id="cardNumber" />
                                </div>

                                {/* cvc Input */}
                                <div className='w-full col-span-4 sm:col-span-1'>
                                    <label htmlFor='cardSecurityCode'>cvc</label>
                                    <input type="text" value={cardSecurityCode} onChange={(e) => { setCardSecurityCode(e.target.value) }} className="w-full rounded-lg bg-white dark:bg-black p-2 pl-4" id="cardSecurityCode" />
                                </div>
                                <Basket/>
                            </form>
                            : ''}

                        {/* Confirm Order form */}
                        {menu == 'preparing order' ?
                            <div className='animate-pulse'>PREPARING ORDER</div>
                            : ''}

                        {menu == 'ready to collect' ?
                            <div className='animate-pulse'>READY TO COLLECT</div>
                            : ''}

                        {menu == 'at the restaurant' ?
                            <div className='animate-pulse'>DRIVER AT RESTAURANT</div>
                            : ''}

                        {menu == 'out for delivery' ?
                            <div className='animate-pulse'>ON THE WAY</div>
                            : ''}

                        {menu == 'delivered' ?
                            <div className='animate-pulse'>DELIVERED</div>
                            : ''}

                    </div>



                </section>
            </main>
        </div>

    )
}

export default Checkout;