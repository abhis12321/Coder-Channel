import Student from './Student'
export default async function Page() {
    // let data = await fetch('https://abhis12321.github.io/first-next-app/api/classmates');
    // data = await data.json();

    return (
        <>
        <h1>Students</h1>
            {/* {
            data.map((student) => {
                return (
                    <Student student = {student} key={student.id}/>
                )
            })
            } */}
        </>
    )
}
