"use client"
import axios from "axios";
import Link from "next/link";
import FormPost from "../../components/post/Form";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';


type Post = {
    id?: number;
    title?: string;
    content?: string;
    url?: string;
    published?: boolean;
};

export default function CreatePage() {
    const router = useRouter()

    const handleFormSubmit = async (data: Post) => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}posts`, data)
            .then(function (response) {
                if (response.status === 200) {
                    router.push(`/admin/posts/edit/${response.data.id}`);
                    toast.success("Статтю успішно створено!");
                }
            })
            .catch(function (error) {
                console.log(error);
                toast.error(error.response.data.message + ` (${error.response.data.details.target[0]})`);
            });
    }


    return (
        <>
            <Toaster />

            <h2 className="mb-4 text-4xl font-extrabold ">Create</h2>

            <Link
                href={'/admin'}
                className="inline-block mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Назад</Link>

            <FormPost onSubmit={handleFormSubmit} />
        </>
    );
}
