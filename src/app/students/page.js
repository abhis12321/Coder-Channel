"use client"
import React, { useCallback } from 'react';
import StudentCard from '../_components/StudentCard';
import { useAuth } from '../_components/AuthProvider';
import axios from 'axios';



function Page() {
  let USER = useAuth();
  const [students, setStudents] = React.useState(null);

  const getData = useCallback(async (USER) => {
    if (USER.user) {
      await fetch(`/api`, {
        method: "post",
        body: JSON.stringify({ _id: USER.user?._id })
      })
        .then(res => res.json())
        .then(data => data.success && setStudents(data.users))
        .catch(error => console.log(error.message));
    } else {
      await fetch(`/api/users`)
        .then(res => res.json())
        .then(data => data.success && setStudents(data.users))
        .catch(error => console.log(error.message));
    }

  }, []);

  const handleFollowings = (student, index, data) => {
    if (!USER?.user) {
      alert("login first to follow a user!");
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
    getData(USER);
  }, [getData, USER, USER.user])


  return (
    <>
      <div className="flex justify-evenly items-center py-5 flex-wrap gap-6 h-nav">
        {!students &&
          <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center">
            <div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white">
            </div>
          </div>
        }
        
        {students && students.map((student, index) => {
            return student.verify && student._id != USER?.user?._id ?
              <StudentCard key={student._id + index} student={student} index={index} handleFollowings={handleFollowings} />
              :
              null
        })
        }
      </div>

    </>
  )
}


export default React.memo(Page);