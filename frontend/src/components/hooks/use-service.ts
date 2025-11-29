import { useContext } from "react";
import AuthContext from "../auth/auth/AuthContext";
import type AuthAware from "../../services/auth-aware/AuthAware";

export default function useService<T extends AuthAware>(
    Service: { new(jwt: string, clientId: string): T }
): T {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useService must be used inside <AuthProvider>");
    }

    return new Service(authContext.jwt, authContext.clientId);
}
