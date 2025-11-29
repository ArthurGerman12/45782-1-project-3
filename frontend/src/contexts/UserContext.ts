import { createContext } from "react";
import type User from "../models/User";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export default UserContext;