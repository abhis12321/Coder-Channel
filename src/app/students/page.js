"use client"
import React from 'react';
// import Student from './Student'
// import Link from 'next/link';
import Card from './Card'


function Page() {
    const [students , setStd] = React.useState(null)
    const getData = async () => {
        let datas = await fetch(`/api/mongo/form2`)
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
            <div className="profile-info-card-cant ">     
            {!students && <h1 className='searching'></h1>}           
            {/* <div className="student-cant ">                 */}
                {/* <Link href={"login/resistration"} className="student" id='flex'>Add New Students</Link> */}
                {students && (students.found).map((student , index) => {
                    if(student.verify)
                    return (                
                            <Card  key={student._id+index} student={student}/>
                    //     <>
                    //     {/* <p>{student._id}</p> */}
                    //         {/* <Student key={`${student._id}`} student={student} getData={getData}/> */}
                    //         <Card  key={student._id+index} student={student}/>
                    //     </>
                    )})
                }
            </div>
            
        </>
    )
}


export default React.memo(Page);