import Link from "next/link"
export default function Student({student}) {
    return (
        <div className="stud">
            <h3 className="stud-name">Name : {student.name}</h3>
            <p className="stud-age">Age : {student.age}</p>
            <p className="stud-id">Roll No. : {2101660100000 + student.id}</p>
            <Link href={`/my_classmates/${student.id}`} target='_blank' >see more details</Link>
        </div>
    )
}