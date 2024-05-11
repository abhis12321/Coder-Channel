"use client"
import React from 'react';
import StudentCard from '../_components/StudentCard';



function Page() {
    const [students , setStd] = React.useState(null);
    const getData = async () => {
        let datas = await fetch(`/api/users`)
            .then(res => res.json())
            .catch(err => {success:false});
        
        if(datas.success) {
            setStd(datas);
        }
    }
    React.useEffect(() => {
        getData();
    } , [])

    
    return (
        <>
            <div className="flex justify-evenly items-center py-5 flex-wrap gap-6 min-h-[92vh]"> 
                {!students &&  <div className="mx-auto h-40 w-40 rounded-full animate-spin border-t-4 border-slate-900 dark:border-white flex items-center justify-center"><div className="h-24 w-24 rounded-full border-r-4 border-slate-700 dark:border-white"></div></div>}           
                {students && (students.found).map((student , index) => {
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