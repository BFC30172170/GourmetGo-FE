import { BuildingStorefrontIcon, CheckIcon, CreditCardIcon, DocumentTextIcon, FireIcon, HomeIcon, ShoppingBagIcon, TruckIcon, UserIcon } from '@heroicons/react/24/solid';
import Basket from 'components/Basket';
import MapComp from 'components/Map';
import Map from 'components/Map';
import PizzaGame from 'components/PizzaGame';
import { TabIcon, TabsLine, TabsWrapper, Tab } from 'components/Tabs';
import { useEffect, useState } from 'react';

function Checkout() {
    const [fullName, setFullName] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [flatDetails, setFlatDetails] = useState('');
    const [postcode, setPostcode] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardSecurityCode, setCardSecurityCode] = useState('');
    const [currentTab, setCurrentTab] = useState(0);

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
                            <TabsWrapper>
                                <TabsLine max={5} current={currentTab} />
                                <TabIcon
                                    index={0}
                                    name='confirm order'
                                    operation={() => setCurrentTab(0)}
                                    icon={<DocumentTextIcon className='w-6 scale-75 z-20 h-6 sm:h-4 sm:w-4 m-auto' />}
                                    active={currentTab >= 0}
                                />
                                <TabIcon
                                    index={1}
                                    name='preparing order'
                                    operation={() => setCurrentTab(1)}
                                    icon={<FireIcon className='w-6 scale-75 z-20 h-6 sm:h-4 sm:w-4 m-auto' />}
                                    active={currentTab >= 1}
                                />
                                <TabIcon
                                    index={2}
                                    name='ready to collect'
                                    operation={() => setCurrentTab(2)}
                                    icon={<ShoppingBagIcon className='w-6 scale-75 z-20 h-6 sm:h-4 sm:w-4 m-auto' />}
                                    active={currentTab >= 2}
                                />
                                <TabIcon
                                    index={3}
                                    name='at the restaurant'
                                    operation={() => setCurrentTab(3)}
                                    icon={<BuildingStorefrontIcon className='w-6 scale-75 z-20 h-6 sm:h-4 sm:w-4 m-auto' />}
                                    active={currentTab >= 3}
                                />
                                <TabIcon
                                    index={4}
                                    name='out for delivery'
                                    operation={() => setCurrentTab(4)}
                                    icon={<TruckIcon className='w-6 scale-75 z-20 h-6 sm:h-4 sm:w-4 m-auto' />}
                                    active={currentTab >= 4}
                                />
                                <TabIcon
                                    index={5}
                                    name='delivered'
                                    operation={() => setCurrentTab(5)}
                                    icon={<HomeIcon className='w-6 scale-75 z-20 h-6 sm:h-4 sm:w-4 m-auto' />}
                                    active={currentTab >= 5}
                                />
                            </TabsWrapper>
                        </div>
                    </div>
                </section>
                {/* Form Section */}
                <Tab
                    index={0}
                    active={currentTab == 0}
                >
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
                            </Tab>
                            <Tab
                    index={1}
                    active={currentTab == 1}
                >
                            <div className='animate-pulse'>PREPATING ORDER</div>
                            </Tab>
                            <Tab
                    index={2}
                    active={currentTab == 2}
                >

                            <div className='animate-pulse'>READY TO COLLECT</div>
                            </Tab>
                            <Tab
                    index={3}
                    active={currentTab == 3}
                >
                            <div className='animate-pulse'>DRIVER AT RESTAURANT</div>
                            </Tab>
                            <Tab
                    index={4}
                    active={currentTab == 4}
                >
                            <MapComp rCoords={[-2.846396,53.857913]}/>
                            </Tab>
                            <Tab
                    index={5}
                    active={currentTab == 5}
                >
                            <div className='animate-pulse'>DELIVERED</div>
</Tab>



            </main>
        </div>

    )
}

export default Checkout;