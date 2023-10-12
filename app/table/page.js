export default function Page() {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>name</td>
                        <td>age</td>
                        <td>email</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>age</td>
                        <td>email</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>age</td>
                        <td>email</td>
                    </tr>
                    <tr>
                        <td>name</td>
                        <td>age</td>
                        <td>email</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export async function generateStaticParams() {
    return null;
}