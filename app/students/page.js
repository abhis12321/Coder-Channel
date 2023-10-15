"use client"
import Link from 'next/link';
import React from 'react';
import {currUrl} from '/mongo/exp2';

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

    const handleDelete = async(id) => {
        
        if(confirm("Are you sure you wanna delete this account")) {
            let del = await fetch(`${currUrl}/api/mongo/form2/${id}` , {
                            method:"delete",
                            body:JSON.stringify(id),
                        })
                        .then(res => res.json())
                        .catch(err => {success:false});
            if(del.success) {
                alert("The user is been deleted!")
            }
            else {
                alert("Sorry, the user is not been deleted!")
            }
            getData();
        }
    }    

    return (
        <>
            <div className="student-cant">
                <Link href={"form2"} className="student" id='flex'>Add New Students</Link>
                {students && (students.found).map(student => {
                    return (
                    <div key={student._id} className="student">
                        <p className="student-info"><span>Email: </span>{student.email}</p>
                        <h2 className="student-info"><span>Name: </span>{student.name}</h2>
                        <h2 className="student-info"><span>Age: </span>{student.age}</h2>
                        <h2 className="student-info"><span>Gender: </span>{student.gender}</h2>
                        <h2 className="student-info"><span>Address: </span>{student.address}</h2>
                        <h2 className="student-info"><span>City: </span>{student.city}</h2>
                        <h2 className="student-info"><span>State: </span>{student.state}</h2>
                        <h2 className="student-info"><span>Pin code: </span>{student.pin_code}</h2>
                        <h2 className="student-info"><span>University: </span>{student.university}</h2>
                        <h2 className="student-info"><span>Course: </span>{student.course}</h2>
                        <h2 className="student-info"><span>Branch: </span>{student.branch}</h2>
                        <h2 className="student-info"><span>Semester: </span>{student.semester}</h2>
                        <div className='change'>
                            <Link href={`/form2/${student._id}`} className='change-update change-tag'> update </Link>
                            <button onClick={() => handleDelete(student._id)} className='change-delete change-tag'>delete</button>
                        </div>
                    </div>)
                    })
                }
            </div>

        </>
    )
}

