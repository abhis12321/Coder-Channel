export default async function Page() {
    let student = await fetch('https://abhis12321.github.io/first-next-app/api/classmates');
    student = await student.json();
    student = student[0];
    return(
        <>
            <h1>student details</h1>
            <h3 className="stud-name">Name : {student.name}</h3>
            <p className="stud-age">Age : {student.age}</p>
            <p className="stud-id">Roll No. : {2101660100000 + student.id}</p>
            
        </>
    )
}