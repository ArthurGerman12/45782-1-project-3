import { useContext, useMemo } from "react";
import AuthContext from "../auth/auth/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function useUserName() {
    const authContext = useContext(AuthContext);

    const firstName = useMemo(() => {
        const { firstName } = jwtDecode<{ firstName: string }>(authContext!.jwt);
        return firstName;
    }, [authContext]);

    return firstName;

}