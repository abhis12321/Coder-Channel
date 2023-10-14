import React from 'react';
import NewsCard from './NewsCard'

export default async function Page(props) {
    const {newsTag} = props.params;
    const posts = await data(newsTag);
    // console.log(posts);
    return (
        <>
            <h1>News id is {newsTag}</h1>
            <div className='news'> {
                posts && posts.map(post => {
                    return (
                        <NewsCard key={post.url}  post={post}/> 
                    )
                })}
        
            </div>
        </>
    )
}


const data = async (tag) => {
    let date1 =  new Date();
    // const date = date1.toISOString().substring(0,10);
    // const date = '2023-09-02';
    const key = '87673ca35b05498987d23affd3a19f16';
    // const key = '4556c79f823a47b0930ef4519ee00cb4';
    const url = `https://newsapi.org/v2/everything?q=${tag}&sortBy=publishedAt&apiKey=`
    // const url = `https://newsapi.org/v2/everything?q=${tag}&from=${date}&sortBy=publishedAt&apiKey=`
    const posts = await fetch(`${url}${key}`).then(res => res.json());
    
    return posts.articles;
}

