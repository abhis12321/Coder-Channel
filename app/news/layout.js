'use client'
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function NewsLayout({children}) {
    // const date = new Date();
    // console.log(date.getDate() , date.getMonth()+1 , date.getFullYear(), date);
    const router = useRouter();
    const [newsTag , setNewsTag] = React.useState("");
    const handleTag = (e) => {
        e.preventDefault();
        setNewsTag(e.target.value);
    }

    return (
        <div className="news-cant">
            <div className="news-layout box">
                <input type="text" value={newsTag} onChange={handleTag} className="input" placeholder="Enter a topic"/>
                <button onClick={() => router.push(`/news/${newsTag}`)} className="input">fetch News</button>
                <Link className='news-tag' href='/news/tesla'>Tesla</Link>
                <Link className='news-tag' href='/news/google'>Google</Link>
                <Link className='news-tag' href='/news/business'>Business</Link>
                <Link className='news-tag' href='/news/wallStreet'>Wall Street</Link>
                <Link className='news-tag' href='/news/india'>India</Link>
            </div>
            
            <div className="box">
                {/* {date} */}
                {children}
            </div>
        </div>
    )
}

// export function generateMetadata() {
//     return {
//         title:'News Hunt',
//         description:'daily news'
//     }
// }
export async function generateStaticParams() {
    return null;
}