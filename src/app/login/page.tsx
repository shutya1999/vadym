'use client'
import { signIn } from "next-auth/react";
import toast, { Toaster } from 'react-hot-toast';
import { FormEvent, useState } from 'react';


export default function AuthPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await signIn("credentials", {
            login,
            password,
            redirect: false,
        });        

        if (res?.error) {
            toast.error("Невірний логін або пароль !");
        }

        if (res?.status === 200) {
            window.location.href = '/admin';
        }
    };

    return (
        <>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Вхід
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="login" className="block mb-2 text-sm font-medium text-gray-900">Login</label>
                                    <input type="login" name="login" id="login" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required onInput={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Пароль</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                                </div>

                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster />
        </>



    );
}
