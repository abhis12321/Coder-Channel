
export default async function Page({params}) {
    // let student = await fetch(`http://localhost:3000/api/classmates/${params.id}`)
    let student = await fetch(`https://second-next.vercel.app/api/classmates/${params.id}`)
                    .then(res => res.json());
    
    // console.log(student);
    return(
        <div className="margin-left center">
            <h1>Student details</h1>
            <h3 className="stud-name">Name : {student.name}</h3>
            <p className="stud-age">Age : {student.age}</p>
            <p className="stud-id">Roll No. : {2101660100000 + student.id}</p>
            
        </div>
    )
}
