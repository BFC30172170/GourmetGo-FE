import { useAuth } from 'lib/auth';
import { useToast } from 'lib/toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const auth = useAuth();
    const toast = useToast();
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');

    const handleLogin = async (e,username,password) => {
        e.preventDefault();
        const res = await auth.login(username,password);
        if (res !== '')
        navigate('/profile');
        toast.addToast({message:'Login Successful'})
    }
    
    return (
        <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50 pt-32 min-h-screen">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Login Form */}
                <div className='hidden lg:block col-span-1 row-span-3'></div>
                <div className='col-span-4 lg:col-span-3 flex flex-col'> 
                <h1 className="text-4xl font-bold tracking-tight">Login</h1>
                </div>
                <section className='col-span-3 lg:col-span-2'>
                    <div className=" w-full max-w-7xl mx-auto transition duration-300">
                        <form className="w-full mx-auto grid grid-cols-2 gap-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                            {/* Username/email Input */}
                            <div className='w-full col-span-2'>
                            <label htmlFor='email'>Email Address</label>
                            <input type="email" className="w-full rounded-lg bg-white dark:bg-black p-2 pl-4" id="email" value={email} onInput={(e)=>{setEmail(e.target.value)}}/>
                            </div>

                            {/* Password Input */}
                            <div className='w-full col-span-2'>
                            <label htmlFor='password'>Password</label>
                            <input type="password" className="w-full rounded-lg bg-white dark:bg-black p-2 pl-4" id="password" value={password} onInput={(e)=>{setPassword(e.target.value)}}/>
                            </div>
                            
                            {/* Error Message & submit button */}
                            <div className='w-full col-span-2 text-red-500'> {error} </div>
                            <button type='submit' className='bg-red-500 col-span-2 p-4 rounded-lg text-lg font-bold' onClick={(e)=>{handleLogin(e,email,password)}}>Submit</button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default Login;