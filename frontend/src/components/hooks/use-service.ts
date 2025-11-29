import { useContext, useMemo } from "react";
import AuthContext from "../auth/auth/AuthContext";
import type AuthAware from "../../services/auth-aware/AuthAware";

export default function useService<T extends AuthAware>(
    Service: { new(jwt: string, clientId: string): T }
): T {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error("useService must be used inside <AuthProvider>");
    }

    const { jwt, clientId } = auth; // ✔ SAFE

    return useMemo(() => {
        return new Service(jwt, clientId);
    }, [jwt, clientId]);
}
