import { CheckIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState, useContext, createContext } from 'react';

const toastContext = createContext();

export function ToastProvider({ children }) {
    const toast = useProvideToast();
    return <toastContext.Provider value={toast}>{children}</toastContext.Provider>;
}

export const useToast = () => {
    return useContext(toastContext);
};

function useProvideToast() {
    const [toasts, setToasts] = useState([]);

    const addToast = (toast) => {
        let id = Date.now() + 10000
        let newToasts = toasts.slice();
        newToasts.unshift({ id, ...toast });
        setToasts(newToasts);
    }

    // Given an index, removes the message from the array
    const deleteToast = (index) => {
        let newToasts = toasts.slice();
        newToasts = newToasts.filter((toast) => toast.id !== index);
        setToasts(newToasts);
    }

    const show = () => {
        console.log(toasts)
        return (
            <div className='fixed bottom-10 right-10 flex-col-reverse '>
                {toasts.map((toast, i) => {
                    return (
                        <div className="flex p-4 mt-4 text-sm justify-between items-center text-gray-900 dark:text-gray-50 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                            {toast?.status == 'success' ? <CheckIcon className='h-5 w-5 text-red-500'/> : <ExclamationTriangleIcon className='h-5 w-5 text-red-500'/> }
                            <p className='ml-2'>{toast?.message}</p>
                            <XMarkIcon className='h-5 w-5 ml-4 hover:scale-125 hover:text-red-500 duration-300' onClick={()=>{deleteToast(toast.id)}}/>
                        </div>
                    )
                })}
                
            </div>
        )
    }


    return {
        addToast,
        show,
    }
};