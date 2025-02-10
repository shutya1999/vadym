"use client";
import FormPost from "@/app/admin/components/post/Form";
import axios from "axios";
import Link from "next/link";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

type Post = {
    id?: number;
    title?: string;
    content?: string;
    url?: string;
    published?: boolean;
};


export default function EditPage() {
    const params = useParams<{ id: string }>();

    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}posts/id/${params.id}`)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    setPost(response.data);
                }
            })
            .catch(function (error) {
                setError(error.message);
            })
            .finally(function () {
                setLoading(false);
            });
    }, [params.id]);

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>{error}</p>;

    const handleFormSubmit = async (data: Post) => {
        axios.patch(`${process.env.NEXT_PUBLIC_API_URL}posts/id/${params.id}`, data)
            .then(function (response) {
                if (response.status === 200) {
                    toast.success("Статтю успішно відредаговано!");
                }
            })
            .catch(function (error) {
                // console.log(error);
                toast.error(error.response.data.message + ` (${error.response.data.details.target[0]})`);
            });
    }

    return (
        (
            <>
                <Toaster />
                
                {
                    post &&
                    <>
                        <h2 className="mb-4 text-4xl font-extrabold ">Edit post: «{post.title}»</h2>

                        <Link
                            href={'/admin'}
                            className="inline-block mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >Назад</Link>

                        <FormPost post={post} onSubmit={handleFormSubmit} />
                    </>
                }

            </>
        )

    );
}