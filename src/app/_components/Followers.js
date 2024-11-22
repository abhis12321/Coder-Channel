import Link from 'next/link';
import Image from 'next/image';

export default function Followers({ followers, setConnections, handleRemoveFollower }) {
  return (
    <div className="fixed z-10 top-nav left-0 w-[100%] h-nav bg-gray-500/45 dark:bg-gray-900/90 flex items-center justify-center">
      <div className='w-[98%] mx-[1%] max-w-[400px] max-h-nav overflow-auto new-scroll flex gap-[1px] flex-col items-center justify-around bg-white dark:bg-white/10 p-2 rounded shadow-[0_0_3px_gray]'>
        <div className="flex items-center justify-between w-full px-2 pb-[6px]">
          <div className="">Followers : <span className="font-semibold">{followers.length}</span></div>
          <div className="text-md text-red-600 hover:ring-1 ring-red-600 font-semibold px-[9px] py-[2px] cursor-pointer bg-red-600/5 hover:bg-red-600/20 rounded-full duration-500 shadow-[1px_2px_2px_black]" onClick={e => setConnections(0)}>X</div>
        </div>
        {
          (followers && followers.length > 0) ?
            followers.map((user, index) =>
              <div className="flex justify-between items-center font-mono bg-gray-200 dark:bg-white/10 rounded w-full text-red-950 dark:text-white" key={index}>
                <Link href={`/students/${user.followedById._id}`} className="flex-1 font-bold py-[2px] px-3 flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-white/30 overflow-hidden" key={index}>
                  <Image src={user.followedById.imgUrl} alt='' height={50} width={50} className='rounded-full h-8 w-8' />
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="font-semibold text-nowrap">{user.followedById.name}</span>
                    <span className="text-[11px] text-nowrap">({user.followedById.university})</span>
                  </div>
                </Link>
                {handleRemoveFollower && <button className="text-sm text-white py-[8px] px-3 bg-gray-900/70 hover:bg-gray-900" onClick={e => handleRemoveFollower(user._id)}>remove</button>}
              </div>
            )
            :
            <p className="text-gray-500">No followers till now</p>
        }
      </div>
    </div>
  )
}
