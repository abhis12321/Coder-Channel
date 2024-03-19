import Link from 'next/link';
export default function NewsCard({post})  {
    return (
        <div className='news-card'>
            <img src={post.urlToImage} alt='./alt.jpg' className='news-img'/>
            {/* <Image src={post.urlToImage} alt='./alt.jpg' className='news-img' width='100' height='100'/> */}
            <h2 className='news-title'>{post.title}</h2>
            <p className='news-content'>{post.content}</p>
            <Link href={post.url} target='blank'>See full News</Link>
        </div>
    )
}
