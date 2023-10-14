import Student from './Student'
export default async function Page() {
    // let data = await fetch('http://localhost:3000/api/classmates')
    let data = await fetch('https://second-next.vercel.app/api/classmates')
                .then(res => res.json())

    return (
        <>
        <h1>Students</h1>
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
