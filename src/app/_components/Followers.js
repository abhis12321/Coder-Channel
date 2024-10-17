import Image from 'next/image';
import Link from 'next/link';

export default function Followers({ followers, setConnections, handleRemoveFollower }) {
  return (
    <div className="fixed z-10 top-0 left-0 w-[100%] h-[100%] bg-gray-500/45 dark:bg-blue-50/25 flex items-center justify-center">
      <div className='ring-1 flex gap-[1px] flex-col items-center justify-around w-[98%] mx-[2%] max-w-[400px] bg-white dark:bg-blue-950 p-2 rounded'>
        <div className="flex items-center justify-between w-full px-2 pb-[6px]">
          <div className="">Followers : {followers.length}</div>
          <div className="text-xl text-red-800 font-semibold px-[10px] py-[2px] cursor-pointer hover:text-red-500 hover:ring-red-700 hover:bg-red-500/20 rounded-full ring-1 duration-500" onClick={e => setConnections(0)}>X</div>
        </div>
        {
          (followers && followers.length > 0) ?
            followers.map((user, index) =>
              <div className="flex justify-between items-center font-mono bg-blue-900/20 dark:bg-blue-400/20 hover:bg-blue-800/25 rounded w-full text-red-950 dark:text-white overflow-hidden" key={index}>
                <Link href={`/students/${user.followedById._id}`} className="flex-1 font-bold py-[3px] px-3 hover:bg-green-900/40 flex items-center gap-4" key={index}>
                  <Image src={user.followedById.imgUrl} alt='' height={50} width={50} className='rounded-full h-10 w-10' />
                  <div className="">{user.followedById.name}</div>
                </Link>
                {handleRemoveFollower && <button className="text-sm text-white p-[10px] bg-gray-500 hover:bg-gray-900" onClick={e => handleRemoveFollower(user._id)}>remove</button>}
              </div>
            )
            :
            <p className="text-gray-500">No followers till now</p>
        }
      </div>
    </div>
  )
}
