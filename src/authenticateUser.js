import { getJWTUser } from "./getJWTUser";

export const authenticateUser = (id) => {
    try {        
        const User = getJWTUser();
        return User?._id == id;
    } catch(error) {
        return false;
    }
}