"use client"
import { useEffect, useState } from 'react';
import { Trash2, Copy, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Image from 'next/image';

interface ImageUploadProps {
    images: File[];
}

const FileCart = ({ imageData }: { imageData: string }) => {
    const [isDeleted, setIsDeleted] = useState(false); // Додаємо стан для відслідковування видаленого файлу


    const handleDelete = (url: string) => {
        if (url) {
            const isConfirmed = window.confirm("Ви впевнені, що хочете видалити зображення ?");

            if (!isConfirmed) return;

            const fileName = url.split('/').pop();

            axios.delete(`${process.env.NEXT_PUBLIC_API_URL}uploads`, {
                data: { filename: fileName }
            })
                .then(function (response) {
                    console.log(response);

                    if (response.status === 200) {
                        toast.success("Файл успішно видалено");
                        setIsDeleted(true);
                    }
                    // getImages();
                })
                .catch(function (error) {
                    console.log(error);
                    toast.error(error.response.data.message);
                });
        }
    }

    const handleCopy = (url: string) => {
        try {
            navigator.clipboard.writeText(url); // Копіюємо текст в буфер обміну
            toast.success('Посилання скопійовано');
        } catch (err) {
            console.log(err);
            toast.error('Помилка копіювання');
        }
    }

    if (isDeleted) {
        return null; // Якщо файл видалений, не відображаємо компонент
    }

    return (
        <div className='flex flex-col border border-gray-300 p-2 rounded-lg hover:bg-gray-200'>
            <Image className='w-full h-auto rounded' src={imageData} alt="" width={100} height={100} />

            <div className="mt-2 flex-1 basis-full flex items-end justify-center">
                {/* <p className='text-gray-700 text-xs mb-2'>File name</p> */}

                <div className="flex align-center justify-center gap-2">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleCopy(imageData)}>
                        <Copy size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(imageData)}>
                        <Trash2 size={16} />
                    </button>

                </div>
            </div>
        </div>
    );
}

export default function FileUploader() {
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [uploadImages, setUploadImages] = useState<ImageUploadProps['images']>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];

        if (files && files.length > 0) {
            files.forEach((file) => {
                const isImage = file.type.startsWith('image/');
                const isValidSize = file.size < 5 * 1024 * 1024; // Перевірка на розмір менше 5 МБ
                const isValidExtension = /\.(jpg|jpeg|png)$/i.test(file.name); // Перевірка на розширення .jpg, .jpeg, .png

                if (!isImage) {
                    toast.error(`Файл "${file.name}" не є зображенням.`);
                } else if (!isValidSize) {
                    toast.error(`Файл "${file.name}" занадто великий. Розмір має бути менше 5 МБ.`);
                } else if (!isValidExtension) {
                    toast.error(`Файл "${file.name}" має неправильне розширення. Дозволені формати: .jpg, .jpeg, .png.`);
                }
            });

            // Фільтруємо лише валідні зображення
            const validImages = files.filter((file) => {
                const isImage = file.type.startsWith('image/');
                const isValidSize = file.size < 5 * 1024 * 1024;
                const isValidExtension = /\.(jpg|jpeg|png)$/i.test(file.name);
                return isImage && isValidSize && isValidExtension;
            });

            setUploadImages((prevImages) => [
                ...prevImages,
                ...validImages.map((file) => file),
            ]);
        }
    };

    useEffect(() => {
        uploadFilesToServer();
    }, [uploadImages]); // Залежність від validFiles


    const uploadFilesToServer = async () => {
        if (uploadImages.length > 0) {
            const formData = new FormData();
            uploadImages.forEach((file) => {
                formData.append('files', file);
            });

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}uploads`, formData)
                .then(function (response) {
                    if (response.status === 200) {
                        toast.success("Файли успішно збережено");
                    }
                    getImages();
                    setUploadImages([]);
                })
                .catch(function (error) {
                    setUploadImages([]);
                    toast.error(error.response.data.message);
                });
        }
    }

    const getImages = async () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}uploads`)
            .then(function (response) {
                if (response.status === 200) {
                    setImages(response.data.files);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleModalShow = (state: boolean) => {
        if (images.length === 0) {
            getImages();
        }
        setIsOpen(state);
    }

    return (

        <>
            <div className='mb-5'>
                <button 
                    onClick={() => handleModalShow(!isOpen)} 
                    className="bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded" type="button">
                    Завантажити зображення
                </button>
            </div>

            {isOpen && (
                <>
                    <div id="default-modal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full">

                        <div className="w-full max-w-5xl max-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 5 }}>
                            <button className='absolute top-4 right-4 hover:text-red-700' onClick={() => handleModalShow(false)}>
                                <X size={24} />
                            </button>
                            <div className='pt-14 pr-5 pb-5 pl-5 bg-gray-100'>
                                <div className='flex justify-between items-center border-b border-gray-300 pb-5'>
                                    <h2 className='text-gray-700 text-xl'>File Manager</h2>

                                    <div>
                                        <input type="file" id='file' onChange={handleFileChange} className='hidden' accept='image/*' multiple />
                                        <label className='bg-blue-500 text-white p-2 rounded hover:bg-blue-700' htmlFor="file">Завантажити фото</label>
                                    </div>

                                </div>

                                <div className='grid grid-cols-7 gap-4 p-4 overflow-auto max-h-[70vh]'>
                                    {
                                        images.map((item) => (
                                            <FileCart key={item} imageData={item} /> // Add a JSX element here
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="overlay fixed top-0 right-0 left-0 z-4 bg-black bg-opacity-50 w-full h-full" style={{ zIndex: 4 }} onClick={() => handleModalShow(false)}></div>
                    </div>


                </>
            )}

            <Toaster />

        </>


        // <form onSubmit={handleSubmit}>
        //     <input type="file" onChange={handleFileChange} />
        //     <button type="submit">Upload</button>
        // </form>
    );
}
