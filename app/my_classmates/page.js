import Student from './Student'
import {currUrl} from '/mongo/exp2';

export default async function Page() {
    let data = await fetch(`${currUrl}/api/classmates`)
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
