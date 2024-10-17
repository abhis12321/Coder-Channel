import { CODER_CHANNEL_TOCKEN } from "./constants"
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export const authenticateUser = (id) => {
    try {        
        const tocken = cookies().get(CODER_CHANNEL_TOCKEN)?.value;
        const secret = process.env.JWT_SECRET_KEY || "";        
        const { _id } = verify(tocken , secret);
        console.log(_id , id , (_id == id));
        return _id == id;
    } catch(error) {
        return false;
    }
}