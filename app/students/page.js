import Button from './Button'
export default async function Page() {
    let students = await fetch('http://localhost:3000/api/mongo/form2')
    .then(res => res.json())
    .catch(err => {success:false});

    return (
        <>
            <div className="student-cant">
            {
                (students.found).map(student => {
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
                        <Button id = {student._id}/>
                    </div>)
                })
            }
            </div>
        </>
    )
}