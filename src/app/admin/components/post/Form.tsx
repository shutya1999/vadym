"use client"
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Link from "next/link";
import FileUploader from "../FileUploader";

const CustomEditor = dynamic(() => import('@/app/components/CKeditor'), { ssr: false });

type Post = {
    id?: number;
    title?: string;
    content?: string;
    url?: string;
    published?: boolean;
};

type FormPostProps = {
    post?: Post;
    onSubmit: (data: Post) => void;
};



export default function FormPost({ post, onSubmit }: FormPostProps) {
    const [editorData, setEditorData] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [published, setPublished] = useState<boolean>(false);
    // const router = useRouter();

    // Якщо передано post, то заповнюємо форму існуючими даними
    useEffect(() => {
        if (post) {
            setTitle(post.title || '');
            setUrl(post.url || '');
            setPublished(post.published || false);
            setEditorData(post.content || '');
        }
    }, [post]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (title.trim() === '' || url.trim() === '' || editorData.trim() === '') {
            return false;
        }

        const formData = {
            title,
            url,
            published,
            content: editorData,
        };
        onSubmit(formData);
    }


    return (
        <>
            <FileUploader />
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitHandler}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Заголовок</label>
                        <input value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            typeof="text"
                            placeholder="Заголовок"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">URL</label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="url" typeof="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                </div>



                <div className="mb-4" style={{ minHeight: '400px' }}>
                    <CustomEditor editorData={editorData} setEditorData={setEditorData} />
                </div>

                <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500  focus:ring-2" checked={published} onChange={(e) => setPublished(e.target.checked)} />
                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900">Опублікувати статтю</label>
                </div>

                <div className="flex items-center gap-4 sticky bottom-0 flex justify-end px-[10px] z-[4]">
                    <Link href={'/admin'} className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Відмінити
                    </Link>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Зберегти
                    </button>
                </div>
            </form>
        </>
    );
}
