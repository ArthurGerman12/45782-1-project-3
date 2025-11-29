import { useEffect, useState, type PropsWithChildren } from "react";
import AuthContext from "./AuthContext";
import { useSearchParams } from "react-router-dom";

export default function Auth(props: PropsWithChildren) {

    const [jwt, setJwt] = useState<string>(localStorage.getItem('jwt') || "");
    const [clientId, setClientId] = useState<string>(localStorage.getItem('clientId') || "");

    const { children } = props;

    const [searchParams] = useSearchParams();

    function newJwt(token: string) {
        setJwt(token);
        localStorage.setItem("jwt", token);
    }

    function newClientId(id: string) {
        setClientId(id);
        localStorage.setItem("clientId", id);
    }

    // When OAuth redirects back with jwt and clientId in the URL (if so)
    useEffect(() => {
        const jwtParam = searchParams.get("jwt");
        const clientIdParam = searchParams.get("clientId");

        if (jwtParam) {
            newJwt(jwtParam);
        }

        if (clientIdParam) {
            newClientId(clientIdParam);
        }
    }, [searchParams]);

    return (
        <AuthContext.Provider value={{
            jwt,
            clientId,
            newJwt,
            newClientId,
        }}>
            {children}
        </AuthContext.Provider>
    );
}
