import { NextResponse } from "next/server";
export async function GET(request , {params}) {
  // let payload = await request.json();
  // console.log(payload);
    // const page_str = request.nextUrl.searchParams.get("page");
    // const limit_str = request.nextUrl.searchParams.get("limit");
  
    // const page = page_str ? parseInt(page_str, 10) : 1;
    // const limit = limit_str ? parseInt(limit_str, 10) : 10;
    // const skip = (page - 1) * limit;
  
    // const feedbacks = await prisma.feedback.findMany({
    //   skip,
    //   take: limit,
    // });
  
    // let data = {
    //   status: "success",
    //   results: feedbacks.length,
    //   feedbacks,
    // };
    // console.log(props);
    const users = [{name:'abhay singh kachhal' , age:21 , id:1} , {name:'abhinav Omer' , age:20 , id:2} , {name:'abhinav verma' , age:21 , id:3}];
    return NextResponse.json(users , {status:200});
  }


  export async function POST(request) {
    let payload = await request.json();
    console.log(payload);
    return NextResponse.json({payload , success:true});
  }