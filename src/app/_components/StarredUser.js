import Link from 'next/link'
import Image from 'next/image'

export default function StarredUser({ stars, setConnections }) {
    return (
        <div className="h-nav fixed z-10 top-nav left-0 w-[100%] bg-gray-500/45 dark:bg-gray-900/90 flex items-center justify-center">
            <div className="w-[98%] max-w-[350px] max-h-nav p-2 overflow-auto new-scroll flex gap-[1px] flex-col justify-start bg-white dark:bg-white/10 rounded shadow-[2px_2px_3px_black]">
                <div className="px-1 pb-1 flex gap-4 items-center justify-between">
                    <div className="">stars : <span className="font-semibold">{stars?.length}</span></div>
                    <div className="text-md text-red-600 hover:ring-1 ring-red-600 font-semibold px-[9px] py-[2px] cursor-pointer bg-red-600/5 hover:bg-red-600/20 rounded-full duration-500 shadow-[1px_2px_2px_black]" onClick={e => setConnections(0)}>X</div>
                </div>
                {
                    stars?.map(star => <Link key={star?._id} href={`/students/${star?.likedById?._id}`} className='px-2 py-[2px] flex gap-3 justify-start items-center font-mono bg-gray-200 dark:bg-white/10 rounded w-full text-red-950 dark:text-white overflow-hidden hover:bg-gray-300 dark:hover:bg-white/30'>
                        <Image src={star?.likedById?.imgUrl} alt='' height={50} width={50} className="h-8 w-8 rounded-full shadow-[0_0_1px_black]" />
                        <div className="flex items-center gap-2 overflow-hidden">
                            <span className="font-semibold text-nowrap">{star?.likedById.name}</span>
                            <span className="text-[11px] text-nowrap">({star.likedById.university})</span>
                        </div>
                    </Link>)
                }
            </div>
        </div>
    )
}
