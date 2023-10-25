"use client"
import Link from 'next/link';
import React from 'react';
import {currUrl} from '/mongo/exp2';
import Student from './Student'

export default function Page() {
    const [students , setStd] = React.useState(null)
    const getData = async () => {
        let datas = await fetch(`${currUrl}/api/mongo/form2`)
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
            <div className="student-cant">
                {/* <Link href={"login/resistration"} className="student" id='flex'>Add New Students</Link> */}
                {students && (students.found).map(student => {
                    if(student.verify)
                    return (
                        <Student key={student._id} student={student} getData={getData}/>
                    )})
                }
            </div>

        </>
    )
}

