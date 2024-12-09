import { cookies } from "next/headers";
import { CODER_CHANNEL_TOCKEN, TOCKEN_MAX_AGE } from "./constants";
import { sign, verify } from "jsonwebtoken";

export const getJWTUser = () => {
    try {
        const tocken = cookies().get(CODER_CHANNEL_TOCKEN)?.value;
        const secret = process.env.JWT_SECRET_KEY || "";
        const { User } = verify(tocken, secret);
        return User;
    } catch (error) {
        return null;
    }
}

export const setJWTUser = (User) => {
    const secret = process.env.JWT_SECRET_KEY || "";
    const tocken = sign({ User }, secret, { expiresIn: TOCKEN_MAX_AGE });
    cookies().set({
        name: CODER_CHANNEL_TOCKEN,
        value: tocken,
        // secure: process.env.NODE_ENV === 'production' && window.location.protocol === 'https:',
        httpOnly: true,
        // sameSite: "strict",
        maxAge: TOCKEN_MAX_AGE,
        path: "/"
    });

}