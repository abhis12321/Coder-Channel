"use client"
import React, { useCallback } from 'react';
import StudentCard from '../_components/StudentCard';
import { useAuth } from '../_components/AuthProvider';
import axios from 'axios';



function Page() {
    let USER = useAuth();
    const [students , setStudents] = React.useState(null);

    const getData = useCallback( async (USER) => {
        if(USER.user) {
            await fetch(`/api` , {
                        method:"post",
                        body:JSON.stringify({_id:USER.user?._id })
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
        
    } , [])

    React.useEffect(() => {
        getData(USER);
    } , [getData , USER])

    
    return (
        <>
            <div className="flex justify-evenly items-center py-5 flex-wrap gap-6 min-h-[92vh]"> 
                {!students &&  <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center"><div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white"></div></div>}           
                {students && students.map((student , index) => {
                    if(student.verify)
                    return (                
                            <StudentCard  key={student._id+index} student={student}/>
                    )})
                }
            </div>
            
        </>
    )
}


export default React.memo(Page);