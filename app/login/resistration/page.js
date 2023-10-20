"use client"
import React from 'react';
// import { useRouter } from 'next/navigation';
import {currUrl} from '/mongo/exp2';

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
        let info = await fetch(`${currUrl}/api/gverify` , {
                            method:"post",
                            body:JSON.stringify(data),
                        })
                        .then(res => res.json());
                        
        alert(info.message)
    }

  return (
    <form onSubmit={handleSubmit} className='form-cant' autoComplete='on'>
      <h1 className="form-tag">New Resistration</h1>
      <input name='email' type="email" value = {data.email} onChange={(e)=> dispatch({ip:"email" , value:e.target.value})} className='form-input' placeholder='email' required/>
      <input name='pass' type="password" value = {data.password} onChange={(e)=> dispatch({ip:"pass" , value:e.target.value})} className='form-input' placeholder='password' required/>
      <input name='name' type="text" value = {data.name} onChange={(e)=> dispatch({ip:"name" , value:e.target.value})} className='form-input' placeholder='Name' required/>
      <input name='age' type="Number" value = {data.age} onChange={(e)=> dispatch({ip:"age" , value:e.target.value})} className='form-input' placeholder='age' required/>
      <input name='gender' type="text" value = {data.gender} onChange={(e)=> dispatch({ip:"gender" , value:e.target.value})} className='form-input' placeholder='gender' required/>
      <input name='address' type="text" value = {data.address} onChange={(e)=> dispatch({ip:"address" , value:e.target.value})} className='form-input' placeholder='address' required/>
      <input name='city' type="text" value = {data.city} onChange={(e)=> dispatch({ip:"city" , value:e.target.value})} className='form-input' placeholder='city' required/>
      <input name='dtate' type="text" value = {data.state} onChange={(e)=> dispatch({ip:"state" , value:e.target.value})} className='form-input' placeholder='state' required/>
      <input name='pin' type="Number" value = {data.pin_code} onChange={(e)=> dispatch({ip:"pin_code" , value:e.target.value})} className='form-input' placeholder='pin code' required/>
      <input name='university' type="text" value = {data.university} onChange={(e)=> dispatch({ip:"university" , value:e.target.value})} className='form-input' placeholder='University' required/>
      <input name='course' type="text" value = {data.course} onChange={(e)=> dispatch({ip:"course" , value:e.target.value})} className='form-input' placeholder='course' required/>
      <input name='branch' type="text" value = {data.branch} onChange={(e)=> dispatch({ip:"branch" , value:e.target.value})} className='form-input' placeholder='branch' required/>
      <input name='sem' type="Number" value = {data.semester} onChange={(e)=> dispatch({ip:"semester" , value:e.target.value})} className='form-input' placeholder='semester' required/>
      {/* <input type='submit' className='form-input' value="submit"   /> */}
      <button type='submit' className='form-input' >submit</button>
    </form>
  )
}
