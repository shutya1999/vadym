import type { Metadata } from 'next'
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import styles from "@/app/page.module.css";
import { JSDOM } from "jsdom";


import axios from 'axios';
import { notFound } from 'next/navigation';

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const slug = (await params).slug;
    const { data: post } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}posts/slug/${slug}`);
    if (post.error) {
        return {
            title: 'Сторінку не знайдено',
        }
    }

    // Парсимо HTML, щоб знайти перше зображення
    let firstImageUrl: string | undefined;
    if (post.content) {
        const dom = new JSDOM(post.content);
        const firstImg = dom.window.document.querySelector("img");
        if (firstImg) {
            firstImageUrl = firstImg.getAttribute("src") || undefined;
        }
        firstImageUrl = firstImageUrl ? "https://vadimgrin.com" + firstImageUrl : "https://vadimgrin.com/images/personal-social.png";
    }

    return {
        title: post.title,
        openGraph: {
            url: "https://vadimgrin.com/" + post.url,
            images: firstImageUrl,
        },
    }
}

export default async function BlogPage({ params, }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const { data: post } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}posts/slug/${slug}`);

    if (post.error) {
        notFound();
    }

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




