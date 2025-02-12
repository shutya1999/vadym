"use client";
import axios from "axios";
import Link from "next/link";
import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
// import posts1 from "@/app/posts";

type Post = {
    id: number;
    title?: string;
    content?: string;
    url?: string;
    published?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);;
    const [loading, setLoading] = useState(true);
    // const { data: session } = useSession();
    // console.log(session);

    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_API_URL + 'posts')
            .then(function (response) {

                if (response.status === 200) {
                    setPosts(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
                // setError(error.message);
            })
            .finally(function () {
                setLoading(false);
            });



        // for (let post in posts1) {
            // console.log(posts1[post]);

            // const tdata = {
            //     content: posts1[post].html,
            //     published: true,
            //     title: posts1[post].title,
            //     url: post
            // };

            // console.log(tdata);
            // axios.post(`${process.env.NEXT_PUBLIC_API_URL}posts`, tdata)
            //     .then(function (response) {
            //         console.log(response);
                    
            //         if (response.status === 200) {
            //             // router.push(`/admin/posts/edit/${response.data.id}`);
            //             toast.success("Статтю успішно створено!");
            //         }
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //         toast.error(error.response.data.message + ` (${error.response.data.details.target[0]})`);
            //     });
        // }




    }, []);

    const deleteHandler = async (id: number) => {
        const isConfirmed = window.confirm("Ви впевнені, що хочете видалити цей запис?");

        if (!isConfirmed) return;

        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}posts/id/${id}`)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success("Статтю видалено");
                    window.location.reload();
                    // router.refresh();
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    if (loading) return <p>Завантаження...</p>;



    return (
        posts &&
        <>
            <Toaster />

            <h2 className="mb-4 text-4xl font-extrabold ">Статті</h2>

            <Link
                href={'/admin/posts/create'}
                className="inline-block mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Додати статтю</Link>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Назва
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Статус
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Дата створення
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Дата рудагування
                            </th>
                            <th scope="col" className="px-6 py-3 w-12 text-center">
                                Дії
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts && posts.map((post: Post) => (
                            <tr className="odd:bg-white even:bg-gray-50 border-b border-gray-200" key={post.id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    <Link className="text-blue-500 hover:text-blue-700 underline" href={`/${post.url}`}>{post.title}</Link>
                                </th>
                                <td className="px-6 py-4">
                                    {post.published ? <p className="text-green-400">Опубліковано</p> : <p className="text-red-400">Не опубліковано</p>}
                                </td>
                                <td className="px-6 py-4">
                                    {post.createdAt}
                                </td>
                                <td className="px-6 py-4">
                                    {post.updatedAt}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <Link href={`/admin/posts/edit/${post.id}`} className="text-blue-500 hover:text-blue-700">
                                            <Pencil size={18} />
                                        </Link>
                                        <button onClick={() => deleteHandler(post.id)} className="text-blue-500 hover:text-blue-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    );
}
