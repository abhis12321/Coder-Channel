import { totp } from "speakeasy";

export const verifyOPT = ({ email , OTP }) => {
    const verified = totp.verify({
        secret: email,
        encoding: 'base32',
        token: OTP,
        step: 300, // Must match the step used during generation
        window: 1, // Allow 1 step before and after
        digits: 6,
        algorithm: 'sha1',
      });
    return verified;    
}