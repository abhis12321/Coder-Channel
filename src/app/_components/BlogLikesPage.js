import Image from 'next/image';
import Link from 'next/link';

export default function BlogLikesPage({ setOption , allLikes }) {
    return (
        <div className='h-nav w-full fixed z-10 top-nav left-0 flex flex-col items-center justify-center bg-slate-500/50 dark:bg-slate-900/95'>
            <div className="w-[98%] max-w-[400px] rounded relative flex flex-col gap-[1px] p-2 bg-white dark:bg-white/10">
                <div className="flex items-center justify-between">
                    <div className="px-1">All Likes : <span className='font-bold'>{allLikes.length}</span></div>
                    <button className="ring-1 hover:ring-red-600 rounded-full px-[10px] py-[3.5px] text-red-600 font-bold bg-gray-200 dark:bg-inherit hover:bg-red-600/20 dark:hover:text-white" onClick={() => setOption(0)}> X </button>
                </div>
                {
                    allLikes.map(like => <Link href={`/students/${like.likedById._id}`} className='py-1 px-3 rounded flex gap-3 items-center bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 hover:underline' key={like._id}>
                        <Image src={like.likedById.imgUrl} alt='' height={50} width={50} className='h-10 w-10 rounded-full' />
                        <div className="">{like.likedById.name}</div>
                    </Link>)
                }
            </div>
        </div>
    )
}
