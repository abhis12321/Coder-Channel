import Image from 'next/image';
import Link from 'next/link';

export default function BlogLikesPage({ setOption , allLikes }) {
    return (
        <div className='h-nav w-full fixed z-10 top-nav left-0 flex flex-col items-center justify-center bg-slate-500/50 dark:bg-slate-900/95'>
            <div className="w-[98%] max-w-[400px] rounded relative flex flex-col gap-[1px] p-2 bg-white dark:bg-white/10">
                <div className="flex items-center justify-between">
                    <div className="px-1">All Likes : <span className='font-semibold'>{allLikes.length}</span></div>
                    {/* <button className="ring-1 hover:ring-red-600 rounded-full px-[10px] py-[3.5px] text-red-600 font-bold bg-gray-200 dark:bg-inherit hover:bg-red-600/20 dark:hover:text-white" onClick={() => setOption(0)}> X </button> */}
                    <button className="text-md text-red-600 hover:ring-1 ring-red-600 font-semibold px-[9px] py-[2px] cursor-pointer bg-red-600/15 hover:bg-red-600/20 rounded-full duration-500 shadow-[1px_2px_2px_black]"  onClick={() => setOption(0)}>X</button>
                </div>
                {
                    allLikes.map(like => <Link href={`/students/${like.likedById._id}`} className='py-[2px] px-3 rounded flex gap-3 items-center bg-gray-200 hover:bg-gray-300 dark:bg-white/10 dark:hover:bg-white/20 hover:underline' key={like._id}>
                        <Image src={like.likedById.imgUrl} alt='' height={50} width={50} className='h-8 w-8 rounded-full' />
                        <div className="flex items-center gap-2 overflow-hidden">
                            <span className="font-semibold text-nowrap">{like.likedById.name}</span>
                            <span className="text-[11px] text-nowrap">({like.likedById.university})</span>
                        </div>
                    </Link>)
                }
            </div>
        </div>
    )
}
