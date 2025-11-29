import { useContext } from "react";
import AuthContext from "../auth/auth/AuthContext";
import { jwtDecode } from "jwt-decode";
import type { UserJwtPayload } from "../../models/UserJwtPayload";

export default function useUserRole() {
    const authContext = useContext(AuthContext);

    if (!authContext?.jwt) return null;

    try {
        return jwtDecode<UserJwtPayload>(authContext.jwt).role;
    } catch {
        return null;
    }
}
