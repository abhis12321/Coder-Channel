import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function GET() {
  try {
    return NextResponse.json({success:false, message:"Data Copied"});
  } catch(error) {
    return NextResponse.json({success:false, message:error.message});
  }
}

export const POST = async (req, res) => {
  const formData = await req.formData();
  console.log(formData);
  const file = formData.get("files");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");

  console.log(buffer , filename);
  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    return NextResponse.json({path:"public/uploads/" + filename,  Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occurred: ", error);
    return NextResponse.json({ Message: "Failed " + error.message, status: 500 });
  }
};

