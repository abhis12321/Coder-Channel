"use client"
import Link from 'next/link';
import React from 'react';

export default function Page() {
    const [students , setStd] = React.useState(null)
    const getData = async () => {
        let datas = await fetch('https://second-next.vercel.app/api/mongo/form2')
        // let datas = await fetch('http://localhost:3000/api/mongo/form2')
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
                <Link href={"form2"} className="student" id='flex'>Add New Students</Link>
                {students && (students.found).map(student => {
                    return (
                    <div key={student._id} className="student">
                        <p className="student-info">email: {student.email}</p>
                        <h2 className="student-info">name: {student.name}</h2>
                        <h2 className="student-info">age: {student.age}</h2>
                        <h2 className="student-info">gender: {student.gender}</h2>
                        <h2 className="student-info">address: {student.address}</h2>
                        <h2 className="student-info">city: {student.city}</h2>
                        <h2 className="student-info">state: {student.state}</h2>
                        <h2 className="student-info">pin code: {student.pin_code}</h2>
                        <h2 className="student-info">University: {student.university}</h2>
                        <h2 className="student-info">course: {student.course}</h2>
                        <h2 className="student-info">branch: {student.branch}</h2>
                        <h2 className="student-info">semester: {student.semester}</h2>
                        <Link href={`/form2/${student._id}`} > update </Link>
                    </div>)
                    })
                }
            </div>

        </>
    )
}

