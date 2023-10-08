"use client"
import React from 'react'
const initialData = {
    fname:"",
    lname:"",
    age:0,
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
        let post = await fetch("http://localhost:3000/api/mongo" , {
            method:"post",
            body:JSON.stringify(data),
        }).then(res => res.json())
        console.log(post);
    }
    
    return (
    <form onSubmit={postIt}>
        <input type="text" value={data.fname} placeholder='First Name' onChange={(e) => handleChange({value:e.target.value ,inp: "fname"})}/>
        <input type="text" value={data.lname} placeholder='Last Name' onChange={(e) => handleChange({value:e.target.value ,inp: "lname"})} />
        <input type="Number" value={data.age} placeholder='Age' onChange={(e) => handleChange({value:e.target.value , inp:"age"})} />
        <input type="text" value={data.school} placeholder='School Name' onChange={(e) => handleChange({value:e.target.value ,inp: "school"})} />
        <input type="text" value={data.branch} placeholder='Branch' onChange={(e) => handleChange({value:e.target.value ,inp: "branch"})}/>
        <input type="Number" value={data.year} placeholder='Year' onChange={(e) => handleChange({value:e.target.value ,inp: "year"})}/>
        <button type='submit'>submit</button>
    </form>
  )
}
