"use client"
import React from 'react';
import Card from './Student';
import '../style.css';


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
            <div className="flex justify-evenly items-center py-5 flex-wrap gap-6 min-h-[92vh] bg-slate-950 ">     
            {!students && <h1 className='searching'></h1>}           
                {students && (students.found).map((student , index) => {
                    if(student.verify)
                    return (                
                            <Card  key={student._id+index} student={student}/>
                    )})
                }
            </div>
            
        </>
    )
}


export default React.memo(Page);