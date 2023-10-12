import { NextResponse } from "next/server";

export async function GET(request , props) {
    let users = await fetch('https://abhis12321.github.io/first-next-app/api/classmates');
    users = await users.json();
    const student = users.filter(user => user.id == props.params.id);
    return NextResponse.json(student , {status:200});
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
