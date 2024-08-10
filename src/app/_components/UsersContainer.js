"use client"
import React, { useCallback, useState } from 'react';
import StudentCard from './StudentCard';
import { useAuth } from './AuthProvider';
import axios from 'axios';

function UsersContainer({ users }) {
  let USER = useAuth();
  const [students, setStudents] = React.useState([]);
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState("0");

  const getData = useCallback(async (USER) => {
    if (!users || users.length == 0) {
      axios.get(`/api/users/${USER?.user?._id}`)
        .then(res => res.data)
        .then(data => data.success && setStudents(data.users))
        .catch(error => console.log(error.message));
    } else {
      setStudents(users);
    }
  }, [users]);

  const handleFollowings = (student, index, data) => {
    if (!USER?.user) {
      alert("You are not logged-in! Login first to follow a user!");
    } else if (USER.user._id === student._id) {
      alert("you can not follow yourself.");
    } else {
      axios.post('/api/users/follow', data)
        .then(result => result.data)
        .then(data => {
          students[index].isFollowing = true;
          setStudents([...students]);
          alert(data.message)
        });
    }
  }

  React.useEffect(() => {
    getData();
  }, [getData, USER, USER.user]);


  return (
    <>
      <div className="flex justify-evenly items-center py-5 flex-wrap gap-6 h-nav">
        {!students &&
          <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white">
            </div>
          </div>
        }

        {students &&
          <>
            <div className="w-[98%] mx-auto flex flex-col md:flex-row gap-2 items-center justify-center self-start font-serif">
              <select name="sort-by" id="" className="w-[98%] md:w-fit flex-1 max-w-[500px] outline-none py-2 px-3 rounded-xl text-center ring-1 focus:ring-2 ring-cyan-500 bg-green-600/20" placeholder='pending' value={searchBy} onChange={(e) => setSearchBy(e.target.value)} >
                <option value="0" className='bg-slate-950/30'>search by user&apos;s name</option>
                <option value="1" className='bg-slate-950/30'>search by university name</option>
              </select>
              <input type="text" className="w-[98%] md:w-fit flex-1 max-w-[500px] outline-none text-violet-600 font-medium py-[6px] px-5 rounded-xl ring-1 focus:ring-2 ring-cyan-500 bg-green-600/20 dark:placeholder:text-gray-400 placeholder:text-gray-500 text-center" value={search} onChange={e => setSearch((e.target.value).toLowerCase())} placeholder='type here to search...' />
            </div>
            {students?.map((student, index) => {
              return student.verify && student._id != USER?.user?._id ?
                <StudentCard key={student._id + index} student={student} index={index} handleFollowings={handleFollowings} search={search.toLowerCase()} searchBy={searchBy} />
                :
                null
            })}
          </>
        }
      </div>

    </>
  )
}

export default React.memo(UsersContainer);