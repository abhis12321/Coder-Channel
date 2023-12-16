"use client"
import Link from 'next/link';
import {useAuth} from '/mongo/AuthProvider'
import { useRouter } from 'next/navigation';

export default function Page() {
    let USER = useAuth();
    let router = useRouter();

    const handleLogout = e => {
        USER.logout();
        router.push('/login')
    }


    return (
        <div id="logout-cant">
            <div id="logout">
                <p>you are going to logout from our website</p> 
                <span>&quot;https://second-next.vercel.app/&quot;</span>
                <h5>You can login with your Email and Password later whenever you want</h5>
                <p>Are you sure, You wanna logout ?</p>
                <div id="confirm-logout">
                    <button onClick={handleLogout}>Yes</button>
                    <Link href={'/login'}>No</Link>
                </div>
            </div>
        </div>
    )
}