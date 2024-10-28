import { cookies } from "next/headers";
import { CODER_CHANNEL_TOCKEN } from "./constants";
import { verify } from "jsonwebtoken";

export const getJWTUser = () => {    
    try {     const tocken = cookies().get(CODER_CHANNEL_TOCKEN)?.value;
        const secret = process.env.JWT_SECRET_KEY || "";        
        const { User } = verify(tocken , secret);
        return User;
    } catch(error) {
        return null;
    }
}