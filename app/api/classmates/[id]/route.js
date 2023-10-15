import { NextResponse } from "next/server";
import {currUrl} from '/mongo/exp2';

export async function GET(request , props) {
    let users = await fetch(`${currUrl}/api/classmates`)
                .then(res => res.json())
                .catch(err => [{name:"Err", age:"0", id:"0"}])

                
    if(users.length == 1 && users[0].name === "Err") {
        return NextResponse.json(users[0]);
    }
    
    const student = users.filter(user => user.id == props.params.id);
    return NextResponse.json(student[0] , {status:200});
}

export async function POST(request, props) {

    const {searchParams} = request.nextUrl;
    console.log(searchParams);
    
    // request.json()
    // .then(res => console.log(res))
    // .catch(err => console.log(err));

    // let res = await request.json();
    // console.log(request);

    // fetch('http://localhost:3000/api/classmates')
    // .then(res => res.json())
    // .then(res => console.log(res))
    
    // console.log(props.params);
    return NextResponse.json({name:'jack' , success:true}, {status:200});
}
