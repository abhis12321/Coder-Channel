// 'use client'
import Link from 'next/link';
import React from 'react';

export default async function Page({props , params}) {
    const tag = params.newsTag;
    const key = '4556c79f823a47b0930ef4519ee00cb3';
    const url = `https://newsapi.org/v2/everything?q=${tag}&from=2023-09-02&sortBy=publishedAt&apiKey=`
    
    const response = await fetch(`${url}${key}`);
    let posts = await response.json();
    
  return (
    <>
        <h1>{tag}</h1>
        <div className='news'>
            
            {posts.articles.map(post => {
                return (
                    <NewsCard key={post.url}  post={post}/>
                )
            })}
        
        </div>
    </>
  )
}

export const NewsCard = ({post}) => {
    return (
        <div className='news-card'>
            <img src={post.urlToImage} alt='./alt.jpg' className='news-img'/>
            <h2 className='news-title'>{post.title}</h2>
            <p className='news-content'>{post.content}</p>
            <Link href={post.url} target='blank'>See full News</Link>
        </div>
    )
}