"use client";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import styles from "@/app/page.module.css";
import { notFound } from "next/navigation";


import axios from "axios";
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react";

type Post = {
    id?: number;
    title?: string;
    content?: string;
    url?: string;
    published?: boolean;
};
export default function BlogPage() {
    const params = useParams<{ slug: string }>();

    const [post, setPost] = useState<Post | null>(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}posts/slug/${params.slug}`)
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
                // setLoading(false);
            });
    }, [params.slug]);

    if (error) return notFound();


    return (
        (
            <div className={styles.container}>
                <Header className='short-header' />
                {
                    post &&
                    <main className={styles.main}>
                        <div className={`${styles.wrapper} ${styles['blog-post']}`}>

                            <div className={styles['blog-editor']}>
                                <div className={styles['blog-content']} dangerouslySetInnerHTML={{ __html: post?.content || '' }} />
                            </div>


                            <div className={styles.donate}>
                                P.S. Друзі, я також ділюся корисним контентом у своєму <a href="https://eidosdesign.substack.com">Substack</a>,
                                де ви можете оформити підписку з отриманням доступу до навчальних матеріалів та менторських консультацій
                                за запитом. Ви також можете підтримати «Ейдос» через <a href="buymeacoffee.com/vadimgrin">buymeacoffee</a>,
                                або поширенням цієї статті.
                                <br />
                                Дякую! 🤗
                            </div>

                        </div>
                    </main>
                }
                <Footer />
            </div>
        )
    );
}


// export default async function BlogLayout({ params }) {
//     const { blogSlug } = await params;
//     const post = posts[blogSlug];

//     if (!post) return notFound();

// return (
//     <div className={styles.container}>
//         <Header className='short-header' />
//         <main className={styles.main}>
//             <div className={`${styles.wrapper} ${styles['blog-post']}`}>
//                 {/* <ul className={styles.breadcrumbs}>
//                     <li><Link href="/">Home</Link></li>
//                     <li>⏳ {post.title}</li>
//                 </ul> */}

//                 <ProductList data={post} />

//                 <div className={styles.donate}>
//                     P.S. Друзі, я також ділюся корисним контентом у своєму <a href="https://eidosdesign.substack.com">Substack</a>,
//                     де ви можете оформити підписку з отриманням доступу до навчальних матеріалів та менторських консультацій
//                     за запитом. Ви також можете підтримати «Ейдос» через <a href="buymeacoffee.com/vadimgrin">buymeacoffee</a>,
//                     або поширенням цієї статті.
//                     <br />
//                     Дякую! 🤗
//                 </div>

//             </div>
//         </main>

//         <Footer />
//     </div>
// );
// }