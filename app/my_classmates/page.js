export default async function Page() {
    let data = await fetch('http://localhost:3000/api/classmates');
    data = await data.json();

    return (
        <>
            {
            data.map((student) => {
                return (
                    <Student student = {student} key={student.id}/>
                )
            })
            }
        </>
    )
}

export function Student({student}) {
    return (
        <div className="stud">
            <h3 className="stud-name">Name : {student.name}</h3>
            <p className="stud-age">Age : {student.age}</p>
            <p className="stud-id">Roll No. : {2101660100000 + student.id}</p>
        </div>
    )
}