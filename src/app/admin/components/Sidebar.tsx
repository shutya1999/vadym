"use client"
import Link from "next/link";
import { LogOut } from 'lucide-react';
import { signOut } from "next-auth/react";

export default function Sidebar() {

    return (
        <>
            <div className="w-60 flex h-screen flex-col justify-between border-e bg-white">
                <div className="px-4 py-6">
                    <span className="grid h-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
                        Admin
                    </span>

                    <ul className="mt-6 space-y-1">
                        <li>
                            <Link
                                href={'/admin/'}
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >Cтатті</Link>
                        </li>
                        <li>
                            <Link
                                href={'/admin/posts/create'}
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >Додати статтю</Link>
                        </li>
                        <li>
                            <Link
                                href={'/'}
                                target="_blank"
                                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >Перейти на сайт</Link>
                        </li>

                        {/* 
                        <li>
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary
                                    className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="text-sm font-medium"> Блог </span>

                                    <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="size-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </summary>

                                <ul className="mt-2 space-y-1 px-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            Всі статті
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            Створити статтю
                                        </a>
                                    </li>
                                </ul>
                            </details>
                        </li> */}
                    </ul>
                </div>

                
                <button type="button" className="flex items-center gap-2 px-4 py-2 mx-4 my-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 justify-center" onClick={() => signOut()}>
                    <LogOut />
                    Вийти
                </button>



            </div>
        </>
    );
}
