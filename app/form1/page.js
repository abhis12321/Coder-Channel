"use client"
import React from 'react'
const initialData = {
    fname:"",
    lname:"",
    age:"",
    school:"",
    year:"",
    branch:"",
}

const reduce = (curr , obj) => {
    switch(obj.inp) {
        case "fname":
            return {...curr , fname:obj.value};

        case 'lname':
            return {...curr , lname:obj.value};

        case 'age':
            return {...curr , age:obj.value};

        case 'branch':
            return {...curr , branch:obj.value};

        case 'year':
            return {...curr , year:obj.value};

        case 'school':
            return {...curr , school:obj.value};

        default:
            return curr;
    }
}


export default function Page() {
    const [data , handleChange] = React.useReducer(reduce , initialData);
    const postIt = async(e) => {
        e.preventDefault()
        console.log('post');
        let post = await fetch("https://abhis12321.github.io/first-next-app/api/mongo/form1" , {
            method:"post",
            body:JSON.stringify(data),
        }).then(res => res.json())

        console.log(post);
        if(post.success) {
            alert(`form submitted`)
        }
        else {
            alert(`already resistered`)
        }
    }
    
    return (
    <form onSubmit={postIt}>
        <input type="text" value={data.fname} placeholder='First Name' onChange={(e) => handleChange({value:e.target.value ,inp: "fname"})} className='form-input' required/>
        <input type="text" value={data.lname} placeholder='Last Name' onChange={(e) => handleChange({value:e.target.value ,inp: "lname"})}  className='form-input' required/>
        <input type="Number" value={data.age} placeholder='Age' onChange={(e) => handleChange({value:e.target.value , inp:"age"})}  className='form-input' required/>
        <input type="text" value={data.school} placeholder='School Name' onChange={(e) => handleChange({value:e.target.value ,inp: "school"})}  className='form-input' required/>
        <input type="text" value={data.branch} placeholder='Branch' onChange={(e) => handleChange({value:e.target.value ,inp: "branch"})} className='form-input' required/>
        <input type="Number" value={data.year} placeholder='Year' onChange={(e) => handleChange({value:e.target.value ,inp: "year"})} className='form-input' required/>
        <input type="file" className='form-input cursor' required/>
        <button type='submit' className='form-input'>submit</button>
    </form>
  )
}
