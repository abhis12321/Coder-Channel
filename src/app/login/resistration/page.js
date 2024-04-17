"use client"
import React from 'react';
import Image from 'next/image';

const initial = {
    password: "",
    email:"",
    name:"",
    age:"",
    gender:"",
    address:"",
    city:"",
    state:"",
    pin_code:"",
    university:"",
    course:"",
    branch:"",
    semester:"",
}

const reduce = (curr , obj)=> {
    switch(obj.ip) {
        case "email":
            return {...curr , email:obj.value};
        case "name":
            return {...curr , name:obj.value};
        case "age":
            return {...curr , age:obj.value};
        case "gender":
            return {...curr , gender:obj.value};
        case "address":
            return {...curr , address:obj.value};
        case "city":
            return {...curr , city:obj.value};
        case "state":
            return {...curr , state:obj.value};
        case "pin_code":
            return {...curr , pin_code:obj.value};
        case "university":
            return {...curr , university:obj.value};
        case "course":
            return {...curr , course:obj.value};
        case "branch":
            return {...curr , branch:obj.value};
        case "semester":
            return {...curr , semester:obj.value};
        case "pass":
            return {...curr , password:obj.value};
        default:
            return curr;
    }
}

export default function Page() {
    // const route = useRouter();
    const [data , dispatch] = React.useReducer(reduce , initial);
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let info = await fetch(`/api/gverify` , {
                            method:"post",
                            body:JSON.stringify(data),
                        })
                        .then(res => res.json());
                        
        alert(info.message)
    }

  return (
    <form onSubmit={handleSubmit} className='text-white relative top-3 bg-slate-900 w-[95%] max-w-[900px] m-auto rounded-2xl py-8 flex flex-col gap-3 items-center justify-center' autoComplete='on'>
      {/* <Image src={`/wheel.gif`} alt='spinning-ashoka-chakra' width={200} height={200} className='wheel' id='wheel'/> */}
      <h1 className=" mx-auto mb-4 py-4 px-8 rounded-xl text-3xl font-bold bg-teal-950 text-center w-fit shadow-[0_0_5px_white]">New Resistration</h1>
      <input name='email' type="email" value = {data.email} onChange={(e)=> dispatch({ip:"email" , value:e.target.value})} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950 py-2 px-3 rounded-xl mx-auto text-center focus:bg-cyan-950' placeholder='email' required/>
      <input name='pass' type="password" value = {data.password} onChange={(e)=> dispatch({ip:"pass" , value:e.target.value})} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950 py-2 px-3 rounded-xl mx-auto text-center focus:bg-cyan-950' placeholder='password' required/>
      <input name='name' type="text" value = {data.name} onChange={(e)=> dispatch({ip:"name" , value:e.target.value})} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950 py-2 px-3 rounded-xl mx-auto text-center focus:bg-cyan-950' placeholder='Name' required/>
      <input name='university' type="text" value = {data.university} onChange={(e)=> dispatch({ip:"university" , value:e.target.value})} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950 py-2 px-3 rounded-xl mx-auto text-center focus:bg-cyan-950' placeholder='University' required/>
      <input name='course' type="text" value = {data.course} onChange={(e)=> dispatch({ip:"course" , value:e.target.value})} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950 py-2 px-3 rounded-xl mx-auto text-center focus:bg-cyan-950' placeholder='course' required/>
      <input name='branch' type="text" value = {data.branch} onChange={(e)=> dispatch({ip:"branch" , value:e.target.value})} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950 py-2 px-3 rounded-xl mx-auto text-center focus:bg-cyan-950' placeholder='branch' required/>
      <input name='sem' type="Number" value = {data.semester} onChange={(e)=> dispatch({ip:"semester" , value:e.target.value})} className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-slate-950 py-2 px-3 rounded-xl mx-auto text-center focus:bg-cyan-950' placeholder='semester' required/>
      <button type='submit' className='w-[95%] max-w-[600px] font-semibold shadow-[0_0_3px_white] bg-red-900 hover:bg-red-700 active:bg-violet-900 py-2 focus:bg-cyan-950 px-3 rounded-xl mx-auto text-center' >submit</button>
    </form>
  )
}
