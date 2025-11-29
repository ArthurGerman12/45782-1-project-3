import { createContext } from "react";

interface AuthContextInterface {
    jwt: string;
    clientId: string;
    newJwt(jwt: string): void;
    newClientId(clientId: string): void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);
export default AuthContext;
