import { NextResponse } from "next/server";

export async function GET(request) { 
    const data = [
        {
            name:'abhay singh kachhal',
            age:22,
            id:1,
            branch:'CSE',
            college:"DR. AITH",
        },
        
        {
            name:'abhinav omer',
            age:23,
            id:2,
            branch:'CSE',
            college:"DR. AITH",
        },
        
        {
            name:'abhinav verma',
            age:21,
            id:3,
            branch:'CSE',
            college:"DR. AITH",
        },
        
        {
            name:'abhishek',
            age:22,
            id:4,
            branch:'CSE',
            college:"DR. AITH",
        },
        
        {
            name:'abhishek singh',
            age:20,
            id:5,
            branch:'CSE',
            college:"DR. AITH",
        },
        
        {
            name:'achutanand shukla',
            age:23,
            id:6,
            branch:'CSE',
            college:"DR. AITH",
        },
        
        {
            name:'adarsh singh',
            age:22,
            id:7,
            branch:'CSE',
            college:"DR. AITH",
        },
        
    ]
    return NextResponse.json(data , {status:200});
}