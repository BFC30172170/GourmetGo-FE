import { useState } from 'react';

function Login() {
    const [forename, setForename] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    
    return (
        <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 pt-32 min-h-screen">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-3 lg:grid-cols-4 gap-4">
                <div className='hidden lg:block col-span-1 row-span-3'></div>
                <div className='col-span-3 flex flex-col'> 
                <h1 className="text-4xl font-bold tracking-tight">Login</h1>
                </div>
                <section className='col-span-2'>
                    <div className=" w-full max-w-7xl mx-auto transition duration-300">
                        <form className="w-full mx-auto grid grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                            <div className='w-full col-span-2'>
                            <label htmlFor='email'>Email Address</label>
                            <input type="email" className="w-full rounded-lg bg-white dark:bg-black p-2 pl-4" id="email" value={email}/>
                            </div>

                            <div className='w-full col-span-2'>
                            <label htmlFor='password'>Password</label>
                            <input type="password" className="w-full rounded-lg bg-white dark:bg-black p-2 pl-4" id="password" value={password}/>
                            </div>
                            

                            <button type='submit' className='bg-red-500 col-span-2 p-4 rounded-lg text-lg font-bold'>Submit</button>
                        </form>
                    </div>


                </section>
            </main>
        </div>
    )
}

export default Login;