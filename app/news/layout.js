import Link from "next/link";
import React from "react";

export default function NewsLayout({children}) {

    return (
        <div className="news-cant">
            <div className="news-layout box">
                <Link className='news-tag' href='/news/tesla'>Tesla</Link>
                <Link className='news-tag' href='/news/apple'>Apple</Link>
                <Link className='news-tag' href='/news/business'>Business</Link>
                <Link className='news-tag' href='/news/wallStreet'>Wall Street</Link>
                <Link className='news-tag' href='/news/india'>India</Link>
            </div>
            
            <div className="box">
                {children}
            </div>
        </div>
    )
}