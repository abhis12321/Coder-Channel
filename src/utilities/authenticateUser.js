import { getJWTUser } from "./getJWTUser";

export const authenticateUser = (id) => {
    try {        
        const User = getJWTUser();
        return User?._id == id && id != null;
    } catch(error) {
        return false;
    }
}