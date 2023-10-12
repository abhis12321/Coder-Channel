import Student from './Student'
export default async function Page() {
    let data = await fetch('https://abhis12321.github.io/first-next-app/api/classmates');
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
