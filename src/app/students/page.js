import axios from 'axios'
import { cookies } from 'next/headers'
import UsersContainer from "../_components/UsersContainer"

export default async function page() {  
  const cookieStore = cookies();
  let { value : user } = cookieStore.get('coder-channel-login-info') || { value:null };
  user = JSON.parse(user);
    
  let users = await axios.get(`http://localhost:3000/api/users/${user?._id ? `${user._id}` : ""}`)
                        .then(response => response.data)
                        .then(data => data.users || null)
                        .catch(() => null) || null;    

  return (
    <>
     <UsersContainer users={users} />
    </>
  )
}
