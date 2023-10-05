import { NextResponse } from "next/server";

export async function GET(request , props) {
    let users = await fetch('http://localhost:3000/api/classmates');
    users = await users.json();
    const student = users.filter(user => user.id == props.params.id);
    // console.log(users);
    return NextResponse.json(student , {status:200});
}