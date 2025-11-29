import { useState, type PropsWithChildren } from "react";
import UserContext from "./UserContext";
import type User from "../models/User";

export default function UserProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
