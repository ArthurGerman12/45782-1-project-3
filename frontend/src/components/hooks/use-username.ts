import { useContext, useMemo } from "react";
import AuthContext from "../auth/auth/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function useUserName() {
    const authContext = useContext(AuthContext);

    const name = useMemo(() => {
        const { name } = jwtDecode<{ name: string }>(authContext!.jwt);
        return name;
    }, [authContext]);

    return name;

}